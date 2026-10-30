from flask import Blueprint, jsonify
from app.models import StudentProfile, Attendance, InternalMark, StudyMaterial, NewsAnnouncement
from app.utils.auth_helpers import token_required

student_bp = Blueprint('student', __name__, url_prefix='/api/student')

@student_bp.route('/dashboard', methods=['GET'])
@token_required
def get_dashboard(current_user):
    student = current_user.student_profile
    if not student:
        # Fallback to demo student
        student = StudentProfile.query.first()

    # Calculate attendance statistics
    attendances = Attendance.query.filter_by(student_id=student.id).all()
    total_classes = len(attendances)
    present_classes = len([a for a in attendances if a.status == 'Present'])
    attendance_pct = round((present_classes / total_classes * 100), 1) if total_classes > 0 else 0

    # Marks
    marks = InternalMark.query.filter_by(student_id=student.id).all()
    
    # Recent announcements
    notices = NewsAnnouncement.query.order_by(NewsAnnouncement.publish_date.desc()).limit(4).all()

    # Study materials
    materials = StudyMaterial.query.limit(5).all()

    timetable = [
        {'time': '09:00 - 10:00 AM', 'mon': 'Physics (Dr. Rao)', 'tue': 'Chemistry (Dr. Iyer)', 'wed': 'Mathematics', 'thu': 'Biology', 'fri': 'Physics Lab', 'sat': 'KCET Sprint'},
        {'time': '10:00 - 11:00 AM', 'mon': 'Mathematics', 'tue': 'Physics', 'wed': 'Chemistry', 'thu': 'English', 'fri': 'Physics Lab', 'sat': 'NEET Mock'},
        {'time': '11:15 - 12:15 PM', 'mon': 'Biology / CS', 'tue': 'Mathematics', 'wed': 'Physics', 'thu': 'Chemistry', 'fri': 'Chemistry Lab', 'sat': 'Doubt Session'},
        {'time': '01:00 - 02:00 PM', 'mon': 'Chemistry', 'tue': 'Biology', 'wed': 'English', 'thu': 'Mathematics', 'fri': 'Biology Lab', 'sat': 'Mentorship'},
        {'time': '02:00 - 03:30 PM', 'mon': 'KCET Coaching', 'tue': 'NEET Coaching', 'wed': 'JEE Advanced Session', 'thu': 'Test Analysis', 'fri': 'Sports & Library', 'sat': 'Self Study'}
    ]

    return jsonify({
        'student': student.to_dict(),
        'attendance': {
            'total_classes': total_classes,
            'present_classes': present_classes,
            'attendance_percentage': attendance_pct,
            'recent_logs': [a.to_dict() for a in attendances[-10:]]
        },
        'marks': [m.to_dict() for m in marks],
        'notices': [n.to_dict() for n in notices],
        'materials': [m.to_dict() for m in materials],
        'timetable': timetable
    })

