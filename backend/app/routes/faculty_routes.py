from datetime import datetime
from flask import Blueprint, jsonify, request
from app.models import FacultyProfile, StudentProfile, Attendance, InternalMark, StudyMaterial, AuditLog
from app.extensions import db
from app.utils.auth_helpers import token_required, roles_required

faculty_bp = Blueprint('faculty', __name__, url_prefix='/api/faculty')

@faculty_bp.route('/dashboard', methods=['GET'])
@token_required
def get_faculty_dashboard(current_user):
    faculty = current_user.faculty_profile
    if not faculty:
        faculty = FacultyProfile.query.first()

    students = StudentProfile.query.filter_by(stream_name='Science').all()
    materials = StudyMaterial.query.all()

    assigned_classes = [
        {'code': '2PU-SC-A', 'name': '2nd PU Science - Section A (PCMB)', 'students_count': 42, 'subject': faculty.department if faculty else 'Physics'},
        {'code': '2PU-SC-B', 'name': '2nd PU Science - Section B (PCMC)', 'students_count': 38, 'subject': faculty.department if faculty else 'Physics'},
        {'code': '1PU-SC-A', 'name': '1st PU Science - Section A (PCMB)', 'students_count': 45, 'subject': faculty.department if faculty else 'Physics'},
    ]

    return jsonify({
        'faculty': faculty.to_dict() if faculty else None,
        'assigned_classes': assigned_classes,
        'student_roster': [s.to_dict() for s in students],
        'uploaded_materials': [m.to_dict() for m in materials]
    })

@faculty_bp.route('/mark-attendance', methods=['POST'])
@token_required
@roles_required('faculty', 'admin')
def mark_attendance(current_user):
    data = request.get_json() or {}
    student_id = data.get('student_id')
    date_str = data.get('date', datetime.utcnow().strftime('%Y-%m-%d'))
    status = data.get('status', 'Present')
    subject_name = data.get('subject_name', 'Physics')
    remarks = data.get('remarks', 'Daily session attendance')

    if not student_id:
        return jsonify({'error': 'Student ID is required.'}), 400

    att = Attendance(
        student_id=student_id,
        date=date_str,
        status=status,
        subject_name=subject_name,
        remarks=remarks
    )
    db.session.add(att)
    db.session.commit()

    return jsonify({'message': 'Attendance successfully recorded.', 'attendance': att.to_dict()})

@faculty_bp.route('/enter-marks', methods=['POST'])
@token_required
@roles_required('faculty', 'admin')
def enter_marks(current_user):
    data = request.get_json() or {}
    student_id = data.get('student_id')
    exam_type = data.get('exam_type', 'Unit Test 2')
    subject_name = data.get('subject_name', 'Physics')
    max_marks = float(data.get('max_marks', 50.0))
    marks_obtained = float(data.get('marks_obtained', 0.0))
    remarks = data.get('remarks', 'Good performance')

    if not student_id or marks_obtained is None:
        return jsonify({'error': 'Student ID and marks are required.'}), 400

    mark_record = InternalMark(
        student_id=student_id,
        exam_type=exam_type,
        subject_name=subject_name,
        max_marks=max_marks,
        marks_obtained=marks_obtained,
        remarks=remarks
    )
    db.session.add(mark_record)
    db.session.commit()

    return jsonify({'message': 'Internal marks updated successfully.', 'mark_record': mark_record.to_dict()})

@faculty_bp.route('/upload-material', methods=['POST'])
@token_required
@roles_required('faculty', 'admin')
def upload_study_material(current_user):
    data = request.get_json() or {}
    title = data.get('title', '').strip()
    subject = data.get('subject', 'Physics')
    stream = data.get('stream', 'Science')
    chapter = data.get('chapter', 'General')
    material_type = data.get('material_type', 'Lecture Notes')
    file_url = data.get('file_url', '#')

    if not title:
        return jsonify({'error': 'Title is required.'}), 400

    faculty = current_user.faculty_profile
    author = faculty.full_name if faculty else current_user.username

    mat = StudyMaterial(
        title=title,
        subject=subject,
        stream=stream,
        chapter=chapter,
        material_type=material_type,
        file_url=file_url,
        uploaded_by=author
    )
    db.session.add(mat)
    db.session.commit()

    return jsonify({'message': 'Study material published successfully.', 'material': mat.to_dict()})

