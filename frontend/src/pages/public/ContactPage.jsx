import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Building2 } from 'lucide-react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* Header Banner */}
      <section className="bg-navy-950 text-white py-16 border-b-4 border-gold-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-900 border border-gold-500/40 text-gold-400 text-xs font-semibold">
            <MapPin className="w-3.5 h-3.5" />
            <span>Connect with Campus</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif">
            Contact Sri Vidya PU College
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            We welcome parents, prospective students, and visiting scholars to our sprawling Bengaluru campus.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-gold-50 text-gold-600 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-navy-950 text-sm font-serif">Campus Address</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              #42, Vidya Soudha Campus, Outer Ring Road, Marathahalli-Sarjapur Jnc, Bengaluru - 560103.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-navy-950 text-sm font-serif">Telephone Helpline</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              +91 80 2845 7890 / 7891<br />
              Toll Free: 1800 212 9988
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-navy-950 text-sm font-serif">Email Correspondence</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              contact@srividyapuc.edu.in<br />
              admissions@srividyapuc.edu.in
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-navy-950 text-sm font-serif">Office Visiting Hours</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mon – Sat: 8:00 AM – 5:00 PM<br />
              Sunday: Prior Appointment Only
            </p>
          </div>
        </div>

        {/* Form & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Inquiry Form */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-200 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-navy-950 font-serif">Send Us a Direct Message</h3>
              <p className="text-xs text-slate-500">For admissions, syllabus inquiries, or campus tour appointments.</p>
            </div>

            {sent && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Thank you! Your message has been routed to the respective college administrative section.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your Name *"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-navy-900"
                />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Email Address *"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-navy-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="Phone Number"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-navy-900"
                />
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-navy-900 bg-white"
                >
                  <option value="">Select Topic / Department</option>
                  <option value="Admissions">Admissions 2026-2027</option>
                  <option value="Competitive">KCET / NEET / JEE Coaching</option>
                  <option value="Hostel">Hostel & Transportation</option>
                  <option value="Fees">Fee Structure & Scholarships</option>
                </select>
              </div>

              <textarea
                rows="4"
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Write your inquiry here..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-navy-900"
              />

              <button
                type="submit"
                className="w-full py-2.5 bg-navy-950 hover:bg-navy-900 text-gold-400 font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Message to Admissions Office</span>
              </button>
            </form>
          </div>

          {/* Google Maps Embed */}
          <div className="lg:col-span-6 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col justify-between">
            <div className="p-4 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-700 flex items-center justify-between">
              <span>Campus Geolocation</span>
              <span className="text-gold-700">Bengaluru, Karnataka 560103</span>
            </div>
            <div className="h-80 w-full">
              <iframe
                title="Sri Vidya PU College Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.6656784381864!2d77.6989456!3d12.9292857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13a44c9b1397%3A0xb3a8260a9f5d1e67!2sOuter%20Ring%20Rd%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="p-4 text-[11px] text-slate-500 bg-white border-t border-slate-100 flex items-center justify-between">
              <span>Nearest Metro: Kadubeesanahalli (Under Construction)</span>
              <span>Bus Stop: Marathahalli Ring Road (200m)</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

