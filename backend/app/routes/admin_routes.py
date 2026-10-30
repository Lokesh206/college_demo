import io
import openpyxl
from flask import Blueprint, jsonify, request, Response
from app.models import (
    User, StudentProfile, FacultyProfile, ParentProfile, AdmissionEnquiry,
    BoardResult, StudentTopper, CompetitiveRanker, MockTest, FeeStructure,
    StudentFeeRecord, CampusFacility, NewsAnnouncement, CollegeEvent, AuditLog
)
from app.extensions import db
from app.utils.auth_helpers import token_required, roles_required

admin_bp = Blueprint('admin', __name__, url_prefix='/api/admin')

@admin_bp.route('/analytics', methods=['GET'])
@token_required
@roles_required('admin')
def get_admin_analytics(current_user):
    total_students = StudentProfile.query.count()
    total_faculty = FacultyProfile.query.count()
    total_enquiries = AdmissionEnquiry.query.count()
    approved_admissions = AdmissionEnquiry.query.filter_by(status='Approved').count()
    
    fee_records = StudentFeeRecord.query.all()
    total_fees_collected = sum(f.paid_amount for f in fee_records)
    total_fees_pending = sum(f.balance_amount for f in fee_records)

    stream_distribution = {
        'Science': StudentProfile.query.filter_by(stream_name='Science').count() or 68,
        'Commerce': StudentProfile.query.filter_by(stream_name='Commerce').count() or 24,
        'Arts': StudentProfile.query.filter_by(stream_name='Arts').count() or 8
    }

    recent_logs = AuditLog.query.order_by(AuditLog.timestamp.desc()).limit(10).all()

    return jsonify({
        'overview': {
            'total_students': total_students or 1250,
            'total_faculty': total_faculty or 64,
            'total_enquiries': total_enquiries,
            'approved_admissions': approved_admissions,
            'total_fees_collected': total_fees_collected,
            'total_fees_pending': total_fees_pending,
            'pass_percentage': 99.52,
            'distinction_percentage': 82.4
        },
        'stream_distribution': stream_distribution,
        'recent_logs': [l.to_dict() for l in recent_logs]
    })

@admin_bp.route('/students', methods=['GET', 'POST'])
@token_required
@roles_required('admin')
def manage_students(current_user):
    if request.method == 'GET':
        students = StudentProfile.query.all()
        return jsonify([s.to_dict() for s in students])

    data = request.get_json() or {}
    username = data.get('username', '').strip()
    full_name = data.get('full_name', '').strip()
    email = data.get('email', '').strip()
    admission_no = data.get('admission_no', '').strip()
    stream_name = data.get('stream_name', 'Science')
    combination_name = data.get('combination_name', 'PCMB')
    year = data.get('year', '1st PU')

    if not username or not full_name or not admission_no:
        return jsonify({'error': 'Username, Full Name and Admission No are required.'}), 400

    # Create user
    user = User(username=username, email=email, role='student')
    user.set_password(data.get('password', 'student123'))
    db.session.add(user)
    db.session.commit()

    student = StudentProfile(
        user_id=user.id,
        admission_no=admission_no,
        roll_no=data.get('roll_no', '26SC99'),
        full_name=full_name,
        stream_name=stream_name,
        combination_name=combination_name,
        year=year,
        section=data.get('section', 'A'),
        email=email,
        phone=data.get('phone', ''),
        target_exams=data.get('target_exams', 'KCET')
    )
    db.session.add(student)
    db.session.commit()

    return jsonify({'message': 'Student created successfully.', 'student': student.to_dict()}), 201

@admin_bp.route('/faculty', methods=['GET', 'POST'])
@token_required
@roles_required('admin')
def manage_faculty(current_user):
    if request.method == 'GET':
        faculty = FacultyProfile.query.all()
        return jsonify([f.to_dict() for f in faculty])

    data = request.get_json() or {}
    username = data.get('username', '').strip()
    full_name = data.get('full_name', '').strip()
    email = data.get('email', '').strip()
    employee_id = data.get('employee_id', '').strip()
    department = data.get('department', 'Science')
    designation = data.get('designation', 'Lecturer')
    qualifications = data.get('qualifications', 'M.Sc.')

    if not username or not full_name or not employee_id:
        return jsonify({'error': 'Username, Full Name and Employee ID are required.'}), 400

    user = User(username=username, email=email, role='faculty')
    user.set_password(data.get('password', 'faculty123'))
    db.session.add(user)
    db.session.commit()

    fac = FacultyProfile(
        user_id=user.id,
        employee_id=employee_id,
        full_name=full_name,
        designation=designation,
        department=department,
        qualifications=qualifications,
        experience_years=int(data.get('experience_years', 5)),
        email=email,
        phone=data.get('phone', '')
    )
    db.session.add(fac)
    db.session.commit()

    return jsonify({'message': 'Faculty created successfully.', 'faculty': fac.to_dict()}), 201

@admin_bp.route('/export/admissions-excel', methods=['GET'])
@token_required
@roles_required('admin')
def export_admissions_excel(current_user):
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Admissions 2026-2027"

    headers = [
        "App No", "Student Name", "Parent Name", "Email", "Phone",
        "Previous School", "10th %", "Preferred Stream", "Combination",
        "Status", "Submission Date"
    ]
    ws.append(headers)

    enquiries = AdmissionEnquiry.query.order_by(AdmissionEnquiry.created_at.desc()).all()
    for e in enquiries:
        ws.append([
            e.application_no,
            e.student_name,
            e.parent_name,
            e.email,
            e.phone,
            e.previous_school,
            e.previous_marks_pct,
            e.preferred_stream,
            e.preferred_combination,
            e.status,
            e.created_at.strftime('%Y-%m-%d') if e.created_at else ''
        ])

    output = io.BytesIO()
    wb.save(output)
    output.seek(0)

    return Response(
        output.getvalue(),
        mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": "attachment; filename=SriVidya_Admissions_2026.xlsx"}
    )

@admin_bp.route('/audit-logs', methods=['GET'])
@token_required
@roles_required('admin')
def get_audit_logs(current_user):
    logs = AuditLog.query.order_by(AuditLog.timestamp.desc()).limit(50).all()
    return jsonify([l.to_dict() for l in logs])

