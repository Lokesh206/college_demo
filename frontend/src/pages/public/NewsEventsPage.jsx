import React, { useState, useEffect } from 'react';
import { Bell, Calendar, Pin, Award, Tag } from 'lucide-react';
import { api } from '../../services/api';

export default function NewsEventsPage() {
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    async function loadData() {
      try {
        const [nData, eData] = await Promise.all([api.getNews(), api.getEvents()]);
        setNews(nData);
        setEvents(eData);
      } catch (err) {
        console.error('Failed to load news & events:', err);
      }
    }
    loadData();
  }, []);

  const categories = ['All', 'Academic', 'Admissions', 'Examinations', 'Events'];

  const filteredNews = filter === 'All' ? news : news.filter(n => n.category === filter);

  return (
    <div className="space-y-16 pb-16">
      
      {/* Header Banner */}
      <section className="bg-navy-950 text-white py-16 border-b-4 border-gold-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-900 border border-gold-500/40 text-gold-400 text-xs font-semibold">
            <Bell className="w-3.5 h-3.5" />
            <span>Official Communications Hub</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif">
            News, Circulars & Event Calendar
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Stay updated with official Karnataka PU Board circulars, examination timetables, and college events.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Category Filters */}
        <div className="flex justify-center">
          <div className="flex gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                  filter === c
                    ? 'bg-navy-950 text-white'
                    : 'text-slate-600 hover:text-navy-900'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Circulars List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredNews.map((n) => (
            <div
              key={n.id}
              className={`p-6 rounded-2xl bg-white border shadow-sm transition flex flex-col justify-between space-y-3 ${
                n.is_pinned ? 'border-gold-400 bg-gold-50/20' : 'border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-navy-900 bg-slate-100 px-2.5 py-0.5 rounded">
                    {n.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                    {n.is_pinned && <span className="text-gold-600 font-bold flex items-center gap-0.5"><Pin className="w-3 h-3" /> Pinned</span>}
                    <span>•</span>
                    <span>{n.publish_date}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-navy-950 font-serif leading-tight">
                  {n.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  {n.content}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-semibold">
                Issued by Office of Academic Administration, Sri Vidya PUC
              </div>
            </div>
          ))}
        </div>

        {/* Events Gallery Showcase */}
        <div className="pt-8 border-t border-slate-200 space-y-6">
          <h2 className="text-2xl font-bold text-navy-950 font-serif">College Events Calendar</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((ev) => (
              <div key={ev.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
                <div>
                  <img src={ev.image_url} alt={ev.title} className="w-full h-44 object-cover" />
                  <div className="p-5 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-gold-600">{ev.event_date}</span>
                      <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px]">{ev.category}</span>
                    </div>
                    <h4 className="text-sm font-bold text-navy-950 font-serif">{ev.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{ev.description}</p>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500">
                  Venue: <strong>{ev.venue}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

