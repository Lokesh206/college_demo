# Sri Vidya International Pre-University College
## Smart PU College Website & Complete Digital Academic Management Portal

> **Institutional Tagline:** *"Empowering Young Minds. Building Tomorrow's Leaders."*  
> **Location:** Bengaluru, Karnataka, India  
> **Affiliation:** Recognised by the Government of Karnataka | Department of Pre-University Education  
> **Notice:** *All data within this application is realistic fictional demonstration data created for institutional presentation purposes.*

---

## 🏛️ Project Overview

**Sri Vidya International Pre-University College** is a production-style, database-driven educational ecosystem and academic management platform. It combines a public-facing website, an integrated competitive entrance preparation portal (KCET, NEET, JEE), and four dedicated digital portals:

1. **Public Institution Website** (12 fully responsive navigation modules)
2. **CBT Examination Engine** (Real-time timed Computer-Based Tests with scoring & topic analytics)
3. **Student Portal** (Attendance ledger, internal test scores, timetable, study resources, fee ledger)
4. **Parent Portal** (Linked ward tracking, attendance alerts, exam results, PTM schedules, teacher feedback)
5. **Faculty Portal** (Assigned sections, attendance marking, internal marks entry, notes upload)
6. **Administrative Master Dashboard** (All 32 modules: admissions pipeline, student/faculty records, fees, audit logs, Excel export)
7. **VidyaBot AI Counselor** (AI assistant powered by Google Gemini API with intelligent educational fallback)
8. **Sandbox Fee Payment Gateway** (Realistic checkout simulation, instant balance reconciliation, and ReportLab PDF receipt generator)

---

## 🛠️ Technology Stack

- **Frontend:** React 18, Vite 5, Tailwind CSS, Lucide React icons, Chart.js, Canvas Confetti.
- **Backend:** Python 3, Flask 3, Flask-SQLAlchemy, Flask-CORS, PyJWT, Werkzeug, ReportLab (PDF receipt generation), OpenPyXL (Excel exports), Google Generative AI (Gemini chatbot).
- **Database:** Dual-engine architecture (instant zero-config SQLite for local runs, seamlessly configurable to MySQL for production via `DATABASE_URL`).

---

## 🚀 Quick Start Guide

