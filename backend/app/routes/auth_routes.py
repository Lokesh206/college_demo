from flask import Blueprint, request, jsonify
from app.models import User, StudentProfile, FacultyProfile, ParentProfile, AuditLog
from app.extensions import db
from app.utils.auth_helpers import generate_token, token_required

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    username = data.get('username', '').strip()
    password = data.get('password', '').strip()

    if not username or not password:
        return jsonify({'error': 'Username and password are required.'}), 400

    user = User.query.filter((User.username == username) | (User.email == username)).first()
    if not user or not user.check_password(password):
        return jsonify({'error': 'Invalid credentials. Please verify your username and password.'}), 401

    if not user.is_active:
        return jsonify({'error': 'Account is inactive. Contact the administration.'}), 403

    token = generate_token(user)

    # Log audit
    log = AuditLog(
        user_id=user.id,
        username=user.username,
        role=user.role,
        action='User Login',
        module='Authentication',
        details=f"User {user.username} logged in successfully.",
        ip_address=request.remote_addr or '127.0.0.1'
    )
    db.session.add(log)
    db.session.commit()

    # Profile info
    profile_data = {}
    if user.role == 'student' and user.student_profile:
        profile_data = user.student_profile.to_dict()
    elif user.role == 'faculty' and user.faculty_profile:
        profile_data = user.faculty_profile.to_dict()
    elif user.role == 'parent' and user.parent_profile:
        profile_data = user.parent_profile.to_dict()

    return jsonify({
        'message': 'Login successful.',
        'token': token,
        'user': user.to_dict(),
        'profile': profile_data
    })

@auth_bp.route('/demo-login', methods=['POST'])
def demo_login():
    data = request.get_json() or {}
    role = data.get('role', 'student').lower()

    demo_usernames = {
        'admin': 'admin',
        'faculty': 'faculty.physics',
        'student': 'student.rohit',
        'parent': 'parent.rohit'
    }

    target_username = demo_usernames.get(role, 'student.rohit')
    user = User.query.filter_by(username=target_username).first()

    if not user:
        return jsonify({'error': f'Demo user for role {role} not found in database.'}), 404

    token = generate_token(user)

    profile_data = {}
    if user.role == 'student' and user.student_profile:
        profile_data = user.student_profile.to_dict()
    elif user.role == 'faculty' and user.faculty_profile:
        profile_data = user.faculty_profile.to_dict()
    elif user.role == 'parent' and user.parent_profile:
        profile_data = user.parent_profile.to_dict()

    return jsonify({
        'message': f'Demo login as {role.capitalize()} successful.',
        'token': token,
        'user': user.to_dict(),
        'profile': profile_data
    })

@auth_bp.route('/me', methods=['GET'])
@token_required
def get_current_user(current_user):
    profile_data = {}
    if current_user.role == 'student' and current_user.student_profile:
        profile_data = current_user.student_profile.to_dict()
    elif current_user.role == 'faculty' and current_user.faculty_profile:
        profile_data = current_user.faculty_profile.to_dict()
    elif current_user.role == 'parent' and current_user.parent_profile:
        profile_data = current_user.parent_profile.to_dict()

    return jsonify({
        'user': current_user.to_dict(),
        'profile': profile_data
    })

