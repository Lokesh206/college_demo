import random
from datetime import datetime
from flask import Blueprint, request, jsonify
from app.models import AdmissionEnquiry, AuditLog
from app.extensions import db
from app.utils.auth_helpers import token_required, roles_required

admission_bp = Blueprint('admissions', __name__, url_prefix='/api/admissions')

@admission_bp.route('/enquiry', methods=['POST'])
def submit_enquiry():
    data = request.get_json() or {}
    student_name = data.get('student_name', '').strip()
    parent_name = data.get('parent_name', '').strip()
    email = data.get('email', '').strip()
    phone = data.get('phone', '').strip()
    previous_school = data.get('previous_school', '').strip()
    previous_marks_pct = float(data.get('previous_marks_pct', 0))
    preferred_stream = data.get('preferred_stream', 'Science')
    preferred_combination = data.get('preferred_combination', 'PCMB')
    academic_year = data.get('academic_year', '2026-2027')
    address = data.get('address', '')
    message = data.get('message', '')

    if not student_name or not email or not phone:
        return jsonify({'error': 'Student name, email, and phone number are required.'}), 400

    # Generate unique application tracking number
    random_digits = random.randint(10000, 99999)
    application_no = f"APP-2026-{random_digits}"

    enquiry = AdmissionEnquiry(
        application_no=application_no,
        student_name=student_name,
        parent_name=parent_name,
        email=email,
        phone=phone,
        previous_school=previous_school,
        previous_marks_pct=previous_marks_pct,
        preferred_stream=preferred_stream,
        preferred_combination=preferred_combination,
        academic_year=academic_year,
        address=address,
        message=message,
        status='New Enquiry',
        notes='Application submitted via online portal.'
    )
    db.session.add(enquiry)
    db.session.commit()

    return jsonify({
        'message': 'Your admission application has been successfully submitted!',
        'application_no': application_no,
        'enquiry': enquiry.to_dict()
    }), 201

@admission_bp.route('/track/<application_no>', methods=['GET'])
def track_application(application_no):
    enquiry = AdmissionEnquiry.query.filter_by(application_no=application_no.strip()).first()
    if not enquiry:
        return jsonify({'error': f'No application found with tracking number {application_no}'}), 404
    return jsonify(enquiry.to_dict())

@admission_bp.route('/all', methods=['GET'])
@token_required
@roles_required('admin')
def get_all_applications(current_user):
    status_filter = request.args.get('status')
    query = AdmissionEnquiry.query
    if status_filter and status_filter != 'All':
        query = query.filter_by(status=status_filter)
    applications = query.order_by(AdmissionEnquiry.created_at.desc()).all()
    return jsonify([a.to_dict() for a in applications])

@admission_bp.route('/<int:enquiry_id>/status', methods=['PATCH'])
@token_required
@roles_required('admin')
def update_status(current_user, enquiry_id):
    enquiry = AdmissionEnquiry.query.get_or_404(enquiry_id)
    data = request.get_json() or {}
    new_status = data.get('status')
    notes = data.get('notes')

    valid_statuses = [
        'New Enquiry', 'Contacted', 'Application Submitted',
        'Documents Pending', 'Documents Verified', 'Approved',
        'Rejected', 'Enrolled'
    ]

    if new_status and new_status in valid_statuses:
        enquiry.status = new_status
    if notes is not None:
        enquiry.notes = notes

    # Log action
    log = AuditLog(
        user_id=current_user.id,
        username=current_user.username,
        role=current_user.role,
        action=f"Updated Admission Status to {new_status}",
        module='Admissions',
        details=f"Application {enquiry.application_no} ({enquiry.student_name}) status updated to {new_status}."
    )
    db.session.add(log)
    db.session.commit()

    return jsonify({
        'message': 'Application status updated successfully.',
        'enquiry': enquiry.to_dict()
    })

