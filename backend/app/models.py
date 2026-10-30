from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from app.extensions import db

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False, index=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), nullable=False, default='student') # admin, faculty, student, parent
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    avatar = db.Column(db.String(255), nullable=True)

    # Relationships
    faculty_profile = db.relationship('FacultyProfile', backref='user', uselist=False, cascade='all, delete-orphan')
    student_profile = db.relationship('StudentProfile', backref='user', uselist=False, cascade='all, delete-orphan')
    parent_profile = db.relationship('ParentProfile', backref='user', uselist=False, cascade='all, delete-orphan')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'role': self.role,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'avatar': self.avatar
        }

class Stream(db.Model):
    __tablename__ = 'streams'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True) # Science, Commerce, Arts
    code = db.Column(db.String(20), nullable=False, unique=True)
    description = db.Column(db.Text, nullable=True)
    icon = db.Column(db.String(50), default='BookOpen')
    
    combinations = db.relationship('Combination', backref='stream', lazy=True, cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'code': self.code,
            'description': self.description,
            'icon': self.icon,
            'combinations': [c.to_dict() for c in self.combinations]
        }

class Combination(db.Model):
    __tablename__ = 'combinations'
    
    id = db.Column(db.Integer, primary_key=True)
    stream_id = db.Column(db.Integer, db.ForeignKey('streams.id'), nullable=False)
    name = db.Column(db.String(50), nullable=False) # e.g. PCMB, PCMC, CEBA, SEBA, HEBA, HEPS, HESP
    code = db.Column(db.String(20), nullable=False, unique=True)
    subjects = db.Column(db.String(255), nullable=False) # e.g. Physics, Chemistry, Mathematics, Biology
    career_paths = db.Column(db.Text, nullable=True)
    description = db.Column(db.Text, nullable=True)
    duration = db.Column(db.String(50), default='2 Years (Pre-University)')
    annual_intake = db.Column(db.Integer, default=120)

    def to_dict(self):
        return {
            'id': self.id,
            'stream_id': self.stream_id,
            'name': self.name,
            'code': self.code,
            'subjects': self.subjects,
            'career_paths': self.career_paths,
            'description': self.description,
            'duration': self.duration,
            'annual_intake': self.annual_intake
        }

class FacultyProfile(db.Model):
    __tablename__ = 'faculty_profiles'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, unique=True)
    employee_id = db.Column(db.String(50), unique=True, nullable=False)
    full_name = db.Column(db.String(100), nullable=False)
    designation = db.Column(db.String(100), nullable=False) # Principal, Vice Principal, HOD, Senior Lecturer, etc.
    department = db.Column(db.String(100), nullable=False) # Physics, Chemistry, Mathematics, Biology, Computer Science, Commerce, Arts, Languages
    specialization = db.Column(db.String(150), nullable=True)
    qualifications = db.Column(db.String(200), nullable=False)
    experience_years = db.Column(db.Integer, default=5)
    kcet_exp = db.Column(db.String(100), nullable=True)
    neet_exp = db.Column(db.String(100), nullable=True)
    jee_exp = db.Column(db.String(100), nullable=True)
    teaching_methodology = db.Column(db.Text, nullable=True)
    achievements = db.Column(db.Text, nullable=True)
    publications = db.Column(db.Text, nullable=True)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), nullable=True)
    cabin = db.Column(db.String(50), nullable=True)
    photo_url = db.Column(db.String(255), nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'employee_id': self.employee_id,
            'full_name': self.full_name,
            'designation': self.designation,
            'department': self.department,
            'specialization': self.specialization,
            'qualifications': self.qualifications,
            'experience_years': self.experience_years,
            'kcet_exp': self.kcet_exp,
            'neet_exp': self.neet_exp,
            'jee_exp': self.jee_exp,
            'teaching_methodology': self.teaching_methodology,
            'achievements': self.achievements,
            'publications': self.publications,
            'email': self.email,
            'phone': self.phone,
            'cabin': self.cabin,
            'photo_url': self.photo_url
        }

class ParentProfile(db.Model):
    __tablename__ = 'parent_profiles'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, unique=True)
    full_name = db.Column(db.String(100), nullable=False)
    relation = db.Column(db.String(50), default='Father') # Father, Mother, Guardian
    occupation = db.Column(db.String(100), nullable=True)
    phone = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    address = db.Column(db.Text, nullable=True)

    students = db.relationship('StudentProfile', backref='parent', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'full_name': self.full_name,
            'relation': self.relation,
            'occupation': self.occupation,
            'phone': self.phone,
            'email': self.email,
            'address': self.address,
            'student_ids': [s.id for s in self.students]
        }

