from app.extensions import db
from app.models import (
    User, Stream, Combination, FacultyProfile, StudentProfile, ParentProfile,
    Attendance, InternalMark, AdmissionEnquiry, CompetitiveExam, MockTest,
    Question, BoardResult, StudentTopper, CompetitiveRanker, FeeStructure,
    StudentFeeRecord, FeeTransaction, CampusFacility, NewsAnnouncement,
    CollegeEvent, Testimonial, NotableAlumni, StudyMaterial
)
from datetime import datetime, timedelta

def seed_database():
    """Seeds Sri Vidya International Pre-University College database with rich demonstration data."""
    # Check if already seeded
    if User.query.first():
        print("Database already contains data. Skipping initial seed.")
        return

    print("Seeding Sri Vidya International Pre-University College demo database...")

    # 1. USERS & PROFILES
    # Admin User
    admin = User(
        username='admin',
        email='principal@srividyapuc.edu.in',
        role='admin',
        avatar='https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'
    )
    admin.set_password('admin123')
    db.session.add(admin)

    # Faculty User 1: Dr. Anand Rao (Physics HOD)
    fac_user1 = User(
        username='faculty.physics',
        email='anand.rao@srividyapuc.edu.in',
        role='faculty',
        avatar='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80'
    )
    fac_user1.set_password('faculty123')
    db.session.add(fac_user1)

    # Faculty User 2: Dr. Malini Iyer (Chemistry HOD)
    fac_user2 = User(
        username='faculty.chemistry',
        email='malini.iyer@srividyapuc.edu.in',
        role='faculty',
        avatar='https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80'
    )
    fac_user2.set_password('faculty123')
    db.session.add(fac_user2)

    # Parent User: Smt. Sunita Sharma
    parent_user = User(
        username='parent.rohit',
        email='sunita.sharma@example.com',
        role='parent',
        avatar='https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80'
    )
    parent_user.set_password('parent123')
    db.session.add(parent_user)

    # Student User: Rohit Sharma (2nd PU PCMB)
    student_user = User(
        username='student.rohit',
        email='rohit.sharma@student.srividya.edu.in',
        role='student',
        avatar='https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=256&q=80'
    )
    student_user.set_password('student123')
    db.session.add(student_user)

    # Student User 2: Ananya Deshmukh (2nd PU CEBA)
    student_user2 = User(
        username='student.ananya',
        email='ananya.deshmukh@student.srividya.edu.in',
        role='student',
        avatar='https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80'
    )
    student_user2.set_password('student123')
    db.session.add(student_user2)

    db.session.commit()

    # 2. STREAMS & COMBINATIONS
    stream_sci = Stream(
        name='Science',
        code='SCI',
        description='State-of-the-art experiential learning in physical and life sciences with rigorous KCET, NEET, and JEE preparation.',
        icon='Atom'
    )
    stream_comm = Stream(
        name='Commerce',
        code='COMM',
        description='Comprehensive training in financial accounting, corporate business laws, applied economics, and CA foundation guidance.',
        icon='TrendingUp'
    )
    stream_arts = Stream(
        name='Arts',
        code='ARTS',
        description='Critical humanistic inquiry exploring world history, governance, sociology, psychology, and public administration for civil services aspirants.',
        icon='Landmark'
    )
    db.session.add_all([stream_sci, stream_comm, stream_arts])
    db.session.commit()

    # Combinations
    pcmb = Combination(
        stream_id=stream_sci.id,
        name='PCMB',
        code='PCMB',
        subjects='Physics, Chemistry, Mathematics, Biology, English, Kannada/Hindi/Sanskrit',
        career_paths='MBBS, BDS, B.Tech/B.E, Biotechnology, Agricultural Science, Pure Science Research at IISc/IISER',
        description='The premier combination offering simultaneous eligibility for both engineering and medical competitive exams.',
        annual_intake=160
    )
    pcmc = Combination(
        stream_id=stream_sci.id,
        name='PCMC',
        code='PCMC',
        subjects='Physics, Chemistry, Mathematics, Computer Science, English, Kannada/Hindi/Sanskrit',
        career_paths='B.Tech Computer Science, Artificial Intelligence, Data Science, Software Engineering, BCA, Robotics',
        description='Specially designed for students targeting top-tier software technology, AI, and national engineering institutes.',
        annual_intake=140
    )
    ceba = Combination(
        stream_id=stream_comm.id,
        name='CEBA',
        code='CEBA',
        subjects='Computer Science, Economics, Business Studies, Accountancy, English, Kannada/Hindi/Sanskrit',
        career_paths='B.Com, BBA, CA (Chartered Accountancy), FinTech, Investment Banking, Corporate Law',
        description='Blends modern IT fundamentals with rigorous accounting and business modeling.',
        annual_intake=100
    )
    seba = Combination(
        stream_id=stream_comm.id,
        name='SEBA',
        code='SEBA',
        subjects='Statistics, Economics, Business Studies, Accountancy, English, Kannada/Hindi/Sanskrit',
        career_paths='Actuarial Science, Financial Analytics, Economic Policy, Corporate Auditing, CS',
        description='Focused on data quantification, statistical inference, and financial systems.',
        annual_intake=80
    )
    heps = Combination(
        stream_id=stream_arts.id,
        name='HEPS',
        code='HEPS',
        subjects='History, Economics, Political Science, Sociology, English, Kannada/Hindi/Sanskrit',
        career_paths='UPSC Civil Services, KAS, Corporate Law (BA LLB), Journalism, Diplomacy, Policy Think Tanks',
        description='The foundational pipeline for future civil servants, legal luminaries, and policy analysts.',
        annual_intake=60
    )
    db.session.add_all([pcmb, pcmc, ceba, seba, heps])
    db.session.commit()

    # 3. FACULTY PROFILES
    f1 = FacultyProfile(
        user_id=fac_user1.id,
        employee_id='FAC-SCI-001',
        full_name='Dr. Anand Rao, M.Sc., Ph.D.',
        designation='Head of Department & Senior Lecturer in Physics',
        department='Physics',
        specialization='Electrodynamics & Modern Quantum Physics',
        qualifications='M.Sc. Physics (Bangalore Univ), Ph.D. Applied Physics (IISc Bengaluru)',
        experience_years=18,
        kcet_exp='15 Years - Mentored 40+ Top 100 KCET Rankers',
        neet_exp='12 Years - Specialised in NEET Numerical Problem Solving',
        jee_exp='14 Years - Former Senior Faculty at Premier Kota & Bengaluru Institutes',
        teaching_methodology='Concept visualisation using high-speed lab demonstrations and timed problem-solving frameworks.',
        achievements='State Best Lecturer Award 2022; Author of "Mastering PU Physics for KCET & JEE".',
        publications='12 research publications in International Physics Journals.',
        email='anand.rao@srividyapuc.edu.in',
        phone='+91 98450 11223',
        cabin='Block A - Faculty Enclave Room 204',
        photo_url='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
    )
    f2 = FacultyProfile(
        user_id=fac_user2.id,
        employee_id='FAC-SCI-002',
        full_name='Dr. Malini Iyer, M.Sc., Ph.D.',
        designation='Head of Department & Senior Lecturer in Chemistry',
        department='Chemistry',
        specialization='Organic Reaction Mechanisms & Coordination Chemistry',
        qualifications='M.Sc. Chemistry (Univ of Mysore - Gold Medalist), Ph.D. Organic Chemistry',
        experience_years=16,
        kcet_exp='14 Years - 99.8% PU Board Pass Record',
        neet_exp='14 Years - Guided 25+ students into Government Medical Colleges',
        jee_exp='10 Years - Advanced Inorganic Chemistry Specialist',
        teaching_methodology='Mnemonic retention systems and molecular 3D modeling for stereochemistry.',
        achievements='National Chemical Education Fellowship 2021.',
        publications='8 research articles in Green Chemistry and Synthetic Methodology.',
        email='malini.iyer@srividyapuc.edu.in',
        phone='+91 98450 22334',
        cabin='Block A - Chemistry Research Lab 102',
        photo_url='https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    )
    db.session.add_all([f1, f2])
    db.session.commit()

    # 4. PARENT & STUDENT PROFILES
    parent_p = ParentProfile(
        user_id=parent_user.id,
        full_name='Smt. Sunita Sharma',
        relation='Mother',
        occupation='Senior Software Quality Lead, Infosys Ltd.',
        phone='+91 98451 99887',
        email='sunita.sharma@example.com',
        address='#204, Palm Meadows Villa, Whitefield, Bengaluru - 560066'
    )
    db.session.add(parent_p)
    db.session.commit()

    student_p1 = StudentProfile(
        user_id=student_user.id,
        admission_no='SVP-2025-0142',
        roll_no='24SC01',
        full_name='Rohit Sharma',
        stream_name='Science',
        combination_name='PCMB',
        year='2nd PU',
        section='A',
        dob='2008-05-14',
        gender='Male',
        blood_group='O+',
        parent_id=parent_p.id,
        address='#204, Palm Meadows Villa, Whitefield, Bengaluru - 560066',
        phone='+91 98452 77665',
        email='rohit.sharma@student.srividya.edu.in',
        photo_url='https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
        target_exams='KCET, NEET'
    )
    student_p2 = StudentProfile(
        user_id=student_user2.id,
        admission_no='SVP-2025-0210',
        roll_no='24CM12',
        full_name='Ananya Deshmukh',
        stream_name='Commerce',
        combination_name='CEBA',
        year='2nd PU',
        section='B',
        dob='2008-08-22',
        gender='Female',
        blood_group='B+',
        parent_id=parent_p.id,
        address='#58, Indiranagar 100ft Road, Bengaluru - 560038',
        phone='+91 98453 11224',
        email='ananya.deshmukh@student.srividya.edu.in',
        photo_url='https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
        target_exams='CA Foundation, CUET'
    )
    db.session.add_all([student_p1, student_p2])
    db.session.commit()

    # 5. ATTENDANCE & INTERNAL MARKS (for Rohit Sharma)
    subjects_pcmb = ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English', 'Kannada']
    
    # 30 days of attendance
    base_date = datetime.now() - timedelta(days=35)
    for day in range(30):
        curr_date = (base_date + timedelta(days=day)).strftime('%Y-%m-%d')
        # Skip Sundays
        weekday = (base_date + timedelta(days=day)).weekday()
        if weekday == 6:
            continue
        status = 'Absent' if day in [5, 18] else 'Present'
        for subj in ['Physics', 'Chemistry', 'Mathematics', 'Biology']:
            att = Attendance(
                student_id=student_p1.id,
                date=curr_date,
                status=status,
                subject_name=subj,
                remarks='Classroom lecture & laboratory' if status == 'Present' else 'Medical leave approved'
            )
            db.session.add(att)

    # Internal marks for Rohit
    marks_records = [
        # Unit Test 1 (Max 50)
        InternalMark(student_id=student_p1.id, exam_type='Unit Test 1', subject_name='Physics', max_marks=50, marks_obtained=47.5, grade='A+', remarks='Outstanding conceptual mastery in Kinematics'),
        InternalMark(student_id=student_p1.id, exam_type='Unit Test 1', subject_name='Chemistry', max_marks=50, marks_obtained=46.0, grade='A+', remarks='Excellent atomic structure calculations'),
        InternalMark(student_id=student_p1.id, exam_type='Unit Test 1', subject_name='Mathematics', max_marks=50, marks_obtained=49.0, grade='A+', remarks='Near perfect calculus solutions'),
        InternalMark(student_id=student_p1.id, exam_type='Unit Test 1', subject_name='Biology', max_marks=50, marks_obtained=48.0, grade='A+', remarks='Diagrams well labeled and accurate'),
        # Mid-Term Exam (Max 100)
        InternalMark(student_id=student_p1.id, exam_type='Mid-Term Examination', subject_name='Physics', max_marks=100, marks_obtained=94.0, grade='A+', remarks='Top 3 in Section A'),
        InternalMark(student_id=student_p1.id, exam_type='Mid-Term Examination', subject_name='Chemistry', max_marks=100, marks_obtained=92.5, grade='A+', remarks='Very good analytical answers'),
        InternalMark(student_id=student_p1.id, exam_type='Mid-Term Examination', subject_name='Mathematics', max_marks=100, marks_obtained=97.0, grade='A+', remarks='Highest in Class'),
        InternalMark(student_id=student_p1.id, exam_type='Mid-Term Examination', subject_name='Biology', max_marks=100, marks_obtained=95.0, grade='A+', remarks='Exceptional presentation'),
        InternalMark(student_id=student_p1.id, exam_type='Mid-Term Examination', subject_name='English', max_marks=100, marks_obtained=91.0, grade='A+', remarks='Good prose commentary'),
        # Unit Test 2 (Max 50)
        InternalMark(student_id=student_p1.id, exam_type='Unit Test 2', subject_name='Physics', max_marks=50, marks_obtained=48.0, grade='A+', remarks='Strong Electromagnetism grasp'),
        InternalMark(student_id=student_p1.id, exam_type='Unit Test 2', subject_name='Chemistry', max_marks=50, marks_obtained=47.0, grade='A+', remarks='Organic reactions flawless'),
        InternalMark(student_id=student_p1.id, exam_type='Unit Test 2', subject_name='Mathematics', max_marks=50, marks_obtained=49.5, grade='A+', remarks='Precision in 3D geometry'),
        InternalMark(student_id=student_p1.id, exam_type='Unit Test 2', subject_name='Biology', max_marks=50, marks_obtained=47.5, grade='A+', remarks='Genetics & Evolution solved smoothly')
    ]
    db.session.add_all(marks_records)
    db.session.commit()

    # 6. COMPETITIVE EXAMS & CBT ENGINE MOCK TESTS
    kcet = CompetitiveExam(
        name='KCET',
        full_title='Karnataka Common Entrance Test (KCET 2026)',
        description='State-level gateway conducted by KEA for admission into premier Engineering, Architecture, Agriculture, Veterinary, and Pharma colleges across Karnataka.',
        eligibility='Pass in 2nd PU / 12th standard with Physics and Mathematics as compulsory subjects along with Chemistry/Bio/Biotech/CS with minimum 45% aggregate (40% for reserved categories).',
        pattern='60 marks per subject (Physics, Chemistry, Mathematics/Biology). 1 mark per correct question, NO negative marking. Total 180 marks, 80 minutes per subject.',
        total_marks=180,
        duration_minutes=180,
        syllabus_summary='Standard 1st PU & 2nd PU State Board / NCERT Physics, Chemistry, and Mathematics syllabi.'
    )
    neet = CompetitiveExam(
        name='NEET',
        full_title='National Eligibility cum Entrance Test (NEET UG 2026)',
        description='National single-window entrance exam conducted by NTA for admission to MBBS, BDS, BAMS, BHMS, and other medical courses in premier medical colleges across India including AIIMS and JIPMER.',
        eligibility='Must have passed 10+2 with Physics, Chemistry, Biology/Biotechnology, and English with minimum 50% marks (40% for SC/ST/OBC). Minimum age 17 years.',
        pattern='200 questions (attempt 180): Physics (45), Chemistry (45), Biology (90). +4 marks for correct answer, -1 mark negative marking for incorrect answer. Total 720 marks, 200 minutes.',
        total_marks=720,
        duration_minutes=200,
        syllabus_summary='Core NCERT 11th and 12th syllabi for Botany, Zoology, Physics, and Chemistry.'
    )
    jee = CompetitiveExam(
        name='JEE',
        full_title='Joint Entrance Examination (JEE Main & Advanced 2026)',
        description='National entrance exam conducted by NTA for admission into NITs, IIITs, CFTIs, and qualifying examination for JEE Advanced (IIT admissions).',
        eligibility='Pass in 10+2 with Physics, Mathematics, and one of Chemistry/Biotechnology/Technical Vocational subject. Top 20 percentile or 75% aggregate marks in 12th board.',
        pattern='Section A (MCQs: 20 per subject) + Section B (Numerical: 5 out of 10). +4 marks for correct, -1 mark for incorrect. Total 300 marks, 180 minutes.',
        total_marks=300,
        duration_minutes=180,
        syllabus_summary='Advanced problem-solving across Calculus, Coordinate Geometry, Mechanics, Electromagnetism, Physical, Inorganic and Organic Chemistry.'
    )
    db.session.add_all([kcet, neet, jee])
    db.session.commit()

    # Create Mock Test 1: KCET Physics Master Practice Test
    mock_kcet_phy = MockTest(
        exam_id=kcet.id,
        title='KCET 2026 Physics Speed & Accuracy Sprint #01',
        stream='Science',
        subject='Physics',
        duration_minutes=30,
        total_questions=10,
        total_marks=40,
        instructions='Each question carries 4 marks. There is no negative marking for KCET pattern sprint. Read each numerical carefully.',
        is_published=True
    )
    db.session.add(mock_kcet_phy)
    db.session.commit()

    # 10 Questions for KCET Physics Test
    q_data = [
        {
            'no': 1,
            'text': 'A parallel plate capacitor with air between the plates has a capacitance of 8 pF. What will be the capacitance if the distance between the plates is reduced by half, and the space between them is filled with a substance of dielectric constant K = 6?',
            'a': '48 pF', 'b': '96 pF', 'c': '24 pF', 'd': '12 pF',
            'ans': 'B', 'exp': 'C\' = K * (eps0 * A) / (d/2) = 2 * K * C0 = 2 * 6 * 8 pF = 96 pF.',
            'chap': 'Electrostatic Potential and Capacitance', 'diff': 'Medium'
        },
        {
            'no': 2,
            'text': 'The dimensional formula of magnetic flux (Phi_B) is:',
            'a': '[M L^2 T^-2 A^-1]', 'b': '[M L T^-2 A^-1]', 'c': '[M L^2 T^-1 A^-2]', 'd': '[M^0 L^2 T^-2 A^-1]',
            'ans': 'A', 'exp': 'Phi_B = B * A = (F / (I * L)) * A = ([M L T^-2] / [A L]) * [L^2] = [M L^2 T^-2 A^-1].',
            'chap': 'Electromagnetic Induction', 'diff': 'Easy'
        },
        {
            'no': 3,
            'text': 'A wire of resistance R is stretched uniformly such that its length becomes twice its original length. The new resistance of the wire is:',
            'a': '2 R', 'b': '4 R', 'c': 'R / 2', 'd': 'R / 4',
            'ans': 'B', 'exp': 'Volume remains constant (V = A * L). If length becomes 2L, area becomes A/2. New resistance R\' = rho * (2L) / (A/2) = 4 * (rho * L / A) = 4R.',
            'chap': 'Current Electricity', 'diff': 'Easy'
        },
        {
            'no': 4,
            'text': 'In Young’s double slit experiment, if the distance between the slits is halved and the distance between the slits and screen is doubled, the fringe width will:',
            'a': 'Remain unchanged', 'b': 'Be halved', 'c': 'Be quadrupled (4 times)', 'd': 'Be doubled',
            'ans': 'C', 'exp': 'Fringe width beta = (lambda * D) / d. New fringe width beta\' = (lambda * 2D) / (d/2) = 4 * beta.',
            'chap': 'Wave Optics', 'diff': 'Easy'
        },
        {
            'no': 5,
            'text': 'The de-Broglie wavelength of an electron accelerated through a potential difference of 100 Volts is approximately:',
            'a': '0.123 nm (1.23 Angstrom)', 'b': '1.227 nm', 'c': '12.27 nm', 'd': '0.0123 nm',
            'ans': 'A', 'exp': 'lambda = 1.227 / sqrt(V) nm = 1.227 / sqrt(100) = 1.227 / 10 = 0.1227 nm approx 0.123 nm.',
            'chap': 'Dual Nature of Radiation and Matter', 'diff': 'Medium'
        },
        {
            'no': 6,
            'text': 'A transformer has 500 turns in the primary coil and 1000 turns in the secondary coil. If the primary voltage is 220 V AC at 50 Hz, the secondary voltage and frequency are:',
            'a': '440 V, 100 Hz', 'b': '440 V, 50 Hz', 'c': '110 V, 50 Hz', 'd': '110 V, 25 Hz',
            'ans': 'B', 'exp': 'Vs = Vp * (Ns / Np) = 220 * (1000 / 500) = 440 V. A transformer changes voltage but frequency remains identical (50 Hz).',
            'chap': 'Alternating Current', 'diff': 'Medium'
        },
        {
            'no': 7,
            'text': 'In a p-n junction diode at reverse bias, the current is mainly due to:',
            'a': 'Majority charge carriers', 'b': 'Minority charge carriers across the junction', 'c': 'Diffusion of electrons', 'd': 'Recombination of hole-electron pairs',
            'ans': 'B', 'exp': 'In reverse bias, the barrier height increases, preventing majority carrier flow; the tiny reverse saturation current is due to thermally generated minority carriers.',
            'chap': 'Semiconductor Electronics', 'diff': 'Easy'
        },
        {
            'no': 8,
            'text': 'Two point charges +4 microC and +1 microC are placed 30 cm apart in air. At what distance from the +1 microC charge is the net electrostatic field zero?',
            'a': '10 cm', 'b': '20 cm', 'c': '15 cm', 'd': '7.5 cm',
            'ans': 'A', 'exp': 'Let distance from 1 microC be x. Then k*(1)/x^2 = k*(4)/(30 - x)^2 => (30 - x) / x = sqrt(4/1) = 2 => 30 - x = 2x => 3x = 30 => x = 10 cm.',
            'chap': 'Electric Charges and Fields', 'diff': 'Hard'
        },
        {
            'no': 9,
            'text': 'The radius of gyration of a uniform solid sphere of mass M and radius R about its diametrical axis is:',
            'a': 'sqrt(2/5) * R', 'b': 'sqrt(1/2) * R', 'c': 'sqrt(2/3) * R', 'd': 'sqrt(3/5) * R',
            'ans': 'A', 'exp': 'I = (2/5) * M * R^2. Since I = M * k^2, k = sqrt(2/5) * R.',
            'chap': 'System of Particles & Rotational Motion', 'diff': 'Medium'
        },
        {
            'no': 10,
            'text': 'According to Bohr’s model of the hydrogen atom, the total energy of an electron in the nth orbit is proportional to:',
            'a': 'n', 'b': '1 / n', 'c': '1 / n^2', 'd': 'n^2',
            'ans': 'C', 'exp': 'En = -13.6 / n^2 eV. Thus total energy En is inversely proportional to n^2.',
            'chap': 'Atoms', 'diff': 'Easy'
        }
    ]

    for q in q_data:
        question_obj = Question(
            test_id=mock_kcet_phy.id,
            question_number=q['no'],
            question_text=q['text'],
            option_a=q['a'],
            option_b=q['b'],
            option_c=q['c'],
            option_d=q['d'],
            correct_option=q['ans'],
            explanation=q['exp'],
            subject='Physics',
            chapter=q['chap'],
            difficulty=q['diff'],
            marks=4.0,
            negative_marks=0.0
        )
        db.session.add(question_obj)
    db.session.commit()

    # Create Mock Test 2: NEET Biology Sprint
    mock_neet_bio = MockTest(
        exam_id=neet.id,
        title='NEET 2026 Biology Rapid Revision Diagnostic',
        stream='Science',
        subject='Biology',
        duration_minutes=25,
        total_questions=5,
        total_marks=20,
        instructions='+4 for correct, -1 for wrong answer. Standard NTA NEET marking scheme.',
        is_published=True
    )
    db.session.add(mock_neet_bio)
    db.session.commit()

    neet_questions = [
        {
            'no': 1,
            'text': 'Which of the following cell organelles is responsible for the formation of acrosome in human sperm?',
            'a': 'Mitochondria', 'b': 'Golgi apparatus', 'c': 'Endoplasmic reticulum', 'd': 'Lysosomes',
            'ans': 'B', 'exp': 'The acrosome of the sperm is derived from the Golgi complex during spermiogenesis.',
            'chap': 'Human Reproduction', 'diff': 'Easy'
        },
        {
            'no': 2,
            'text': 'In DNA replication, the leading strand synthesizes continuously while the lagging strand synthesizes discontinuously forming Okazaki fragments. The enzyme that joins Okazaki fragments is:',
            'a': 'DNA Polymerase III', 'b': 'DNA Ligase', 'c': 'Topoisomerase', 'd': 'RNA Primase',
            'ans': 'B', 'exp': 'DNA ligase seals nicks by forming phosphodiester bonds between adjacent Okazaki fragments.',
            'chap': 'Molecular Basis of Inheritance', 'diff': 'Easy'
        },
        {
            'no': 3,
            'text': 'In human nephrons, the maximum absorption of water and electrolytes (nearly 70-80%) occurs in:',
            'a': 'Proximal Convoluted Tubule (PCT)', 'b': 'Descending limb of Loop of Henle', 'c': 'Distal Convoluted Tubule (DCT)', 'd': 'Collecting Duct',
            'ans': 'A', 'exp': 'PCT is lined by simple cuboidal brush border epithelium which increases surface area for 70-80% reabsorption.',
            'chap': 'Excretory Products and their Elimination', 'diff': 'Medium'
        },
        {
            'no': 4,
            'text': 'The process of translation initiation in eukaryotes starts with which amino acid?',
            'a': 'Valine', 'b': 'Methionine', 'c': 'Tryptophan', 'd': 'Glycine',
            'ans': 'B', 'exp': 'The initiation codon AUG codes for Methionine in eukaryotes.',
            'chap': 'Molecular Basis of Inheritance', 'diff': 'Easy'
        },
        {
            'no': 5,
            'text': 'Which hormone stimulates the synthesis and secretion of thyroid hormones from the thyroid gland?',
            'a': 'Thyrotropin (TSH)', 'b': 'Adrenocorticotropic Hormone (ACTH)', 'c': 'Prolactin', 'd': 'Somatotropin',
            'ans': 'A', 'exp': 'TSH released from the anterior pituitary regulates thyroid hormone release.',
            'chap': 'Chemical Coordination and Integration', 'diff': 'Easy'
        }
    ]
    for nq in neet_questions:
        q_obj = Question(
            test_id=mock_neet_bio.id,
            question_number=nq['no'],
            question_text=nq['text'],
            option_a=nq['a'],
            option_b=nq['b'],
            option_c=nq['c'],
            option_d=nq['d'],
            correct_option=nq['ans'],
            explanation=nq['exp'],
            subject='Biology',
            chapter=nq['chap'],
            difficulty=nq['diff'],
            marks=4.0,
            negative_marks=1.0
        )
        db.session.add(q_obj)
    db.session.commit()

    # 7. BOARD RESULTS & HISTORICAL STATISTICS
    results = [
        BoardResult(academic_year='2024-2025', stream='Overall', total_appeared=420, passed=418, distinction_count=345, first_class_count=68, pass_percentage=99.52, college_rank='District 1st Rank (Bengaluru South)'),
        BoardResult(academic_year='2024-2025', stream='Science', total_appeared=280, passed=279, distinction_count=242, first_class_count=35, pass_percentage=99.64, college_rank='Top 3 in Karnataka State'),
        BoardResult(academic_year='2024-2025', stream='Commerce', total_appeared=95, passed=95, distinction_count=74, first_class_count=20, pass_percentage=100.0, college_rank='100% Pass Record - 5 State Ranks'),
        BoardResult(academic_year='2024-2025', stream='Arts', total_appeared=45, passed=44, distinction_count=29, first_class_count=13, pass_percentage=97.77, college_rank='Best Humanities Department Bengaluru'),
        BoardResult(academic_year='2023-2024', stream='Overall', total_appeared=395, passed=392, distinction_count=318, first_class_count=65, pass_percentage=99.24, college_rank='Top 5 PU College Bengaluru'),
    ]
    db.session.add_all(results)

    # Student Toppers
    toppers = [
        StudentTopper(
            academic_year='2024-2025',
            student_name='Aditi V. Kulkarni',
            stream='Science',
            combination='PCMB',
            score_marks=596,
            total_marks=600,
            percentage=99.33,
            rank_title='Karnataka State 2nd Rank (Science)',
            photo_url='https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
            testimonial='Sri Vidya PU College provided me the perfect blend of NCERT board depth and high-speed KCET/NEET coaching under one roof!'
        ),
        StudentTopper(
            academic_year='2024-2025',
            student_name='Karthik Sundaram',
            stream='Commerce',
            combination='CEBA',
            score_marks=594,
            total_marks=600,
            percentage=99.00,
            rank_title='Karnataka State 4th Rank (Commerce)',
            photo_url='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
            testimonial='The dedicated CA Foundation club and constant mentorship by experienced faculties helped me achieve 100/100 in Accountancy.'
        ),
        StudentTopper(
            academic_year='2024-2025',
            student_name='Meera Nandakumar',
            stream='Arts',
            combination='HEPS',
            score_marks=589,
            total_marks=600,
            percentage=98.17,
            rank_title='State 3rd Rank (Humanities)',
            photo_url='https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
            testimonial='The debate clubs, model parliament sessions, and in-depth civil services foundation gave me unshakeable clarity.'
        )
    ]
    db.session.add_all(toppers)

    # Competitive Rankers
    comp_rankers = [
        CompetitiveRanker(
            exam_name='KCET',
            academic_year='2024-2025',
            student_name='Rohan Shenoy',
            score='Physics 59/60, Chem 58/60, Math 60/60',
            all_india_rank=None,
            state_rank=14,
            stream='Science (PCMB)',
            college_enrolled='B.Tech Computer Science, RV College of Engineering (RVCE)',
            photo_url='https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80'
        ),
        CompetitiveRanker(
            exam_name='NEET',
            academic_year='2024-2025',
            student_name='Pooja Hegde',
            score='705 / 720 (99.98 Percentile)',
            all_india_rank=142,
            state_rank=8,
            stream='Science (PCMB)',
            college_enrolled='MBBS, Bangalore Medical College & Research Institute (BMCRI)',
            photo_url='https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
        ),
        CompetitiveRanker(
            exam_name='JEE',
            academic_year='2024-2025',
            student_name='Siddharth Rao',
            score='99.86 Percentile (JEE Main) / Rank 318 (JEE Advanced)',
            all_india_rank=318,
            state_rank=18,
            stream='Science (PCMC)',
            college_enrolled='B.Tech Electrical Engineering, IIT Madras',
            photo_url='https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80'
        )
    ]
    db.session.add_all(comp_rankers)
    db.session.commit()

    # 8. FEE STRUCTURES & STUDENT FEE RECORD
    fees = [
        FeeStructure(stream='Science', combination='PCMB', year='1st PU', tuition_fee=60000, lab_fee=18000, library_fee=6000, sports_fee=4000, exam_fee=7000, total_amount=95000),
        FeeStructure(stream='Science', combination='PCMB', year='2nd PU', tuition_fee=62000, lab_fee=18000, library_fee=6000, sports_fee=4000, exam_fee=8000, total_amount=98000),
        FeeStructure(stream='Science', combination='PCMC', year='1st PU', tuition_fee=58000, lab_fee=15000, library_fee=6000, sports_fee=4000, exam_fee=7000, total_amount=90000),
        FeeStructure(stream='Commerce', combination='CEBA', year='1st PU', tuition_fee=48000, lab_fee=8000, library_fee=6000, sports_fee=4000, exam_fee=6000, total_amount=72000),
        FeeStructure(stream='Arts', combination='HEPS', year='1st PU', tuition_fee=35000, lab_fee=0, library_fee=5000, sports_fee=4000, exam_fee=6000, total_amount=50000)
    ]
    db.session.add_all(fees)
    db.session.commit()

    # Student Fee Record for Rohit Sharma (2nd PU PCMB: Total 98000, Concession 10000, Paid 60000, Bal 28000)
    s_fee = StudentFeeRecord(
        student_id=student_p1.id,
        academic_year='2026-2027',
        total_fee=98000.0,
        concession_amount=10000.0, # Merit Academic Concession
        net_payable=88000.0,
        paid_amount=60000.0,
        balance_amount=28000.0,
        status='Partial'
    )
    db.session.add(s_fee)
    db.session.commit()

    # Seed an existing transaction
    fee_txn = FeeTransaction(
        fee_record_id=s_fee.id,
        transaction_ref='TXN-SVP-2026-8841',
        amount=60000.0,
        payment_mode='Sandbox Online Payment (HDFC NetBanking)',
        status='Success',
        receipt_no='RCP-2026-00412'
    )
    db.session.add(fee_txn)
    db.session.commit()

    # 9. CAMPUS FACILITIES
    facilities = [
        CampusFacility(
            title='Main Academic Heritage Block',
            category='Academic',
            description='Sprawling 5-storey state-of-the-art academic building with acoustic architectural design, high-speed Wi-Fi, elevators, and wide corridors.',
            capacity='60 Large Lecture Theatres',
            equipment='Interactive 85" Smart Display Boards, Ergonomic Desks, Central PA System',
            operating_hours='7:30 AM - 6:30 PM',
            location='Main Campus, Block A',
            image_url='https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80'
        ),
        CampusFacility(
            title='Sir C.V. Raman Advanced Physics Laboratory',
            category='Laboratories',
            description='Modern optical, acoustic, and electromagnetic experimental stations where theory meets practical discovery.',
            capacity='60 Students per session',
            equipment='Spectrometers, Travelling Microscopes, Cathode Ray Oscilloscopes, Laser Optics Kits',
            operating_hours='8:00 AM - 5:00 PM',
            location='Science Block, Ground Floor',
            image_url='https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=800&q=80'
        ),
        CampusFacility(
            title='Marie Curie Analytical Chemistry Laboratory',
            category='Laboratories',
            description='Fully ventilated, flame-resistant lab designed with high-grade exhaust hoods, digital titration sensors, and safety showers.',
            capacity='60 Students per session',
            equipment='Digital Centrifuges, Fume Hoods, Electronic Analytical Balances, Burettes',
            operating_hours='8:00 AM - 5:00 PM',
            location='Science Block, 1st Floor',
            image_url='https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80'
        ),
        CampusFacility(
            title='Dr. S. Radhakrishnan Central & Digital Library',
            category='Library',
            description='Quiet, air-conditioned multi-level sanctuary housing 45,000+ textbooks, reference encyclopedias, competitive exam question banks, and 50 digital Kindle/PC stations.',
            capacity='250 Readers at a time',
            equipment='50 High-Speed PCs, DelNet & INFLIBNET Subscriptions, OPAC Search Terminals',
            operating_hours='7:30 AM - 8:00 PM',
            location='Block B, 2nd Floor',
            image_url='https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80'
        ),
        CampusFacility(
            title='Turing High-Performance Computing Laboratory',
            category='Laboratories',
            description='Over 120 Intel Core i7 workstations configured with dual boot Linux & Windows, Python 3, C++, Java, and MySQL IDEs.',
            capacity='120 Workstations',
            equipment='Gigabit Ethernet, Dual Displays for Faculty, High-Capacity UPS backup',
            operating_hours='8:00 AM - 6:00 PM',
            location='Block B, 3rd Floor',
            image_url='https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'
        ),
        CampusFacility(
            title='Olympic Sports Complex & Track',
            category='Sports',
            description='Comprehensive indoor sports arena featuring wooden badminton courts, table tennis, yoga studio, alongside an outdoor synthetic athletic track and football turf.',
            capacity='800 Spectators',
            equipment='Synthetic Turf, Floodlights, Automated Ball Launchers, First Aid Support',
            operating_hours='6:00 AM - 7:00 PM',
            location='South Campus Sports Ground',
            image_url='https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80'
        ),
        CampusFacility(
            title='Kaveri & Sharavathi Residential Hostels',
            category='Hostel',
            description='Separate, highly secure hostel blocks for boys and girls with 24/7 CCTV surveillance, biometric access, warden care, study rooms, and hygienic dining halls.',
            capacity='400 Resident Students',
            equipment='Solar Water Heaters, RO Filtered Water, Wi-Fi Zones, Sick Bay with Nurse',
            operating_hours='24/7 Resident Support',
            location='Campus Residential Enclave',
            image_url='https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80'
        ),
        CampusFacility(
            title='Fleet of 24 College Transit Buses',
            category='Amenities',
            description='Comfortable, air-conditioned bus service covering all major localities of Bengaluru with real-time GPS tracking accessible via Parent Portal.',
            capacity='24 Buses (1,200 seats)',
            equipment='Speed Governors, GPS Tracking, On-Board First Aid, CCTV Cameras',
            operating_hours='6:30 AM - 6:30 PM',
            location='Transportation Depot',
            image_url='https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80'
        )
    ]
    db.session.add_all(facilities)

    # 10. NEWS, EVENTS, TESTIMONIALS & ALUMNI
    news_items = [
        NewsAnnouncement(
            title='Admissions Open for Academic Year 2026-2027: Science, Commerce & Arts',
            category='Admissions',
            content='Sri Vidya International Pre-University College invites online applications for 1st PU batch 2026-2027. Early bird scholarship applications are now being reviewed.',
            is_pinned=True
        ),
        NewsAnnouncement(
            title='Karnataka PU Board Preparatory Examinations Timetable Announced',
            category='Examinations',
            content='The final state-wide preparatory exams for 2nd PU students will commence from February 12th. Detailed timetable is available on the Student & Parent portals.',
            is_pinned=True
        ),
        NewsAnnouncement(
            title='Intensive KCET / NEET 60-Day Crash Course Commencing Soon',
            category='Academic',
            content='Special weekend diagnostic workshops and timed CBT mock sessions will be conducted by senior Kota & Bengaluru guest faculty starting this Saturday.',
            is_pinned=False
        ),
        NewsAnnouncement(
            title='Annual Science & Tech Exhibition "PRAGYAN 2026" Scheduled',
            category='Events',
            content='Over 80 innovative working prototypes and robotics models will be showcased by PU students. Parents and school principals are cordially invited.',
            is_pinned=False
        )
    ]
    db.session.add_all(news_items)

    events = [
        CollegeEvent(
            title='PRAGYAN 2026 - Inter-Collegiate Science & Innovation Fest',
            category='Science',
            event_date='November 15, 2026',
            venue='Dr. Sarvepalli Radhakrishnan Auditorium & Central Lawns',
            description='A 2-day extravaganza celebrating student creativity in robotics, biotechnology exhibits, coding hackathons, and science quiz.',
            chief_guest='Dr. K. Sivan, Former Chairman, ISRO',
            image_url='https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80'
        ),
        CollegeEvent(
            title='TARANG 2026 - Annual Cultural Fest',
            category='Cultural',
            event_date='December 18, 2026',
            venue='Open Air Amphitheatre',
            description='Celebration of Indian classical dance, Western acoustics, drama, painting, and culinary arts showcasing vibrant youth spirit.',
            chief_guest='Padma Shri Smt. Manjamma Jogati',
            image_url='https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80'
        ),
        CollegeEvent(
            title='Parent-Teacher Interaction & Career Diagnostic Meet (PTM)',
            category='Academic',
            event_date='November 08, 2026',
            venue='Respective Department Enclaves',
            description='One-on-one session between parents and faculty to discuss midterm results, mock test accuracy, and competitive exam roadmaps.',
            chief_guest='Dr. R. Narayan, Principal',
            image_url='https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80'
        )
    ]
    db.session.add_all(events)

    testimonials = [
        Testimonial(
            author_name='Dr. Arvind V. Shenoy, MD (AIIMS)',
            role='Alumni (Batch 2020)',
            batch_year='2020',
            content='The unwavering discipline, micro-level concept teaching by Dr. Anand Rao, and regular Sunday mock exams at Sri Vidya PUC were the cornerstone of my NEET success.',
            rating=5,
            avatar_url='https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=256&q=80'
        ),
        Testimonial(
            author_name='Smt. Radhika Krishnan',
            role='Parent',
            batch_year='2025',
            content='As a working parent, the transparent Parent Portal, daily SMS attendance notifications, and genuine faculty warmth gave us immense peace of mind.',
            rating=5,
            avatar_url='https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80'
        ),
        Testimonial(
            author_name='Tanvi Singhania, CA Finalist',
            role='Alumni (Commerce 2021)',
            batch_year='2021',
            content='Sri Vidya has arguably the best Commerce faculty in Bengaluru. Clearing CA Foundation in my first attempt straight out of 2nd PU was a breeze thanks to Prof. Rekha.',
            rating=5,
            avatar_url='https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80'
        )
    ]
    db.session.add_all(testimonials)

    alumni = [
        NotableAlumni(
            name='Dr. Arvind V. Shenoy',
            passing_year='2020',
            stream='Science (PCMB)',
            current_role='Resident Physician',
            company_or_institute='AIIMS New Delhi',
            quote='Sri Vidya taught me that consistent effort beats raw genius every single time.',
            image_url='https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80'
        ),
        NotableAlumni(
            name='Kavya S. Murthy',
            passing_year='2019',
            stream='Science (PCMC)',
            current_role='Senior AI Research Engineer',
            company_or_institute='Google DeepMind, London',
            quote='The computer science laboratories and mathematics mentoring here ignited my passion for machine learning.',
            image_url='https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80'
        ),
        NotableAlumni(
            name='Varun Sundar, IAS',
            passing_year='2018',
            stream='Arts (HEPS)',
            current_role='Assistant Commissioner & Sub-Divisional Magistrate',
            company_or_institute='Government of Karnataka (KAS / IAS Cadre)',
            quote='The deep foundation in political philosophy and Indian economics built during my PU days here formed the bedrock of my UPSC success.',
            image_url='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
        )
    ]
    db.session.add_all(alumni)

    # 11. SAMPLE ADMISSION ENQUIRIES
    enquiries = [
        AdmissionEnquiry(
            application_no='APP-2026-00101',
            student_name='Nikhil Bharadwaj',
            parent_name='Srinivas Bharadwaj',
            email='srinivas.b@gmail.com',
            phone='+91 98451 22334',
            previous_school='National Public School (NPS) Indiranagar',
            previous_marks_pct=95.4,
            preferred_stream='Science',
            preferred_combination='PCMB',
            academic_year='2026-2027',
            address='14th Main, HAL 2nd Stage, Bengaluru',
            message='Interested in integrated NEET coaching with hostel facility.',
            status='Approved',
            notes='Excellent academic score in 10th ICSE; approved for Merit Concession of 15%.'
        ),
        AdmissionEnquiry(
            application_no='APP-2026-00102',
            student_name='Diya Suresh',
            parent_name='Suresh Babu',
            email='diya.suresh@outlook.com',
            phone='+91 98452 44556',
            previous_school='Delhi Public School (DPS) Bangalore South',
            previous_marks_pct=92.0,
            preferred_stream='Commerce',
            preferred_combination='CEBA',
            academic_year='2026-2027',
            address='Kanakapura Road, Bengaluru',
            message='Looking for CA foundation coaching along with 1st PU CEBA.',
            status='Documents Verified',
            notes='All marksheets and transfer certificate verified.'
        ),
        AdmissionEnquiry(
            application_no='APP-2026-00103',
            student_name='Tarun Gowda',
            parent_name='Lokesh Gowda',
            email='lokesh.gowda@yahoo.com',
            phone='+91 98453 66778',
            previous_school='St. Josephs Boys High School',
            previous_marks_pct=88.5,
            preferred_stream='Science',
            preferred_combination='PCMC',
            academic_year='2026-2027',
            address='Sarjapur Road, Bengaluru',
            message='Seeking admission for JEE Main / Advanced preparation.',
            status='Application Submitted',
            notes='Awaiting verification of 10th marks card.'
        ),
        AdmissionEnquiry(
            application_no='APP-2026-00104',
            student_name='Sneha Patil',
            parent_name='Basavaraj Patil',
            email='sneha.patil@gmail.com',
            phone='+91 98454 88990',
            previous_school='Kendriya Vidyalaya ASC Centre',
            previous_marks_pct=90.2,
            preferred_stream='Arts',
            preferred_combination='HEPS',
            academic_year='2026-2027',
            address='Domlur Layout, Bengaluru',
            message='Aspirant for civil services foundation course.',
            status='New Enquiry',
            notes='Fresh enquiry received via college website.'
        )
    ]
    db.session.add_all(enquiries)

    # 12. STUDY MATERIALS
    study_mats = [
        StudyMaterial(
            title='Electrostatics & Capacitance - Formula Sheet & High Yield Summary',
            subject='Physics',
            stream='Science',
            chapter='Electric Charges, Fields and Potential',
            material_type='Formula Sheet',
            file_url='#',
            uploaded_by='Dr. Anand Rao (HOD Physics)'
        ),
        StudyMaterial(
            title='Coordination Compounds - Color, Isomerism & Crystal Field Splitting Notes',
            subject='Chemistry',
            stream='Science',
            chapter='Coordination Chemistry',
            material_type='Lecture Notes',
            file_url='#',
            uploaded_by='Dr. Malini Iyer (HOD Chemistry)'
        ),
        StudyMaterial(
            title='Calculus Made Simple - Integration Shortcuts for KCET / JEE',
            subject='Mathematics',
            stream='Science',
            chapter='Integrals & Differential Equations',
            material_type='Question Bank',
            file_url='#',
            uploaded_by='Prof. S. Ranganath (HOD Mathematics)'
        ),
        StudyMaterial(
            title='Human Physiology - High Yield Diagrammatic Guide for NEET',
            subject='Biology',
            stream='Science',
            chapter='Endocrine and Neural System',
            material_type='Lab Manual',
            file_url='#',
            uploaded_by='Prof. K. Venkatesh (HOD Biology)'
        ),
        StudyMaterial(
            title='Partnership Accounts - Goodwill & Revaluation Comprehensive Models',
            subject='Accountancy',
            stream='Commerce',
            chapter='Accounting for Partnership Firms',
            material_type='Lecture Notes',
            file_url='#',
            uploaded_by='Prof. Rekha Hegde (HOD Commerce)'
        )
    ]
    db.session.add_all(study_mats)

    db.session.commit()
    print("Sri Vidya International Pre-University College database seeded successfully!")

