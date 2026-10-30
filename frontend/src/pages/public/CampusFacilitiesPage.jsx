import React, { useState, useEffect } from 'react';
import { 
  Building2, BookOpen, Atom, Trophy, Bus, Home, 
  MapPin, Clock, Users, Play, Compass, CheckCircle2 
} from 'lucide-react';
import { api } from '../../services/api';

export default function CampusFacilitiesPage() {
  const [facilities, setFacilities] = useState([]);
  const [category, setCategory] = useState('All');
  const [activeVirtualTourSpot, setActiveVirtualTourSpot] = useState('Central Campus Lawn');

  const categories = ['All', 'Academic', 'Laboratories', 'Sports', 'Hostel', 'Library', 'Amenities'];

  useEffect(() => {
    async function loadFacilities() {
      try {
        const data = await api.getFacilities(category === 'All' ? null : category);
        setFacilities(data);
      } catch (err) {
        console.error('Failed to load facilities:', err);
      }
    }
    loadFacilities();
  }, [category]);

  const virtualTourSpots = [
    { name: 'Central Campus Lawn', img: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1200&q=80', desc: 'Serene botanical campus central promenade designed for quiet contemplation between lectures.' },
    { name: 'Sir C.V. Raman Physics Lab', img: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=1200&q=80', desc: 'Equipped with digital cathode ray oscilloscopes, helium-neon laser test benches, and spectrometer rigs.' },
    { name: 'Digital & Central Library', img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80', desc: 'Spanning two floors with 45,000+ volumes, open access stacks, and high-speed research computer stations.' },
    { name: 'Indoor Sports Arena', img: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80', desc: 'Olympic synthetic floor badminton courts, table tennis enclave, and international athletic track.' }
  ];

  const currentSpot = virtualTourSpots.find(s => s.name === activeVirtualTourSpot) || virtualTourSpots[0];

  return (
    <div className="space-y-16 pb-16">
      
      {/* Header Banner */}
      <section className="bg-navy-950 text-white py-16 border-b-4 border-gold-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-900 border border-gold-500/40 text-gold-400 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5" />
            <span>State-of-the-Art Bengaluru Campus</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif">
            Campus Infrastructure & Facilities
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            An 8.5-acre modern educational sanctum crafted with world-standard laboratory rigs, smart classrooms, and secure residential hostels.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* 360° Virtual Campus Tour Simulation */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="p-6 bg-navy-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy-800">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400">Interactive 360° Experience</span>
              <h3 className="text-lg font-bold font-serif">Virtual Campus Walkthrough</h3>
            </div>
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
              {virtualTourSpots.map((spot) => (
                <button
                  key={spot.name}
                  onClick={() => setActiveVirtualTourSpot(spot.name)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                    activeVirtualTourSpot === spot.name
                      ? 'bg-gold-500 text-navy-950 font-bold'
                      : 'bg-navy-900 text-slate-300 hover:bg-navy-800'
                  }`}
                >
                  {spot.name}
                </button>
              ))}
            </div>
          </div>

          <div className="relative h-80 sm:h-96 w-full overflow-hidden group">
            <img
              src={currentSpot.img}
              alt={currentSpot.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent flex items-end p-6">
              <div className="text-white max-w-xl">
                <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">Spotlight Facility</span>
                <h4 className="text-xl font-bold font-serif">{currentSpot.name}</h4>
                <p className="text-xs text-slate-200 mt-1 leading-relaxed">{currentSpot.desc}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center">
          <div className="flex gap-1.5 overflow-x-auto p-1.5 bg-slate-100 rounded-2xl border border-slate-200 max-w-3xl no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  category === cat
                    ? 'bg-navy-950 text-white shadow-sm'
                    : 'text-slate-600 hover:text-navy-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((fac) => (
            <div
              key={fac.id}
              className="bg-white rounded-2xl shadow-premium hover:shadow-premium-hover border border-slate-200/90 overflow-hidden flex flex-col justify-between transition-all"
            >
              <div>
                <img
                  src={fac.image_url || "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=600&q=80"}
                  alt={fac.title}
                  className="w-full h-52 object-cover"
                />
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-navy-950 bg-slate-100 px-2.5 py-0.5 rounded">
                      {fac.category}
                    </span>
                    <span className="text-slate-500 font-medium">{fac.operating_hours}</span>
                  </div>

                  <h3 className="text-base font-bold text-navy-950 font-serif leading-tight">
                    {fac.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {fac.description}
                  </p>

                  {fac.equipment && (
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-700">
                      <strong className="text-navy-950 block mb-0.5">Key Equipment & Setup:</strong>
                      {fac.equipment}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>{fac.capacity || 'Ample Capacity'}</span>
                </span>
                <span className="flex items-center gap-1 font-medium text-slate-700">
                  <MapPin className="w-3.5 h-3.5 text-gold-600" />
                  <span>{fac.location || 'Main Campus'}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

