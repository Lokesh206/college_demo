import os
from flask import Blueprint, request, jsonify, current_app

chatbot_bp = Blueprint('chatbot', __name__, url_prefix='/api/chatbot')

COLLEGE_CONTEXT = """
You are 'VidyaBot', the official AI Academic and Admissions Counselor of Sri Vidya International Pre-University College, Bengaluru, Karnataka.
Key College Information:
- Location: #42, Vidya Soudha Campus, Outer Ring Road, Marathahalli-Sarjapur Junction, Bengaluru - 560103.
- Affiliation: Recognised by the Government of Karnataka, Pre-University Education Board.
- Streams Offered:
  1. Science: PCMB (Physics, Chem, Math, Bio), PCMC (Physics, Chem, Math, Comp Sci).
  2. Commerce: CEBA (Comp Sci, Econ, Bus Studies, Accountancy), SEBA, HEBA.
  3. Arts: HEPS (History, Econ, Pol Sci, Sociology), HESP.
  4. Languages: English, Kannada, Hindi, Sanskrit.
- Competitive Examination Preparation:
  - Integrated KCET coaching (Karnataka Common Entrance Test).
  - Integrated NEET coaching (National Eligibility cum Entrance Test).
  - Integrated JEE Main & Advanced coaching.
  - Dedicated daily doubt sessions, weekly OMR/CBT mock tests, personal performance analytics.
- Board Exam Track Record: 99.52% overall pass rate, 82.4% distinctions. State top 5 ranks.
- Facilities: Smart digital classrooms, high-tech labs (Physics, Chemistry, Biology, Computer Science with 120 PCs), Olympic sports complex, Kaveri & Sharavathi separate hostels, fleet of 24 GPS-monitored buses.
- Admissions 2026-2027: Online enquiry form available on website. Merit scholarships up to 25% for 90%+ in 10th standard.
- Contact: Phone: +91 80 2845 7890, Email: contact@srividyapuc.edu.in.
Tone: Warm, academic, polite, encouraging, professional, and well-structured.
"""

def smart_fallback_response(query):
    q = query.lower()
    if any(k in q for k in ['stream', 'course', 'combination', 'pcmb', 'pcmc', 'ceba', 'heps', 'subject']):
        return (
            "Sri Vidya PU College offers three comprehensive academic streams:\n\n"
            "• **Science**: PCMB (Physics, Chemistry, Mathematics, Biology) and PCMC (Physics, Chemistry, Mathematics, Computer Science).\n"
            "• **Commerce**: CEBA (Computer Science, Economics, Business Studies, Accountancy) and SEBA.\n"
            "• **Arts**: HEPS (History, Economics, Political Science, Sociology).\n"
            "Languages: English, Kannada, Hindi, and Sanskrit.\n\n"
            "Would you like guidance on which stream best aligns with your future career goals?"
        )
    elif any(k in q for k in ['kcet', 'neet', 'jee', 'competitive', 'entrance', 'coaching', 'mock']):
        return (
            "We provide integrated coaching for **KCET, NEET, and JEE** embedded directly into the daily college timetable!\n\n"
            "• Regular timed Computer-Based Tests (CBT) and OMR sprint tests.\n"
            "• Topic-wise analytics and question-level explanations.\n"
            "• Senior faculties with over 15+ years of entrance coaching experience.\n"
            "• You can even try our online Mock CBT Test right now from the Competitive Exams section!"
        )
    elif any(k in q for k in ['fee', 'fees', 'cost', 'payment', 'scholarship', 'concession']):
        return (
            "Our annual fee structure is transparent and includes tuition, laboratories, library, and examination fees:\n\n"
            "• **Science (PCMB/PCMC)**: ₹90,000 – ₹98,000 per annum.\n"
            "• **Commerce (CEBA/SEBA)**: ₹72,000 – ₹75,000 per annum.\n"
            "• **Arts (HEPS)**: ₹50,000 – ₹55,000 per annum.\n\n"
            "**Merit Scholarships**: Up to 25% fee concession is awarded to students scoring above 90% in their 10th standard examinations."
        )
    elif any(k in q for k in ['admission', 'apply', 'enquiry', 'eligibility', 'process', 'form']):
        return (
            "Admissions for the **2026–2027 Academic Year** are currently open!\n\n"
            "You can apply in 3 simple steps:\n"
            "1. Fill out the online application enquiry on our **Admissions** page.\n"
            "2. Receive your unique Application Tracking Number (e.g. `APP-2026-XXXXX`).\n"
            "3. Our counseling team will review your 10th score and schedule a campus interaction."
        )
    elif any(k in q for k in ['hostel', 'bus', 'transport', 'facility', 'campus', 'lab', 'sports', 'canteen']):
        return (
            "Sri Vidya PU College boasts world-class infrastructure:\n\n"
            "• **Laboratories**: Modern Physics, Chemistry, Biology, and 120-workstation Computer Science labs.\n"
            "• **Hostels**: Secure separate boys' (Kaveri) and girls' (Sharavathi) residential hostels with hygienic dining.\n"
            "• **Transportation**: Fleet of 24 air-conditioned, GPS-tracked college buses across Bengaluru.\n"
            "• **Sports**: Olympic indoor arena, badminton, table tennis, and athletic turf."
        )
    elif any(k in q for k in ['contact', 'address', 'location', 'phone', 'email', 'timing']):
        return (
            "**Contact Sri Vidya International Pre-University College**:\n\n"
            "📍 **Address**: #42, Vidya Soudha Campus, Outer Ring Road, Marathahalli-Sarjapur Junction, Bengaluru - 560103.\n"
            "📞 **Helpline**: +91 80 2845 7890 / 7891\n"
            "✉️ **Email**: contact@srividyapuc.edu.in\n"
            "🕒 **Office Hours**: Monday to Saturday, 8:00 AM – 5:00 PM."
        )
    else:
        return (
            "Welcome to Sri Vidya International Pre-University College! I am **VidyaBot**, your 24/7 AI Counselor.\n\n"
            "I can assist you with:\n"
            "• Available Academic Streams & Combinations (PCMB, PCMC, CEBA, HEPS)\n"
            "• Integrated KCET, NEET & JEE Preparation\n"
            "• Online Admissions & Eligibility\n"
            "• Fee Structures & Merit Scholarships\n"
            "• Campus Facilities, Hostels & Bus Routes\n\n"
            "What would you like to know more about today?"
        )

@chatbot_bp.route('/query', methods=['POST'])
def handle_chat_query():
    data = request.get_json() or {}
    user_message = data.get('message', '').strip()

    if not user_message:
        return jsonify({'error': 'Message cannot be empty.'}), 400

    api_key = current_app.config.get('GEMINI_API_KEY') or os.environ.get('GEMINI_API_KEY')
    
    if api_key and api_key != 'your_gemini_api_key_here':
        try:
            import google.generativeai as genai
            genai.configure(api_key=api_key)
            model = genai.GenerativeModel('gemini-1.5-flash')
            prompt = f"{COLLEGE_CONTEXT}\n\nStudent/Parent Question: {user_message}\nVidyaBot Answer:"
            response = model.generate_content(prompt)
            if response and response.text:
                return jsonify({'reply': response.text, 'source': 'gemini-ai'})
        except Exception as e:
            # Silently fallback to our high-quality smart contextual assistant
            pass

    # High quality domain smart engine
    fallback_reply = smart_fallback_response(user_message)
    return jsonify({'reply': fallback_reply, 'source': 'college-knowledge-base'})