class StudentProfile(db.Model):
    __tablename__ = 'student_profiles'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, unique=True)
    admission_no = db.Column(db.String(50), unique=True, nullable=False)
    roll_no = db.Column(db.String(50), nullable=False)
    full_name = db.Column(db.String(100), nullable=False)
    stream_name = db.Column(db.String(50), default='Science')
    combination_name = db.Column(db.String(50), default='PCMB')
    year = db.Column(db.String(20), default='2nd PU') # 1st PU, 2nd PU
    section = db.Column(db.String(10), default='A')
    dob = db.Column(db.String(20), nullable=True)
    gender = db.Column(db.String(20), default='Male')
    blood_group = db.Column(db.String(10), default='O+')
    parent_id = db.Column(db.Integer, db.ForeignKey('parent_profiles.id'), nullable=True)
    address = db.Column(db.Text, nullable=True)
    phone = db.Column(db.String(20), nullable=True)
    email = db.Column(db.String(120), nullable=False)
    photo_url = db.Column(db.String(255), nullable=True)
    target_exams = db.Column(db.String(100), default='KCET, NEET')

    # Relationships
    attendances = db.relationship('Attendance', backref='student', lazy=True, cascade='all, delete-orphan')
    internal_marks = db.relationship('InternalMark', backref='student', lazy=True, cascade='all, delete-orphan')
    fee_records = db.relationship('StudentFeeRecord', backref='student', lazy=True, cascade='all, delete-orphan')
    test_attempts = db.relationship('StudentTestAttempt', backref='student', lazy=True, cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'admission_no': self.admission_no,
            'roll_no': self.roll_no,
            'full_name': self.full_name,
            'stream_name': self.stream_name,
            'combination_name': self.combination_name,
            'year': self.year,
            'section': self.section,
            'dob': self.dob,
            'gender': self.gender,
            'blood_group': self.blood_group,
            'parent_id': self.parent_id,
            'parent_name': self.parent.full_name if self.parent else 'N/A',
            'parent_phone': self.parent.phone if self.parent else 'N/A',
            'address': self.address,
            'phone': self.phone,
            'email': self.email,
            'photo_url': self.photo_url,
            'target_exams': self.target_exams
        }

class Attendance(db.Model):
    __tablename__ = 'attendances'
    
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student_profiles.id'), nullable=False)
    date = db.Column(db.String(20), nullable=False)
    status = db.Column(db.String(20), nullable=False) # Present, Absent, Late
    subject_name = db.Column(db.String(50), nullable=False)
    remarks = db.Column(db.String(150), nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'student_id': self.student_id,
            'date': self.date,
            'status': self.status,
            'subject_name': self.subject_name,
            'remarks': self.remarks
        }

class InternalMark(db.Model):
    __tablename__ = 'internal_marks'
    
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student_profiles.id'), nullable=False)
    exam_type = db.Column(db.String(50), nullable=False) # Unit Test 1, Mid-Term, Unit Test 2, Preparatory
    subject_name = db.Column(db.String(50), nullable=False)
    max_marks = db.Column(db.Float, default=100.0)
    marks_obtained = db.Column(db.Float, nullable=False)
    grade = db.Column(db.String(10), nullable=True)
    remarks = db.Column(db.String(150), nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'student_id': self.student_id,
            'exam_type': self.exam_type,
            'subject_name': self.subject_name,
            'max_marks': self.max_marks,
            'marks_obtained': self.marks_obtained,
            'percentage': round((self.marks_obtained / self.max_marks) * 100, 1) if self.max_marks else 0,
            'grade': self.grade or ('A+' if self.marks_obtained >= 90 else 'A' if self.marks_obtained >= 75 else 'B' if self.marks_obtained >= 60 else 'C'),
            'remarks': self.remarks
        }

