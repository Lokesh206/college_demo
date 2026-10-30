import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, Award, BookOpen, Atom, TrendingUp, Landmark, 
  CheckCircle2, ArrowRight, Trophy, Users, Shield, Sparkles, 
  MapPin, Phone, Star, Calendar, Bell, ChevronRight, Play, Check,
  Clock, Image as ImageIcon, Video, Compass, HeartHandshake, Eye,
  Maximize2, X, MessageSquare, ExternalLink, Share2, Youtube,
  Instagram, Linkedin, Send, Building, BookCheck, FlaskConical,
  Laptop, Library, Dumbbell, History, Target
} from 'lucide-react';
import { api } from '../../services/api';

export default function HomePage() {
  const [overview, setOverview] = useState(null);
  const [streams, setStreams] = useState([]);
  const [toppers, setToppers] = useState([]);
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [enquirySuccess, setEnquirySuccess] = useState(null);
  const [enquiryLoading, setEnquiryLoading] = useState(false);

  // Gallery filter & modal state
  const [galleryFilter, setGalleryFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  // Lecture schedule tab state
  const [lectureTab, setLectureTab] = useState('science'); // science, commerce, entrance

  // Admission enquiry form state
  const [formData, setFormData] = useState({
    student_name: '',
    parent_name: '',
    email: '',
    phone: '',
    previous_school: '',
    previous_marks_pct: '',
    preferred_stream: 'Science',
    preferred_combination: 'PCMB',
    message: ''
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [ovData, strData, resData, newsData, evData, testData] = await Promise.all([
          api.getOverview(),
          api.getStreams(),
          api.getResults(),
          api.getNews(),
          api.getEvents(),
          api.getTestimonials()
        ]);
        setOverview(ovData);
        setStreams(strData);
        setToppers(resData.toppers || []);
        setNews(newsData.slice(0, 4));
        setEvents(evData.slice(0, 3));
        setTestimonials(testData.slice(0, 3));
      } catch (err) {
        console.error('Failed to load homepage data:', err);
      }
    }
    fetchData();
  }, []);

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setEnquiryLoading(true);
    try {
      const res = await api.submitEnquiry(formData);
      setEnquirySuccess(res.application_no);
      setFormData({
        student_name: '',
        parent_name: '',
        email: '',
        phone: '',
        previous_school: '',
        previous_marks_pct: '',
        preferred_stream: 'Science',
        preferred_combination: 'PCMB',
        message: ''
      });
    } catch (err) {
      alert('Error submitting enquiry: ' + err.message);
    } finally {
      setEnquiryLoading(false);
    }
  };

  // 10 High-Quality College Campus Gallery Photos
  const galleryItems = [
    {
      id: 1,
      title: 'Sir C.V. Raman Physics Laboratory',
      category: 'Laboratories',
      badge: 'Advanced Optics',
      img: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=800&q=80',
      desc: 'Precision laser spectrometers, darkroom optical benches, and digital oscilloscope stations for PU board and competitive practicals.'
    },
    {
      id: 2,
      title: 'Main Academic Quadrangle & Campus',
      category: 'Campus',
      badge: '8.5-Acre Campus',
      img: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80',
      desc: 'Lush green modern educational enclave situated on Outer Ring Road, Bengaluru, combining architectural grandeur with eco-friendly design.'
    },
    {
      id: 3,
      title: 'Dr. A.P.J. Abdul Kalam Central Digital Library',
      category: 'Library',
      badge: '45,000+ Volumes',
      img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
      desc: 'Comprehensive collection of NCERT treatises, international research journals, 50 digital research terminals, and quiet study alcoves.'
    },
    {
      id: 4,
      title: 'Alan Turing Computer Science & AI Lab',
      category: 'Laboratories',
      badge: '120 Terminals',
      img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
      desc: 'High-speed gigabit workstations equipped with Python 3, C++, MySQL, and automated mock testing portals for computer science students.'
    },
    {
      id: 5,
      title: 'Marie Curie Chemistry Research Lab',
      category: 'Laboratories',
      badge: 'Analytical Chemistry',
      img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
      desc: 'Flame-retardant safety stations, digital micro-pipettes, fume exhaust cupboards, and organic synthesis titration benches.'
    },
    {
      id: 6,
      title: 'Sir M. Visvesvaraya Auditorium',
      category: 'Campus',
      badge: '800-Seater',
      img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
      desc: 'State-of-the-art acoustic convention hall hosting national science symposiums, guest lectures by ISRO scientists, and annual convocations.'
    },
    {
      id: 7,
      title: 'Olympic Sports Arena & Synthetic Turf',
      category: 'Sports',
      badge: 'Multi-Sport Complex',
      img: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
      desc: 'All-weather 400m synthetic athletic track, wooden indoor badminton courts, table tennis hall, and basketball courts.'
    },
    {
      id: 8,
      title: 'TARANG Annual Inter-Collegiate Youth Fest',
      category: 'Events',
      badge: 'Cultural Grandeur',
      img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
      desc: 'Karnataka state-level inter-PU cultural fest celebrating classical Indian dance, acoustic bands, debates, and street theater.'
    },
    {
      id: 9,
      title: 'Smart Acoustic Lecture Theatres',
      category: 'Campus',
      badge: 'Interactive Panels',
      img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
      desc: 'Tiered lecture halls equipped with 4K touch display panels, lecture recording cameras, and ergonomic seating.'
    },
    {
      id: 10,
      title: 'Kaveri & Sharavathi Residential Hostels',
      category: 'Campus',
      badge: 'On-Campus Living',
      img: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
      desc: 'Separate residential complexes for boys and girls with 24/7 warden care, biometric security, hygienic vegetarian dining, and Wi-Fi.'
    }
  ];

  const galleryCategories = ['All', 'Laboratories', 'Campus', 'Library', 'Sports', 'Events'];
  const filteredGallery = galleryFilter === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === galleryFilter);

  // Founders Data (More Than One Founder)
  const founders = [
    {
      name: 'Dr. Sri Vidya Sagar',
      qualification: 'M.Tech, Ph.D. (Cantab), D.Sc. (Hon.)',
      role: 'Founder & Chief Patron',
      badge: 'Visionary Educationist',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80',
      quote: '"Education must awaken latent genius, combining laboratory rigor with moral courage."',
      desc: 'Former Vice-Chancellor of Bengaluru Central University and recipient of the Karnataka Rajyotsava Award for Academic Distinction. Established Sri Vidya Educational Trust in 2008 with a personal endowment.'
    },
    {
      name: 'Smt. Shakuntala Vidya Sagar',
      qualification: 'M.A., B.Ed., M.Phil.',
      role: 'Co-Founder & Managing Trustee',
      badge: 'Champion of STEM for Girls',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80',
      quote: '"No deserving student should ever be denied world-class education due to financial hardship."',
      desc: 'Dedicated educational philanthropist and former advisor to the Karnataka State Women\'s Educational Forum. Architect of the Sri Vidya Merit-cum-Means Scholarship which supports 200+ students annually.'
    },
    {
      name: 'Sri B. S. Krishnamurthy',
      qualification: 'B.Sc., LL.M. (Senior Advocate)',
      role: 'Co-Founder & Chairman, Governing Council',
      badge: 'Institutional Governance',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80',
      quote: '"Discipline and analytical clarity form the bedrock of enduring academic excellence."',
      desc: 'Senior Advocate at the High Court of Karnataka and former Dean of Legal Studies. Formulated the institution\'s statutory ethics charter and ensures transparent, zero-donation merit-based admissions.'
    },
    {
      name: 'Prof. Dr. R. Narayan',
      qualification: 'M.Sc., Ph.D. (Theoretical Physics)',
      role: 'Co-Founder & Founding Principal',
      badge: 'Pedagogical Architect',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=500&q=80',
      quote: '"Bridging PU Board foundation with competitive speed is an art perfected through patient faculty mentorship."',
      desc: 'Distinguished physicist with 34 years of Pre-University leadership. Former member of the Karnataka PU Board Syllabus Advisory Committee and mentor to 40+ State Top 10 rankers.'
    }
  ];

  // Detailed Institutional History Milestones
  const historyMilestones = [
    {
      year: '2008',
      title: 'Inception with 120 Scholars',
      desc: 'Founded by Dr. Sri Vidya Sagar and Smt. Shakuntala Vidya Sagar in Bengaluru with an initial cohort of 120 Science students and a bold pledge of integrated coaching without expensive external tuitions.'
    },
    {
      year: '2012',
      title: 'State 3rd Rank & Commerce Wing',
      desc: 'Student Aditya Rao secured Karnataka State 3rd Rank in KCET Engineering. Introduced the Commerce stream with CEBA and SEBA combinations alongside CA Foundation preparation.'
    },
    {
      year: '2017',
      title: '8.5-Acre Modern Campus Expansion',
      desc: 'Inauguration of the expansive Outer Ring Road Bengaluru campus, featuring Sir C.V. Raman Physics and Marie Curie Chemistry labs, the central digital library, and student residential hostels.'
    },
    {
      year: '2021',
      title: 'Digital CBT Examination Leap',
      desc: 'Commissioned Karnataka\'s first dedicated on-campus 120-terminal Computer-Based Test (CBT) Mock Exam Center with instant AI performance analytics for KCET, NEET, and JEE.'
    },
    {
      year: '2026',
      title: 'Karnataka\'s Premier Benchmark',
      desc: 'Celebrating 18 continuous years of academic brilliance: 99.52% overall PU Board pass rate, 1,250+ students, 64 specialist faculty, and 140+ annual medical and engineering selections.'
    }
  ];

  // Lecture Schedules Data
  const lectureSchedules = {
    science: [
      { time: '08:30 AM - 09:30 AM', subject: 'Physics (2nd PU PCMB)', faculty: 'Dr. Anand Rao (HOD)', room: 'Lecture Hall 101', topic: 'Electrodynamics & Capacitors Numerical Mastery' },
      { time: '09:30 AM - 10:30 AM', subject: 'Chemistry (2nd PU PCMB)', faculty: 'Dr. Malini Iyer (HOD)', room: 'Lecture Hall 101', topic: 'Aldehydes, Ketones & Carboxylic Acids Mechanisms' },
      { time: '10:45 AM - 11:45 AM', subject: 'Mathematics (1st & 2nd PU)', faculty: 'Prof. S. Ranganath', room: 'Lecture Hall 102', topic: 'Differential Equations & Integration Shortcuts' },
      { time: '11:45 AM - 12:45 PM', subject: 'Biology / Biotechnology', faculty: 'Prof. K. Venkatesh', room: 'Biology Lab Hall', topic: 'Molecular Genetics & DNA Transcription Frameworks' },
      { time: '01:30 PM - 03:00 PM', subject: 'Physics & Chemistry Practicals', faculty: 'Laboratory Demonstrators', room: 'Block A Science Labs', topic: 'Spectrometer Calibration & Salt Analysis Practicals' },
    ],
    commerce: [
      { time: '08:30 AM - 09:30 AM', subject: 'Accountancy (2nd PU CEBA)', faculty: 'Prof. Rekha Hegde (HOD)', room: 'Commerce Block Hall 201', topic: 'Partnership Accounts - Dissolution & Goodwill Valuation' },
      { time: '09:30 AM - 10:30 AM', subject: 'Business Studies', faculty: 'Prof. H.S. Murthy', room: 'Commerce Block Hall 201', topic: 'Principles of Financial Management & Capital Markets' },
      { time: '10:45 AM - 11:45 AM', subject: 'Economics (Micro & Macro)', faculty: 'Dr. Savitha Sharma', room: 'Lecture Hall 202', topic: 'National Income Accounting & Keynesian Multiplier' },
      { time: '11:45 AM - 12:45 PM', subject: 'Computer Applications / Stats', faculty: 'Prof. Manoj Nair', room: 'Turing Lab B', topic: 'Relational Database Queries & Statistical Inference' },
      { time: '01:30 PM - 03:00 PM', subject: 'CA Foundation Mentorship Club', faculty: 'Visiting CAs', room: 'Seminar Hall 3', topic: 'Corporate Law & Mercantile Regulatory Framework' },
    ],
    entrance: [
      { time: '02:00 PM - 03:30 PM', subject: 'KCET Physics Sprint Workshop', faculty: 'Dr. Anand Rao', room: 'Radhakrishnan Hall', topic: '60 Questions in 80 Minutes - Time Optimization Drills' },
      { time: '03:30 PM - 05:00 PM', subject: 'NEET Biology High-Yield Masterclass', faculty: 'Prof. K. Venkatesh', room: 'Science Auditorium', topic: 'Human Physiology Diagrammatic Question Bank Drill' },
      { time: '03:30 PM - 05:00 PM', subject: 'JEE Main & Advanced Mathematics', faculty: 'Prof. S. Ranganath', room: 'Math Olympiad Cell', topic: 'Advanced Calculus, Coordinate Geometry & Vectors' },
      { time: '05:00 PM - 06:00 PM', subject: 'Daily Doubt Clarification Clinic', faculty: 'All Department HODs', room: 'Faculty Enclave', topic: 'One-on-One Problem Resolving & Mock Test Review' }
    ]
  };

  return (
    <div className="space-y-20 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white overflow-hidden py-16 lg:py-24 border-b-4 border-gold-500">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-800/80 border border-gold-500/40 text-gold-400 text-xs font-semibold tracking-wide shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>Admissions 2026–2027 Open • Karnataka PU Board Code: AS-0482</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black font-serif tracking-tight leading-tight text-white">
                Empowering Young Minds. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-amber-200">
                  Building Tomorrow's Leaders.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Sri Vidya International Pre-University College, Bengaluru, combines deep NCERT Karnataka PU Board curriculum with premier integrated <strong>KCET, NEET, and JEE</strong> coaching under distinguished faculty mentorship.
              </p>

              {/* Call to action buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  to="/admissions"
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-gold-400 via-gold-500 to-amber-500 hover:from-gold-500 hover:to-gold-600 text-navy-950 font-bold text-sm shadow-xl shadow-gold-500/20 hover:scale-[1.02] transition-all flex items-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  <span>Apply for Admission</span>
                </Link>

                <Link
                  to="/competitive-exams"
                  className="px-6 py-3.5 rounded-xl bg-navy-900/90 hover:bg-navy-800 text-white font-semibold text-sm border border-slate-600 hover:border-gold-500/50 transition flex items-center gap-2 shadow"
                >
                  <BookOpen className="w-4 h-4 text-gold-400" />
                  <span>Explore KCET / NEET / JEE</span>
                </Link>

                <Link
                  to="/results"
                  className="px-5 py-3.5 rounded-xl bg-transparent hover:bg-white/10 text-slate-300 hover:text-white font-semibold text-sm transition flex items-center gap-1.5"
                >
                  <span>View Board Results</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Badges */}
              <div className="pt-6 border-t border-navy-800/80 flex flex-wrap justify-center lg:justify-start gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Karnataka PU Board Affiliated</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>99.52% Historical Board Pass Rate</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Top 10 KCET & NEET State Ranks</span>
                </div>
              </div>
            </div>

            {/* Hero Right Visual Feature Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-gold-500 to-amber-600 opacity-30 blur-xl"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-gold-500/40 bg-navy-900">
                  <img
                    src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=900&q=80"
                    alt="Sri Vidya International PU College Campus"
                    className="w-full h-72 sm:h-80 object-cover"
                  />
                  <div className="p-5 bg-gradient-to-t from-navy-950 via-navy-900/90 to-transparent">
                    <div className="flex items-center justify-between text-xs text-gold-400 font-semibold mb-1">
                      <span>Bengaluru Campus • 8.5 Acres</span>
                      <span className="bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-700/50">Estd. 2008</span>
                    </div>
                    <h3 className="text-base font-bold text-white font-serif">
                      Sri Vidya International Pre-University College
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                      Modern physics, chemistry, biotech labs, 45,000-volume digital library, smart acoustic auditoriums, and resident hostels.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATS COUNTER BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 md:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          <div className="pt-2 lg:pt-0">
            <div className="text-3xl md:text-4xl font-black text-navy-950 font-serif">18+</div>
            <div className="text-xs font-bold text-gold-600 uppercase tracking-wider mt-1">Years of Excellence</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Estd. 2008 in Bengaluru</p>
          </div>
          <div className="pt-2 lg:pt-0">
            <div className="text-3xl md:text-4xl font-black text-navy-950 font-serif">99.52%</div>
            <div className="text-xs font-bold text-gold-600 uppercase tracking-wider mt-1">PU Board Pass Rate</div>
            <p className="text-[11px] text-slate-500 mt-0.5">82.4% with Distinctions</p>
          </div>
          <div className="pt-2 lg:pt-0">
            <div className="text-3xl md:text-4xl font-black text-navy-950 font-serif">140+</div>
            <div className="text-xs font-bold text-gold-600 uppercase tracking-wider mt-1">KCET / NEET Top Ranks</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Admissions into AIIMS & IITs</p>
          </div>
          <div className="pt-2 lg:pt-0">
            <div className="text-3xl md:text-4xl font-black text-navy-950 font-serif">64+</div>
            <div className="text-xs font-bold text-gold-600 uppercase tracking-wider mt-1">Experienced Faculty</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Ph.D. & M.Sc. Specialists</p>
          </div>
        </div>
      </section>

      {/* 3. CONTINUOUS PHOTO MARQUEE OF COLLEGE (FEATURED REQUIREMENT) */}
      <section className="bg-gradient-to-b from-slate-50 via-white to-slate-50 py-12 border-y border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 text-gold-900 border border-gold-300 text-xs font-bold uppercase tracking-wider mb-2">
                <ImageIcon className="w-3.5 h-3.5 text-gold-700" />
                <span>Campus Visual Tour</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 font-serif">
                Sri Vidya Campus Photo Gallery Marquee
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Hover to pause. Click any image to view in high resolution.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>10 Advanced Facilities • 8.5-Acre Smart Enclave</span>
            </div>
          </div>
        </div>

        {/* Continuous Horizontal Infinite Scrolling Marquee */}
        <div className="overflow-hidden relative py-2">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>

          <div className="animate-photo-marquee flex gap-5">
            {/* First Set of Images */}
            {galleryItems.map((item) => (
              <div
                key={`m1-${item.id}`}
                onClick={() => setSelectedImage(item)}
                className="w-72 sm:w-80 shrink-0 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-slate-200 cursor-pointer group transition-all duration-300"
              >
                <div className="relative h-48 sm:h-52 overflow-hidden bg-navy-900">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-navy-950/80 backdrop-blur-sm text-gold-400 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-gold-500/30">
                    {item.badge}
                  </div>
                  <div className="absolute top-3 right-3 p-1.5 bg-navy-950/70 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3.5">
                    <p className="text-[11px] text-slate-200 line-clamp-2">{item.desc}</p>
                  </div>
                </div>
                <div className="p-3.5 bg-white flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-navy-950 font-serif group-hover:text-gold-700 transition line-clamp-1">{item.title}</h4>
                    <span className="text-[10px] font-medium text-slate-500 uppercase">{item.category}</span>
                  </div>
                  <span className="text-xs text-gold-600 font-bold group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            ))}

            {/* Duplicate Set for Seamless Infinite Looping */}
            {galleryItems.map((item) => (
              <div
                key={`m2-${item.id}`}
                onClick={() => setSelectedImage(item)}
                className="w-72 sm:w-80 shrink-0 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-slate-200 cursor-pointer group transition-all duration-300"
              >
                <div className="relative h-48 sm:h-52 overflow-hidden bg-navy-900">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-navy-950/80 backdrop-blur-sm text-gold-400 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-gold-500/30">
                    {item.badge}
                  </div>
                  <div className="absolute top-3 right-3 p-1.5 bg-navy-950/70 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3.5">
                    <p className="text-[11px] text-slate-200 line-clamp-2">{item.desc}</p>
                  </div>
                </div>
                <div className="p-3.5 bg-white flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-navy-950 font-serif group-hover:text-gold-700 transition line-clamp-1">{item.title}</h4>
                    <span className="text-[10px] font-medium text-slate-500 uppercase">{item.category}</span>
                  </div>
                  <span className="text-xs text-gold-600 font-bold group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Lightbox for Fullscreen Image View */}
        {selectedImage && (
          <div 
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-navy-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95"
            >
              <div className="relative h-80 sm:h-96">
                <img
                  src={selectedImage.img}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 p-2 bg-navy-950/80 text-white hover:bg-navy-950 rounded-full transition shadow"
                  aria-label="Close image modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-gold-700 bg-gold-50 px-2.5 py-0.5 rounded border border-gold-200">
                    {selectedImage.category} • {selectedImage.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">Sri Vidya International Campus</span>
                </div>
                <h3 className="text-lg font-bold text-navy-950 font-serif">{selectedImage.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{selectedImage.desc}</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 4. FOUNDERS SECTION (MORE THAN ONE FOUNDER - FEATURED REQUIREMENT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-50 text-navy-900 border border-navy-200 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-gold-600" />
            <span>Guiding Vision & Trustees</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-950 font-serif">
            The Visionary Founders of Sri Vidya Institutions
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto">
            Established in 2008 by a council of eminent academicians, legal scholars, and philanthropists united by a singular mission: to provide world-class Pre-University and competitive examination training in Karnataka.
          </p>
        </div>

        {/* 4 Co-Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {founders.map((founder, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl shadow-premium hover:shadow-premium-hover border border-slate-200 overflow-hidden flex flex-col justify-between group transition-all duration-300"
            >
              <div>
                <div className="relative h-64 overflow-hidden bg-navy-900">
                  <img
                    src={founder.photo}
                    alt={founder.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-gold-500 text-navy-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded shadow">
                      {founder.badge}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-60"></div>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-navy-950 font-serif group-hover:text-gold-700 transition">
                      {founder.name}
                    </h3>
                    <p className="text-xs font-bold text-gold-700 mt-0.5">{founder.role}</p>
                    <p className="text-[11px] text-slate-500 font-medium">{founder.qualification}</p>
                  </div>

                  <blockquote className="text-[11px] italic text-slate-700 bg-slate-50 p-2.5 rounded-lg border-l-2 border-gold-500">
                    {founder.quote}
                  </blockquote>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {founder.desc}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-semibold">
                <span>Co-Founder (2008)</span>
                <span className="text-gold-600">Governing Trustee</span>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Institutional History & Chronology */}
        <div className="bg-navy-950 text-white rounded-3xl p-8 lg:p-12 shadow-2xl border border-gold-500/40 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-navy-800 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Chronicle of Academic Growth</span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-white mt-1">
                Institutional History: From 2008 to 2026
              </h3>
            </div>
            <Link
              to="/about"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-400 hover:text-gold-300 transition"
            >
              <span>Explore Complete Institutional Milestones</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {historyMilestones.map((milestone, idx) => (
              <div 
                key={idx} 
                className="p-4 rounded-xl bg-navy-900/80 border border-navy-800 space-y-2 hover:border-gold-500/50 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl font-black font-serif text-gold-400">{milestone.year}</span>
                  <span className="w-2 h-2 rounded-full bg-gold-400"></span>
                </div>
                <h4 className="text-xs font-bold text-white leading-snug">{milestone.title}</h4>
                <p className="text-[11px] text-slate-300 leading-relaxed">{milestone.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CONNECT INFORMATION & SOCIAL MEDIA HUB (FEATURED REQUIREMENT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Share2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Connect & Social Channels</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-950 font-serif">
            Stay Connected with Sri Vidya College
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Access free masterclasses on YouTube, student reels on Instagram, admissions help on WhatsApp, and career networking on LinkedIn.
          </p>
        </div>

        {/* 4 Official Social Media Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* YouTube Channel */}
          <div className="bg-white rounded-2xl shadow-premium border border-slate-200 p-6 space-y-4 hover:border-red-500 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Youtube className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                45K+ Subscribers
              </span>
              <h3 className="text-base font-bold text-navy-950 font-serif mt-2">Official YouTube Channel</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Free daily NCERT Physics, Chemistry, and Math masterclasses, KCET sprint problem-solving, and state topper interviews.
              </p>
            </div>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 transition"
            >
              <span>Watch Video Lectures</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Instagram */}
          <div className="bg-white rounded-2xl shadow-premium border border-slate-200 p-6 space-y-4 hover:border-pink-500 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Instagram className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded">
                @srividyapuc_official
              </span>
              <h3 className="text-base font-bold text-navy-950 font-serif mt-2">Instagram Campus Hub</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Daily campus life reels, science exhibition demonstrations, TARANG cultural fest moments, and athletic tournament trophies.
              </p>
            </div>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-600 hover:text-pink-700 transition"
            >
              <span>Follow Campus Updates</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* LinkedIn Network */}
          <div className="bg-white rounded-2xl shadow-premium border border-slate-200 p-6 space-y-4 hover:border-blue-600 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Linkedin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                8,200+ Alumni Network
              </span>
              <h3 className="text-base font-bold text-navy-950 font-serif mt-2">LinkedIn Professional Page</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Alumni accomplishments at AIIMS, IISc, Google, Microsoft, and global universities. Faculty research and corporate partnerships.
              </p>
            </div>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-800 transition"
            >
              <span>Join Alumni Network</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* WhatsApp Admissions Desk */}
          <div className="bg-white rounded-2xl shadow-premium border border-slate-200 p-6 space-y-4 hover:border-emerald-600 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Instant Chat 24/7
              </span>
              <h3 className="text-base font-bold text-navy-950 font-serif mt-2">WhatsApp Helpdesk</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Direct mobile assistance for 2026–2027 admissions prospectus, fee breakdown, scholarship eligibility, and campus visit scheduling.
              </p>
            </div>
            <a
              href="https://wa.me/919845011223"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition"
            >
              <span>Chat with Counselors</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Campus Contact & Visiting Information Banner */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-700">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-gold-100 text-gold-900 shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-navy-950 text-sm block font-serif">Admissions Hotline</strong>
              <p className="mt-0.5">+91 80 2845 7890 / 7891</p>
              <p className="text-slate-500 text-[11px]">Toll-Free Helpline: 1800 212 9988</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-blue-100 text-blue-900 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-navy-950 text-sm block font-serif">Campus Location</strong>
              <p className="mt-0.5">#42, Vidya Soudha, Outer Ring Road</p>
              <p className="text-slate-500 text-[11px]">Bengaluru - 560103, Karnataka, India</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-purple-100 text-purple-900 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-navy-950 text-sm block font-serif">Visiting & Counseling Hours</strong>
              <p className="mt-0.5">Monday to Saturday: 8:00 AM – 5:00 PM</p>
              <p className="text-slate-500 text-[11px]">Principal Consultation: 11:00 AM – 1:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. LECTURE DETAILS & TIMETABLE SCHEDULE */}
      <section className="bg-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-700">Daily Academic Routine</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-950 font-serif">
              Lecture Details & Masterclasses
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Structured daily curriculum combining theoretical NCERT board concepts with afternoon competitive speed workshops.
            </p>
          </div>

          {/* Lecture Tabs */}
          <div className="flex justify-center">
            <div className="bg-white p-1 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-2 justify-center">
              {[
                { id: 'science', label: 'Science Lectures (PCMB/PCMC)' },
                { id: 'commerce', label: 'Commerce Lectures (CEBA/SEBA)' },
                { id: 'entrance', label: 'KCET / NEET / JEE Masterclasses' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setLectureTab(t.id)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                    lectureTab === t.id
                      ? 'bg-navy-950 text-gold-400 shadow-md'
                      : 'text-slate-600 hover:text-navy-900'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Lecture Cards List */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
            {lectureSchedules[lectureTab].map((lec, idx) => (
              <div key={idx} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-navy-50 text-navy-900 shrink-0 text-center min-w-[130px]">
                    <Clock className="w-4 h-4 text-gold-600 mx-auto mb-1" />
                    <span className="text-xs font-bold block">{lec.time}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-gold-600 bg-gold-50 px-2 py-0.5 rounded">
                      {lec.room}
                    </span>
                    <h4 className="text-sm font-bold text-navy-950 font-serif">{lec.subject}</h4>
                    <p className="text-xs font-medium text-slate-700">Topic: <strong>{lec.topic}</strong></p>
                  </div>
                </div>

                <div className="text-left md:text-right shrink-0">
                  <span className="text-[11px] text-slate-500 block">Lead Lecturer:</span>
                  <span className="text-xs font-bold text-navy-950">{lec.faculty}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ACADEMIC STREAMS OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-50 text-navy-900 border border-navy-200 text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5 text-gold-600" />
            <span>Karnataka Pre-University Curriculum</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-950 font-serif">
            Academic Streams & Combinations
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Curated combinations meticulously designed to empower students for national entrance examinations and global undergraduate pathways.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Science Stream */}
          <div className="bg-white rounded-2xl shadow-premium hover:shadow-premium-hover border border-slate-200/90 overflow-hidden transition-all duration-300 flex flex-col justify-between group">
            <div className="p-7 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200 group-hover:scale-110 transition-transform">
                <Atom className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-navy-950 font-serif">Science Stream</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Comprehensive training in fundamental and experimental sciences with integrated KCET, NEET, and JEE coaching.
              </p>

              <div className="space-y-2 pt-2">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                  <strong className="text-navy-950 block">PCMB:</strong>
                  <span className="text-slate-600">Physics, Chemistry, Mathematics, Biology</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                  <strong className="text-navy-950 block">PCMC:</strong>
                  <span className="text-slate-600">Physics, Chemistry, Mathematics, Computer Science</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50/70 border-t border-slate-100">
              <Link to="/academics" className="text-xs font-bold text-navy-900 hover:text-gold-600 flex items-center justify-between">
                <span>View Syllabus & Lab Details</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Commerce Stream */}
          <div className="bg-white rounded-2xl shadow-premium hover:shadow-premium-hover border border-slate-200/90 overflow-hidden transition-all duration-300 flex flex-col justify-between group">
            <div className="p-7 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-navy-950 font-serif">Commerce Stream</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Financial modeling, accounting principles, and business economics integrated with CA Foundation coaching.
              </p>

              <div className="space-y-2 pt-2">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                  <strong className="text-navy-950 block">CEBA:</strong>
                  <span className="text-slate-600">Computer Science, Economics, Business Studies, Accountancy</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                  <strong className="text-navy-950 block">SEBA:</strong>
                  <span className="text-slate-600">Statistics, Economics, Business Studies, Accountancy</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50/70 border-t border-slate-100">
              <Link to="/academics" className="text-xs font-bold text-navy-900 hover:text-gold-600 flex items-center justify-between">
                <span>Explore Commerce Combinations</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Arts & Humanities Stream */}
          <div className="bg-white rounded-2xl shadow-premium hover:shadow-premium-hover border border-slate-200/90 overflow-hidden transition-all duration-300 flex flex-col justify-between group">
            <div className="p-7 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-200 group-hover:scale-110 transition-transform">
                <Landmark className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-navy-950 font-serif">Arts & Humanities</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Critical humanistic inquiry, governance, diplomacy, and sociology for civil services and legal aspirants.
              </p>

              <div className="space-y-2 pt-2">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                  <strong className="text-navy-950 block">HEPS:</strong>
                  <span className="text-slate-600">History, Economics, Political Science, Sociology</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                  <strong className="text-navy-950 block">Civil Services Wing:</strong>
                  <span className="text-slate-600">UPSC Foundation, Model United Nations & Moot Court</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50/70 border-t border-slate-100">
              <Link to="/academics" className="text-xs font-bold text-navy-900 hover:text-gold-600 flex items-center justify-between">
                <span>View Humanities & Languages</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 8. ADMISSION ENQUIRY FORM */}
      <section className="bg-gradient-to-br from-navy-950 to-navy-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Join Sri Vidya Family</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-serif">
              Online Admission Enquiry (2026–2027)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Submit your enquiry below to receive an instant Application Tracking Number and schedule an interactive campus counseling session.
            </p>
          </div>

          {enquirySuccess ? (
            <div className="bg-navy-900/90 border-2 border-gold-500 rounded-2xl p-8 text-center space-y-4 animate-in fade-in">
              <div className="w-16 h-16 bg-gold-500/20 text-gold-400 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-serif text-white">Application Successfully Registered!</h3>
              <p className="text-sm text-slate-300">
                Your unique application tracking number is:
              </p>
              <div className="inline-block px-5 py-2.5 bg-navy-950 border border-gold-400 rounded-xl font-mono text-xl font-black text-gold-400 tracking-wider">
                {enquirySuccess}
              </div>
              <p className="text-xs text-slate-400">
                Save this number to check your verification and approval progress under Admissions &gt; Track Application.
              </p>
              <button
                onClick={() => setEnquirySuccess(null)}
                className="mt-4 px-6 py-2 rounded-lg bg-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
              >
                Submit Another Enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleEnquirySubmit} className="bg-white text-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.student_name}
                    onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                    placeholder="e.g. Adarsh Hegde"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-navy-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Parent / Guardian Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.parent_name}
                    onChange={(e) => setFormData({ ...formData, parent_name: e.target.value })}
                    placeholder="e.g. Ramesh Hegde"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-navy-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="parent@example.com"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-navy-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98450 12345"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-navy-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Previous School / Board *</label>
                  <input
                    type="text"
                    required
                    value={formData.previous_school}
                    onChange={(e) => setFormData({ ...formData, previous_school: e.target.value })}
                    placeholder="e.g. NPS Bengaluru (ICSE / CBSE / State)"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-navy-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">10th Standard Score (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.previous_marks_pct}
                    onChange={(e) => setFormData({ ...formData, previous_marks_pct: e.target.value })}
                    placeholder="e.g. 92.5"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-navy-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Stream</label>
                  <select
                    value={formData.preferred_stream}
                    onChange={(e) => setFormData({ ...formData, preferred_stream: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-navy-900 bg-white"
                  >
                    <option value="Science">Science Stream</option>
                    <option value="Commerce">Commerce Stream</option>
                    <option value="Arts">Arts & Humanities Stream</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Combination</label>
                  <select
                    value={formData.preferred_combination}
                    onChange={(e) => setFormData({ ...formData, preferred_combination: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-navy-900 bg-white"
                  >
                    <option value="PCMB">PCMB (Physics, Chem, Math, Bio)</option>
                    <option value="PCMC">PCMC (Physics, Chem, Math, Comp Sci)</option>
                    <option value="CEBA">CEBA (Comp Sci, Econ, Bus, Accounts)</option>
                    <option value="SEBA">SEBA (Stats, Econ, Bus, Accounts)</option>
                    <option value="HEPS">HEPS (History, Econ, Pol Sci, Sociology)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Special Requirements / Message</label>
                <textarea
                  rows="2"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Need hostel accommodation, bus transport, or integrated NEET/JEE coaching details..."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-navy-900"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={enquiryLoading}
                  className="w-full py-3 bg-navy-950 hover:bg-navy-900 text-gold-400 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                >
                  {enquiryLoading ? 'Submitting Application...' : 'Submit Application & Generate Tracking ID'}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

    </div>
  );
}
