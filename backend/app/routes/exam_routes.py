import json
from datetime import datetime
from flask import Blueprint, request, jsonify
from app.models import MockTest, Question, StudentTestAttempt, StudentProfile, AuditLog
from app.extensions import db
from app.utils.auth_helpers import token_required, roles_required

exam_bp = Blueprint('exams', __name__, url_prefix='/api/exams')

@exam_bp.route('/list', methods=['GET'])
def list_mock_tests():
    exam_name = request.args.get('exam') # KCET, NEET, JEE
    query = MockTest.query.filter_by(is_published=True)
    tests = query.all()
    if exam_name:
        tests = [t for t in tests if t.exam and t.exam.name.upper() == exam_name.upper()]
    return jsonify([t.to_dict() for t in tests])

@exam_bp.route('/<int:test_id>/start', methods=['GET'])
@token_required
def start_exam(current_user, test_id):
    test = MockTest.query.get_or_404(test_id)
    questions = Question.query.filter_by(test_id=test.id).order_by(Question.question_number).all()

    # When starting exam, omit correct_option and explanation to ensure exam integrity
    questions_data = [q.to_dict(include_answer=False) for q in questions]

    return jsonify({
        'test': test.to_dict(),
        'questions': questions_data,
        'started_at': datetime.utcnow().isoformat()
    })

@exam_bp.route('/<int:test_id>/submit', methods=['POST'])
@token_required
def submit_exam(current_user, test_id):
    test = MockTest.query.get_or_404(test_id)
    data = request.get_json() or {}
    answers = data.get('answers', {}) # Dict of {question_id: selected_option}
    time_taken_seconds = int(data.get('time_taken_seconds', 0))

    # Identify student
    student = current_user.student_profile
    if not student and current_user.role != 'student':
        # Default to first student if admin/faculty testing the engine
        student = StudentProfile.query.first()

    questions = Question.query.filter_by(test_id=test.id).all()
    q_map = {q.id: q for q in questions}

    total_marks = 0.0
    scored_marks = 0.0
    correct_count = 0
    incorrect_count = 0
    unattempted_count = 0
    topic_performance = {}
    detailed_evaluation = []

    for q in questions:
        total_marks += q.marks
        user_choice = answers.get(str(q.id)) or answers.get(q.id)

        # Topic tracking
        topic = q.chapter or q.subject
        if topic not in topic_performance:
            topic_performance[topic] = {'total': 0, 'correct': 0, 'marks': 0}
        topic_performance[topic]['total'] += 1

        is_correct = False
        status = 'Unattempted'

        if not user_choice:
            unattempted_count += 1
            status = 'Unattempted'
        elif user_choice.upper() == q.correct_option.upper():
            is_correct = True
            correct_count += 1
            scored_marks += q.marks
            topic_performance[topic]['correct'] += 1
            topic_performance[topic]['marks'] += q.marks
            status = 'Correct'
        else:
            incorrect_count += 1
            scored_marks -= q.negative_marks
            status = 'Incorrect'

        detailed_evaluation.append({
            'question_id': q.id,
            'question_number': q.question_number,
            'question_text': q.question_text,
            'options': {
                'A': q.option_a,
                'B': q.option_b,
                'C': q.option_c,
                'D': q.option_d
            },
            'user_choice': user_choice,
            'correct_option': q.correct_option,
            'explanation': q.explanation,
            'chapter': q.chapter,
            'status': status,
            'marks_awarded': q.marks if is_correct else (-q.negative_marks if user_choice else 0)
        })

    total_attempted = correct_count + incorrect_count
    accuracy = round((correct_count / total_attempted * 100), 1) if total_attempted > 0 else 0.0
    scored_marks = max(0.0, scored_marks)

    # Save attempt
    if student:
        attempt = StudentTestAttempt(
            student_id=student.id,
            test_id=test.id,
            start_time=datetime.utcnow(),
            submit_time=datetime.utcnow(),
            score=round(scored_marks, 2),
            total_marks=round(total_marks, 2),
            accuracy_percentage=accuracy,
            total_attempted=total_attempted,
            correct_count=correct_count,
            incorrect_count=incorrect_count,
            unattempted_count=unattempted_count,
            time_taken_seconds=time_taken_seconds,
            answers_json=json.dumps(answers),
            topic_breakdown_json=json.dumps(topic_performance)
        )
        db.session.add(attempt)
        db.session.commit()

    return jsonify({
        'test_id': test.id,
        'test_title': test.title,
        'exam_name': test.exam.name if test.exam else 'Competitive Exam',
        'score': round(scored_marks, 2),
        'total_marks': round(total_marks, 2),
        'percentage': round((scored_marks / total_marks * 100), 1) if total_marks > 0 else 0,
        'accuracy_percentage': accuracy,
        'total_questions': len(questions),
        'total_attempted': total_attempted,
        'correct_count': correct_count,
        'incorrect_count': incorrect_count,
        'unattempted_count': unattempted_count,
        'time_taken_seconds': time_taken_seconds,
        'topic_breakdown': topic_performance,
        'detailed_evaluation': detailed_evaluation
    })

@exam_bp.route('/history', methods=['GET'])
@token_required
def get_exam_history(current_user):
    student = current_user.student_profile
    if not student:
        return jsonify([])
    attempts = StudentTestAttempt.query.filter_by(student_id=student.id).order_by(StudentTestAttempt.submit_time.desc()).all()
    return jsonify([a.to_dict() for a in attempts])