class AdmissionEnquiry(db.Model):
    __tablename__ = 'admission_enquiries'
    
    id = db.Column(db.Integer, primary_key=True)
    application_no = db.Column(db.String(50), unique=True, nullable=False)
    student_name = db.Column(db.String(100), nullable=False)
    parent_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    previous_school = db.Column(db.String(150), nullable=False)
    previous_marks_pct = db.Column(db.Float, nullable=False)
    preferred_stream = db.Column(db.String(50), nullable=False)
    preferred_combination = db.Column(db.String(50), nullable=False)
    academic_year = db.Column(db.String(20), default='2026-2027')
    address = db.Column(db.Text, nullable=True)
    message = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(50), default='New Enquiry') 
    # Statuses: New Enquiry, Contacted, Application Submitted, Documents Pending, Documents Verified, Approved, Rejected, Enrolled
    notes = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'application_no': self.application_no,
            'student_name': self.student_name,
            'parent_name': self.parent_name,
            'email': self.email,
            'phone': self.phone,
            'previous_school': self.previous_school,
            'previous_marks_pct': self.previous_marks_pct,
            'preferred_stream': self.preferred_stream,
            'preferred_combination': self.preferred_combination,
            'academic_year': self.academic_year,
            'address': self.address,
            'message': self.message,
            'status': self.status,
            'notes': self.notes,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M') if self.created_at else None
        }

class CompetitiveExam(db.Model):
    __tablename__ = 'competitive_exams'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False, unique=True) # KCET, NEET, JEE
    full_title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=False)
    eligibility = db.Column(db.Text, nullable=True)
    pattern = db.Column(db.Text, nullable=True)
    total_marks = db.Column(db.Integer, default=180)
    duration_minutes = db.Column(db.Integer, default=180)
    syllabus_summary = db.Column(db.Text, nullable=True)

    mock_tests = db.relationship('MockTest', backref='exam', lazy=True, cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'full_title': self.full_title,
            'description': self.description,
            'eligibility': self.eligibility,
            'pattern': self.pattern,
            'total_marks': self.total_marks,
            'duration_minutes': self.duration_minutes,
            'syllabus_summary': self.syllabus_summary,
            'mock_test_count': len(self.mock_tests)
        }

class MockTest(db.Model):
    __tablename__ = 'mock_tests'
    
    id = db.Column(db.Integer, primary_key=True)
    exam_id = db.Column(db.Integer, db.ForeignKey('competitive_exams.id'), nullable=False)
    title = db.Column(db.String(150), nullable=False)
    stream = db.Column(db.String(50), default='Science')
    subject = db.Column(db.String(50), nullable=False) # Physics, Chemistry, Mathematics, Biology, Full Mock
    duration_minutes = db.Column(db.Integer, default=60)
    total_questions = db.Column(db.Integer, default=20)
    total_marks = db.Column(db.Integer, default=80)
    instructions = db.Column(db.Text, nullable=True)
    is_published = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    questions = db.relationship('Question', backref='test', lazy=True, cascade='all, delete-orphan')
    attempts = db.relationship('StudentTestAttempt', backref='test', lazy=True, cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'exam_id': self.exam_id,
            'exam_name': self.exam.name if self.exam else 'Mock Test',
            'title': self.title,
            'stream': self.stream,
            'subject': self.subject,
            'duration_minutes': self.duration_minutes,
            'total_questions': len(self.questions) or self.total_questions,
            'total_marks': self.total_marks,
            'instructions': self.instructions,
            'is_published': self.is_published,
            'created_at': self.created_at.strftime('%Y-%m-%d') if self.created_at else None
        }

class Question(db.Model):
    __tablename__ = 'questions'
    
    id = db.Column(db.Integer, primary_key=True)
    test_id = db.Column(db.Integer, db.ForeignKey('mock_tests.id'), nullable=False)
    question_number = db.Column(db.Integer, nullable=False)
    question_text = db.Column(db.Text, nullable=False)
    option_a = db.Column(db.Text, nullable=False)
    option_b = db.Column(db.Text, nullable=False)
    option_c = db.Column(db.Text, nullable=False)
    option_d = db.Column(db.Text, nullable=False)
    correct_option = db.Column(db.String(5), nullable=False) # A, B, C, D
    explanation = db.Column(db.Text, nullable=True)
    subject = db.Column(db.String(50), nullable=False)
    chapter = db.Column(db.String(100), nullable=True)
    difficulty = db.Column(db.String(20), default='Medium') # Easy, Medium, Hard
    marks = db.Column(db.Float, default=4.0)
    negative_marks = db.Column(db.Float, default=1.0)

    def to_dict(self, include_answer=False):
        data = {
            'id': self.id,
            'test_id': self.test_id,
            'question_number': self.question_number,
            'question_text': self.question_text,
            'option_a': self.option_a,
            'option_b': self.option_b,
            'option_c': self.option_c,
            'option_d': self.option_d,
            'subject': self.subject,
            'chapter': self.chapter,
            'difficulty': self.difficulty,
            'marks': self.marks,
            'negative_marks': self.negative_marks
        }
        if include_answer:
            data['correct_option'] = self.correct_option
            data['explanation'] = self.explanation
        return data

