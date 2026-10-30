from flask import Blueprint, jsonify, request
from app.models import (
    Stream, Combination, FacultyProfile, CompetitiveExam, BoardResult,
    StudentTopper, CompetitiveRanker, CampusFacility, NewsAnnouncement,
    CollegeEvent, Testimonial, NotableAlumni, FeeStructure
)

public_bp = Blueprint('public', __name__, url_prefix='/api/public')

@public_bp.route('/overview', methods=['GET'])
def get_college_overview():
    stats = {
        'years_of_excellence': 18,
        'total_students': 1250,
        'faculty_members': 64,
        'distinction_rate_pct': 82.4,
        'board_pass_rate_pct': 99.52,
        'laboratories_count': 12,
        'bus_fleet_count': 24,
        'kcet_top_100_ranks': 48,
        'neet_top_ranks': 35,
        'jee_qualifiers': 62
    }
    return jsonify({
        'college_name': 'Sri Vidya International Pre-University College',
        'tagline': "Empowering Young Minds. Building Tomorrow's Leaders.",
        'location': 'Bengaluru, Karnataka, India',
        'affiliation': 'Recognised by Government of Karnataka | Department of Pre-University Education',
        'stats': stats,
        'is_demo_data': True
    })

@public_bp.route('/streams', methods=['GET'])
def get_streams():
    streams = Stream.query.all()
    return jsonify([s.to_dict() for s in streams])

@public_bp.route('/faculty', methods=['GET'])
def get_faculty():
    dept = request.args.get('department')
    search = request.args.get('search', '').strip().lower()

    query = FacultyProfile.query
    if dept:
        query = query.filter_by(department=dept)
    
    profiles = query.all()
    if search:
        profiles = [p for p in profiles if search in p.full_name.lower() or search in p.department.lower() or search in (p.specialization or '').lower()]

    return jsonify([p.to_dict() for p in profiles])

@public_bp.route('/competitive-exams', methods=['GET'])
def get_competitive_exams():
    exams = CompetitiveExam.query.all()
    return jsonify([e.to_dict() for e in exams])

@public_bp.route('/results', methods=['GET'])
def get_results():
    board_results = BoardResult.query.order_by(BoardResult.academic_year.desc()).all()
    toppers = StudentTopper.query.order_by(StudentTopper.percentage.desc()).all()
    comp_rankers = CompetitiveRanker.query.all()
    return jsonify({
        'board_results': [b.to_dict() for b in board_results],
        'toppers': [t.to_dict() for t in toppers],
        'competitive_rankers': [r.to_dict() for r in comp_rankers]
    })

@public_bp.route('/facilities', methods=['GET'])
def get_facilities():
    category = request.args.get('category')
    query = CampusFacility.query
    if category and category != 'All':
        query = query.filter_by(category=category)
    facilities = query.all()
    return jsonify([f.to_dict() for f in facilities])

@public_bp.route('/news', methods=['GET'])
def get_news():
    news = NewsAnnouncement.query.order_by(NewsAnnouncement.is_pinned.desc(), NewsAnnouncement.publish_date.desc()).all()
    return jsonify([n.to_dict() for n in news])

@public_bp.route('/events', methods=['GET'])
def get_events():
    events = CollegeEvent.query.all()
    return jsonify([e.to_dict() for e in events])

@public_bp.route('/testimonials', methods=['GET'])
def get_testimonials():
    testimonials = Testimonial.query.all()
    return jsonify([t.to_dict() for t in testimonials])

@public_bp.route('/alumni', methods=['GET'])
def get_alumni():
    alumni = NotableAlumni.query.all()
    return jsonify([a.to_dict() for a in alumni])

@public_bp.route('/fees', methods=['GET'])
def get_fee_structures():
    fees = FeeStructure.query.all()
    return jsonify([f.to_dict() for f in fees])

