from flask import Blueprint, jsonify, request
from app.models import ParentProfile, StudentProfile, Attendance, InternalMark, StudentFeeRecord
from app.utils.auth_helpers import token_required

parent_bp = Blueprint('parent', __name__, url_prefix='/api/parent')

@parent_bp.route('/dashboard', methods=['GET'])
@token_required
def get_parent_dashboard(current_user):
    parent = current_user.parent_profile
    if not parent:
        parent = ParentProfile.query.first()

    # Get linked students
    students = StudentProfile.query.filter_by(parent_id=parent.id).all()
    if not students:
        students = StudentProfile.query.limit(1).all()

    primary_student = students[0] if students else None
    student_details = {}

    if primary_student:
        attendances = Attendance.query.filter_by(student_id=primary_student.id).all()
        total_att = len(attendances)
        present_att = len([a for a in attendances if a.status == 'Present'])
        pct = round((present_att / total_att * 100), 1) if total_att > 0 else 0

        marks = InternalMark.query.filter_by(student_id=primary_student.id).all()
        fee_record = StudentFeeRecord.query.filter_by(student_id=primary_student.id).first()

        student_details = {
            'profile': primary_student.to_dict(),
            'attendance_summary': {
                'total': total_att,
                'present': present_att,
                'absent': total_att - present_att,
                'percentage': pct
            },
            'marks': [m.to_dict() for m in marks],
            'fee_summary': fee_record.to_dict() if fee_record else None
        }

    ptm_schedule = [
        {
            'event': '2nd PU Pre-Board Parent Teacher Meeting (PTM)',
            'date': 'Saturday, November 08, 2026',
            'time': '09:30 AM - 01:30 PM',
            'venue': 'Respective Classrooms - Block A',
            'agenda': 'Review of Preparatory Exam scores, KCET/NEET test accuracy, and attendance verification.'
        }
    ]

    return jsonify({
        'parent': parent.to_dict(),
        'linked_students': [s.to_dict() for s in students],
        'primary_student_data': student_details,
        'ptm_schedule': ptm_schedule
    })