class StudentTestAttempt(db.Model):
    __tablename__ = 'student_test_attempts'
    
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student_profiles.id'), nullable=False)
    test_id = db.Column(db.Integer, db.ForeignKey('mock_tests.id'), nullable=False)
    start_time = db.Column(db.DateTime, default=datetime.utcnow)
    submit_time = db.Column(db.DateTime, default=datetime.utcnow)
    score = db.Column(db.Float, default=0.0)
    total_marks = db.Column(db.Float, default=0.0)
    accuracy_percentage = db.Column(db.Float, default=0.0)
    total_attempted = db.Column(db.Integer, default=0)
    correct_count = db.Column(db.Integer, default=0)
    incorrect_count = db.Column(db.Integer, default=0)
    unattempted_count = db.Column(db.Integer, default=0)
    time_taken_seconds = db.Column(db.Integer, default=0)
    answers_json = db.Column(db.Text, nullable=True) # JSON string of student answers
    topic_breakdown_json = db.Column(db.Text, nullable=True) # JSON string of performance by topic

    def to_dict(self):
        return {
            'id': self.id,
            'student_id': self.student_id,
            'test_id': self.test_id,
            'test_title': self.test.title if self.test else 'Mock Test',
            'exam_name': self.test.exam.name if self.test and self.test.exam else 'Exam',
            'start_time': self.start_time.strftime('%Y-%m-%d %H:%M') if self.start_time else None,
            'submit_time': self.submit_time.strftime('%Y-%m-%d %H:%M') if self.submit_time else None,
            'score': self.score,
            'total_marks': self.total_marks,
            'accuracy_percentage': self.accuracy_percentage,
            'total_attempted': self.total_attempted,
            'correct_count': self.correct_count,
            'incorrect_count': self.incorrect_count,
            'unattempted_count': self.unattempted_count,
            'time_taken_seconds': self.time_taken_seconds,
            'answers_json': self.answers_json,
            'topic_breakdown_json': self.topic_breakdown_json
        }

class BoardResult(db.Model):
    __tablename__ = 'board_results'
    
    id = db.Column(db.Integer, primary_key=True)
    academic_year = db.Column(db.String(20), nullable=False) # e.g. 2024-2025
    stream = db.Column(db.String(50), nullable=False) # Overall, Science, Commerce, Arts
    total_appeared = db.Column(db.Integer, nullable=False)
    passed = db.Column(db.Integer, nullable=False)
    distinction_count = db.Column(db.Integer, nullable=False)
    first_class_count = db.Column(db.Integer, nullable=False)
    pass_percentage = db.Column(db.Float, nullable=False)
    college_rank = db.Column(db.String(50), default='Top 5 in Bengaluru District')

    def to_dict(self):
        return {
            'id': self.id,
            'academic_year': self.academic_year,
            'stream': self.stream,
            'total_appeared': self.total_appeared,
            'passed': self.passed,
            'distinction_count': self.distinction_count,
            'first_class_count': self.first_class_count,
            'pass_percentage': self.pass_percentage,
            'college_rank': self.college_rank
        }

class StudentTopper(db.Model):
    __tablename__ = 'student_toppers'
    
    id = db.Column(db.Integer, primary_key=True)
    academic_year = db.Column(db.String(20), nullable=False)
    student_name = db.Column(db.String(100), nullable=False)
    stream = db.Column(db.String(50), nullable=False) # Science, Commerce, Arts
    combination = db.Column(db.String(50), nullable=False)
    score_marks = db.Column(db.Float, nullable=False) # e.g. 594
    total_marks = db.Column(db.Float, default=600)
    percentage = db.Column(db.Float, nullable=False) # 99.0%
    rank_title = db.Column(db.String(100), nullable=False) # State 3rd Rank, College 1st Rank
    photo_url = db.Column(db.String(255), nullable=True)
    testimonial = db.Column(db.Text, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'academic_year': self.academic_year,
            'student_name': self.student_name,
            'stream': self.stream,
            'combination': self.combination,
            'score_marks': self.score_marks,
            'total_marks': self.total_marks,
            'percentage': self.percentage,
            'rank_title': self.rank_title,
            'photo_url': self.photo_url,
            'testimonial': self.testimonial
        }