### Deploy to Render
1. Push this repository to GitHub and open [Render Blueprints](https://dashboard.render.com/blueprints).
2. Select **New Blueprint Instance**, connect this repository, and apply the `render.yaml` configuration.
3. Wait for the build to finish, then open the Render URL shown for the `college-demo` service.

The blueprint builds the React frontend and serves it with the Flask API through Gunicorn. It generates signing keys and disables the documented demo accounts by default because their credentials are public. The free service uses an ephemeral filesystem: database changes can be lost when the service restarts or redeploys, so connect a managed database before using it for persistent data. Add `GEMINI_API_KEY` in the Render dashboard if you want to enable the Gemini chatbot.

### 1. Prerequisites
- Python 3.10+
- Node.js 18+ and npm

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# (Optional) Create virtual environment
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Optional: set backend configuration in backend/.env.
# For stable tokens across restarts, set unique SECRET_KEY and JWT_SECRET_KEY values.

# Run backend (automatically seeds initial database on first run)
python run.py
```
The backend API server will run at `http://localhost:5000`.
Without configured signing keys, random development-only keys are generated at startup; tokens expire when the server restarts.

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install packages
npm install

# Run Vite development server
npm run dev
```
The React frontend will run at `http://localhost:5173`.

### 4. Single-Server Production Mode
The Flask backend is configured to automatically serve the compiled React SPA build:
```bash
cd frontend
npm run build
cd ../backend
python run.py
```
Then visit `http://localhost:5000` to view the unified application!

---

## 🔑 Demo Credentials & Instant 1-Click Login

The login page (`/login`) includes **1-Click Demo Login** buttons for all four roles:

| Role | Username | Password | Persona Details |
| :--- | :--- | :--- | :--- |
| **Student** | `student.rohit` | `student123` | Rohit Sharma (2nd PU PCMB, Target: KCET & NEET) |
| **Parent** | `parent.rohit` | `parent123` | Smt. Sunita Sharma (Mother of Rohit Sharma) |
| **Faculty** | `faculty.physics` | `faculty123` | Dr. Anand Rao (HOD Physics, 18 Yrs Exp, Former IISc Fellow) |
| **Administrator** | `admin` | `admin123` | Dr. R. Narayan (Principal & Academic Dean) |

---

## 📂 Project Directory Structure

```
c:\Users\Lenovo\Desktop\new/
├── backend/
│   ├── app/
│   │   ├── __init__.py           # App factory, blueprints, database seed trigger, static SPA serving
│   │   ├── config.py             # Config & environment variable loading
│   │   ├── extensions.py         # SQLAlchemy, CORS instances
│   │   ├── models.py             # 15+ comprehensive relational database models
│   │   ├── routes/
│   │   │   ├── auth_routes.py      # JWT authentication & 1-click demo login
│   │   │   ├── public_routes.py    # Public streams, faculty, results, facilities, news
│   │   │   ├── admission_routes.py # Applications pipeline, tracking lookup, status patch
│   │   │   ├── exam_routes.py      # CBT mock test engine, submission, instant evaluation
│   │   │   ├── fee_routes.py       # Sandbox payment simulator & ReportLab PDF receipt
│   │   │   ├── student_routes.py   # Student dashboard, attendance, marks, timetable
│   │   │   ├── parent_routes.py    # Parent dashboard, ward tracking, PTM notifications
│   │   │   ├── faculty_routes.py   # Faculty dashboard, attendance marking, marks entry
│   │   │   ├── admin_routes.py     # 32 admin modules, analytics, Excel exports, audit logs
│   │   │   └── chatbot_routes.py   # Gemini AI & knowledge-base conversational assistant
│   │   └── utils/
│   │       ├── auth_helpers.py     # PyJWT token generation, role verification decorators
│   │       ├── pdf_generator.py    # Official PDF receipt generation using ReportLab
│   │       └── seed_data.py        # Comprehensive realistic demonstration data seed
│   ├── run.py                    # Server runner (port 5000)
│   ├── requirements.txt
│   └── .env.example
├── requirements.txt              # Root-level Python dependencies for deployment platforms
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/             # Navbar (12 links), Footer, ChatbotWidget
│   │   │   ├── exams/              # CBTExamEngine (Timer, question palette, solutions)
│   │   │   └── fees/               # PaymentModal (Sandbox gateway simulator)
│   │   ├── context/
│   │   │   └── AuthContext.jsx     # Global authentication & profile state
│   │   ├── pages/
│   │   │   ├── public/             # 12 Public pages (Home, About, Academics, Faculty, etc.)
│   │   │   ├── auth/               # LoginPage with 1-click demo switcher
│   │   │   ├── student/            # StudentDashboard
│   │   │   ├── parent/             # ParentDashboard
│   │   │   ├── faculty/            # FacultyDashboard
│   │   │   └── admin/              # AdminDashboard
│   │   ├── services/
│   │   │   └── api.js              # Centralized API service with JWT authorization
│   │   ├── App.jsx                 # Route definitions & protected routes
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── README.md
```

---

## 🌟 Key Application Features

### 1. Interactive CBT Mock Examination Console
- Real-time countdown timer with color warnings under 5 minutes.
- Question palette marking Answered, Unanswered, and Marked for Review.
- Multiple-choice questions (A, B, C, D) with instantaneous response clearing.
- Automatic or manual submission with instant score calculation, percentage, accuracy, and topic breakdown.
- Question-by-question review with detailed solutions and formulas.

### 2. Admissions Management & Live Tracking
- Online application form with instant unique tracking number generation (`APP-2026-XXXXX`).
- Public tracking page displaying the live 7-stage verification pipeline:
  `New Enquiry` ➔ `Contacted` ➔ `Application Submitted` ➔ `Documents Pending` ➔ `Documents Verified` ➔ `Approved` ➔ `Enrolled`.
- Administrator status updates with internal audit remarks and downloadable Excel roster.

### 3. Sandbox Fee Payment & Official PDF Receipts
- Demonstration payment gateway modal supporting mock UPI, Cards, and Net Banking.
- Immediate database reconciliation of paid balance and remaining balance.
- Official downloadable computer-generated PDF payment receipt with college crest, student details, fee breakdown, and signature blocks.

### 4. VidyaBot AI Academic Counselor
- 24/7 intelligent college chatbot powered by Google Gemini API.
- Instant guidance on streams (PCMB, PCMC, CEBA, HEPS), cutoffs, hostel amenities, bus transit routes, and competitive exams.
- Built-in resilient educational knowledge base fallback.

---

## 📄 License
Demonstration project developed for Sri Vidya International Pre-University College academic evaluation.
