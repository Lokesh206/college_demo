import random
from datetime import datetime
from flask import Blueprint, request, jsonify, send_file, Response
from app.models import StudentProfile, StudentFeeRecord, FeeTransaction, AuditLog
from app.extensions import db
from app.utils.auth_helpers import token_required
from app.utils.pdf_generator import generate_fee_receipt_pdf

fee_bp = Blueprint('fees', __name__, url_prefix='/api/fees')

@fee_bp.route('/student/<int:student_id>', methods=['GET'])
@token_required
def get_student_fee_details(current_user, student_id):
    student = StudentProfile.query.get_or_404(student_id)
    fee_record = StudentFeeRecord.query.filter_by(student_id=student.id).first()
    
    if not fee_record:
        # Create a default record if missing
        fee_record = StudentFeeRecord(
            student_id=student.id,
            academic_year='2026-2027',
            total_fee=98000.0,
            concession_amount=10000.0,
            net_payable=88000.0,
            paid_amount=0.0,
            balance_amount=88000.0,
            status='Pending'
        )
        db.session.add(fee_record)
        db.session.commit()

    return jsonify({
        'student': student.to_dict(),
        'fee_record': fee_record.to_dict()
    })

@fee_bp.route('/sandbox-pay', methods=['POST'])
@token_required
def process_sandbox_payment(current_user):
    data = request.get_json() or {}
    student_id = data.get('student_id')
    amount = float(data.get('amount', 0))
    payment_mode = data.get('payment_mode', 'Sandbox Online - Net Banking / UPI')

    if amount <= 0:
        return jsonify({'error': 'Payment amount must be greater than zero.'}), 400

    fee_record = StudentFeeRecord.query.filter_by(student_id=student_id).first()
    if not fee_record:
        return jsonify({'error': 'Fee record not found for student.'}), 404

    if amount > fee_record.balance_amount:
        return jsonify({'error': f"Amount exceeds remaining balance of ₹ {fee_record.balance_amount:,.2f}"}), 400

    # Simulate payment verification
    rand_ref = random.randint(100000, 999999)
    txn_ref = f"TXN-SVP-2026-{rand_ref}"
    receipt_no = f"RCP-2026-{random.randint(10000, 99999)}"

    # Update fee record
    fee_record.paid_amount += amount
    fee_record.balance_amount = max(0.0, fee_record.balance_amount - amount)
    fee_record.status = 'Paid' if fee_record.balance_amount <= 0 else 'Partial'

    # Create transaction
    txn = FeeTransaction(
        fee_record_id=fee_record.id,
        transaction_ref=txn_ref,
        amount=amount,
        payment_mode=payment_mode,
        status='Success',
        payment_date=datetime.utcnow(),
        receipt_no=receipt_no
    )
    db.session.add(txn)

    # Audit log
    log = AuditLog(
        user_id=current_user.id,
        username=current_user.username,
        role=current_user.role,
        action='Fee Payment Processed',
        module='Fee Management',
        details=f"Payment of ₹ {amount} processed for student ID {student_id}. Receipt: {receipt_no}."
    )
    db.session.add(log)
    db.session.commit()

    return jsonify({
        'message': 'Payment successfully processed in sandbox environment.',
        'transaction': txn.to_dict(),
        'updated_fee_record': fee_record.to_dict()
    })

@fee_bp.route('/receipt/<int:txn_id>/pdf', methods=['GET'])
@token_required
def download_receipt_pdf(current_user, txn_id):
    txn = FeeTransaction.query.get_or_404(txn_id)
    fee_record = txn.fee_record
    student = fee_record.student

    pdf_bytes = generate_fee_receipt_pdf(student, fee_record, txn)

    return Response(
        pdf_bytes,
        mimetype='application/pdf',
        headers={
            'Content-Disposition': f'attachment; filename=Receipt_{txn.receipt_no}.pdf'
        }
    )