class CompetitiveRanker(db.Model):
    __tablename__ = 'competitive_rankers'
    
    id = db.Column(db.Integer, primary_key=True)
    exam_name = db.Column(db.String(20), nullable=False) # KCET, NEET, JEE
    academic_year = db.Column(db.String(20), nullable=False)
    student_name = db.Column(db.String(100), nullable=False)
    score = db.Column(db.String(50), nullable=False) # e.g. 695/720, 99.82 Percentile
    all_india_rank = db.Column(db.Integer, nullable=True)
    state_rank = db.Column(db.Integer, nullable=True)
    stream = db.Column(db.String(50), default='Science')
    college_enrolled = db.Column(db.String(150), nullable=True) # e.g. AIIMS New Delhi, IISc Bengaluru, IIT Bombay
    photo_url = db.Column(db.String(255), nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'exam_name': self.exam_name,
            'academic_year': self.academic_year,
            'student_name': self.student_name,
            'score': self.score,
            'all_india_rank': self.all_india_rank,
            'state_rank': self.state_rank,
            'stream': self.stream,
            'college_enrolled': self.college_enrolled,
            'photo_url': self.photo_url
        }

class FeeStructure(db.Model):
    __tablename__ = 'fee_structures'
    
    id = db.Column(db.Integer, primary_key=True)
    stream = db.Column(db.String(50), nullable=False)
    combination = db.Column(db.String(50), nullable=False)
    year = db.Column(db.String(20), default='1st PU')
    tuition_fee = db.Column(db.Float, nullable=False)
    lab_fee = db.Column(db.Float, default=0.0)
    library_fee = db.Column(db.Float, default=5000.0)
    sports_fee = db.Column(db.Float, default=3000.0)
    exam_fee = db.Column(db.Float, default=4000.0)
    total_amount = db.Column(db.Float, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'stream': self.stream,
            'combination': self.combination,
            'year': self.year,
            'tuition_fee': self.tuition_fee,
            'lab_fee': self.lab_fee,
            'library_fee': self.library_fee,
            'sports_fee': self.sports_fee,
            'exam_fee': self.exam_fee,
            'total_amount': self.total_amount
        }

class StudentFeeRecord(db.Model):
    __tablename__ = 'student_fee_records'
    
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student_profiles.id'), nullable=False)
    academic_year = db.Column(db.String(20), default='2026-2027')
    total_fee = db.Column(db.Float, nullable=False)
    concession_amount = db.Column(db.Float, default=0.0) # Merit scholarship or concession
    net_payable = db.Column(db.Float, nullable=False)
    paid_amount = db.Column(db.Float, default=0.0)
    balance_amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), default='Pending') # Paid, Partial, Pending

    transactions = db.relationship('FeeTransaction', backref='fee_record', lazy=True, cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'student_id': self.student_id,
            'academic_year': self.academic_year,
            'total_fee': self.total_fee,
            'concession_amount': self.concession_amount,
            'net_payable': self.net_payable,
            'paid_amount': self.paid_amount,
            'balance_amount': self.balance_amount,
            'status': self.status,
            'transactions': [t.to_dict() for t in self.transactions]
        }

class FeeTransaction(db.Model):
    __tablename__ = 'fee_transactions'
    
    id = db.Column(db.Integer, primary_key=True)
    fee_record_id = db.Column(db.Integer, db.ForeignKey('student_fee_records.id'), nullable=False)
    transaction_ref = db.Column(db.String(50), unique=True, nullable=False)
    amount = db.Column(db.Float, nullable=False)
    payment_mode = db.Column(db.String(50), default='Sandbox Online Payment') # Sandbox Online, UPI, Card, Net Banking
    status = db.Column(db.String(20), default='Success') # Success, Pending, Failed
    payment_date = db.Column(db.DateTime, default=datetime.utcnow)
    receipt_no = db.Column(db.String(50), unique=True, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'fee_record_id': self.fee_record_id,
            'transaction_ref': self.transaction_ref,
            'amount': self.amount,
            'payment_mode': self.payment_mode,
            'status': self.status,
            'payment_date': self.payment_date.strftime('%Y-%m-%d %H:%M') if self.payment_date else None,
            'receipt_no': self.receipt_no
        }

class CampusFacility(db.Model):
    __tablename__ = 'campus_facilities'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=False) # Academic, Laboratories, Sports, Hostel, Library, Amenities
    description = db.Column(db.Text, nullable=False)
    capacity = db.Column(db.String(100), nullable=True)
    equipment = db.Column(db.Text, nullable=True)
    operating_hours = db.Column(db.String(100), default='8:00 AM - 6:00 PM')
    location = db.Column(db.String(100), default='Main Campus, Block A')
    image_url = db.Column(db.String(255), nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'category': self.category,
            'description': self.description,
            'capacity': self.capacity,
            'equipment': self.equipment,
            'operating_hours': self.operating_hours,
            'location': self.location,
            'image_url': self.image_url
        }

class NewsAnnouncement(db.Model):
    __tablename__ = 'news_announcements'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(50), default='Academic') # Academic, Admissions, Examinations, Holidays, Events
    content = db.Column(db.Text, nullable=False)
    is_pinned = db.Column(db.Boolean, default=False)
    publish_date = db.Column(db.DateTime, default=datetime.utcnow)
    attachment_url = db.Column(db.String(255), nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'category': self.category,
            'content': self.content,
            'is_pinned': self.is_pinned,
            'publish_date': self.publish_date.strftime('%Y-%m-%d') if self.publish_date else None,
            'attachment_url': self.attachment_url
        }

class CollegeEvent(db.Model):
    __tablename__ = 'college_events'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    category = db.Column(db.String(50), default='Cultural') # Cultural, Sports, Science, Seminar, PTM
    event_date = db.Column(db.String(50), nullable=False)
    venue = db.Column(db.String(150), default='Dr. Sarvepalli Radhakrishnan Auditorium')
    description = db.Column(db.Text, nullable=False)
    chief_guest = db.Column(db.String(150), nullable=True)
    image_url = db.Column(db.String(255), nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'category': self.category,
            'event_date': self.event_date,
            'venue': self.venue,
            'description': self.description,
            'chief_guest': self.chief_guest,
            'image_url': self.image_url
        }

class Testimonial(db.Model):
    __tablename__ = 'testimonials'
    
    id = db.Column(db.Integer, primary_key=True)
    author_name = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(50), default='Student') # Student, Parent, Alumni
    batch_year = db.Column(db.String(20), default='2025')
    content = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, default=5)
    avatar_url = db.Column(db.String(255), nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'author_name': self.author_name,
            'role': self.role,
            'batch_year': self.batch_year,
            'content': self.content,
            'rating': self.rating,
            'avatar_url': self.avatar_url
        }

class NotableAlumni(db.Model):
    __tablename__ = 'notable_alumni'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    passing_year = db.Column(db.String(20), nullable=False)
    stream = db.Column(db.String(50), nullable=False)
    current_role = db.Column(db.String(100), nullable=False)
    company_or_institute = db.Column(db.String(150), nullable=False)
    quote = db.Column(db.Text, nullable=True)
    image_url = db.Column(db.String(255), nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'passing_year': self.passing_year,
            'stream': self.stream,
            'current_role': self.current_role,
            'company_or_institute': self.company_or_institute,
            'quote': self.quote,
            'image_url': self.image_url
        }

class AuditLog(db.Model):
    __tablename__ = 'audit_logs'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=True)
    username = db.Column(db.String(80), nullable=True)
    role = db.Column(db.String(20), nullable=True)
    action = db.Column(db.String(100), nullable=False)
    module = db.Column(db.String(50), nullable=False)
    details = db.Column(db.Text, nullable=True)
    ip_address = db.Column(db.String(50), default='127.0.0.1')
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'username': self.username,
            'role': self.role,
            'action': self.action,
            'module': self.module,
            'details': self.details,
            'ip_address': self.ip_address,
            'timestamp': self.timestamp.strftime('%Y-%m-%d %H:%M:%S') if self.timestamp else None
        }

class StudyMaterial(db.Model):
    __tablename__ = 'study_materials'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    subject = db.Column(db.String(50), nullable=False)
    stream = db.Column(db.String(50), default='Science')
    chapter = db.Column(db.String(100), nullable=True)
    material_type = db.Column(db.String(50), default='Lecture Notes') # Lecture Notes, Formula Sheet, Question Bank, Lab Manual
    file_url = db.Column(db.String(255), nullable=True)
    uploaded_by = db.Column(db.String(100), default='Department Faculty')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'subject': self.subject,
            'stream': self.stream,
            'chapter': self.chapter,
            'material_type': self.material_type,
            'file_url': self.file_url,
            'uploaded_by': self.uploaded_by,
            'created_at': self.created_at.strftime('%Y-%m-%d') if self.created_at else None
        }

