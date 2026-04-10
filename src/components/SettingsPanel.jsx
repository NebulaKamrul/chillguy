import React, { useState } from 'react';
import { X } from 'lucide-react';

function Toggle({ on, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`w-11 h-6 rounded-full transition-colors duration-200 relative shrink-0 ${on ? 'bg-chill-accent' : 'bg-chill-accent/20'}`}
    >
      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${on ? 'left-6' : 'left-1'}`} />
    </button>
  );
}

const APPS = [
  { id: 'mfp',   name: 'MyFitnessPal', icon: '🏋️', sub: 'sync macros automatically' },
  { id: 'apple', name: 'Apple Health',  icon: '❤️', sub: 'share nutrition data' },
  { id: 'gfit',  name: 'Google Fit',    icon: '🏃', sub: 'activity + nutrition sync' },
  { id: 'crono', name: 'Cronometer',    icon: '🥗', sub: 'detailed nutrient tracking' },
];

export default function SettingsPanel({ open, onClose }) {
  const [connected, setConnected] = useState({ mfp: false, apple: true, gfit: false, crono: false });
  const [notifs, setNotifs]       = useState({ expiry: true, weekly: true, tips: false });

  const toggleApp   = (key) => setConnected(prev => ({ ...prev, [key]: !prev[key] }));
  const toggleNotif = (key) => setNotifs(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div className="absolute inset-0 z-40 bg-black/30" onClick={onClose} />
      )}

      {/* Slide-in panel */}
      <div
        className={`absolute inset-y-0 right-0 z-50 w-[85%] bg-chill-bg flex flex-col shadow-2xl transition-transform duration-300 rounded-l-[2rem] ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-5 pt-10 pb-4 border-b border-chill-accent/10">
          <h2 className="text-xl font-black text-chill-accent">settings</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-chill-surface active:scale-90 transition-all"
          >
            <X size={20} className="text-chill-accent" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4 flex flex-col gap-6">

          {/* Fridge info card */}
          <div className="bg-chill-surface rounded-[1.5rem] p-4">
            <p className="text-[10px] font-extrabold text-chill-accent/40 uppercase tracking-widest mb-1">
              connected fridge
            </p>
            <p className="font-black text-chill-accent">my chillguy mini</p>
            <p className="text-xs font-bold text-chill-fresh mt-0.5">● online · 2°C</p>
          </div>

          {/* Connected apps */}
          <div>
            <p className="text-[10px] font-extrabold text-chill-accent/40 uppercase tracking-widest mb-3 ml-1">
              connected apps
            </p>
            <div className="flex flex-col gap-3">
              {APPS.map(app => (
                <div key={app.id} className="bg-chill-surface rounded-[1.5rem] p-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-2xl shrink-0">{app.icon}</span>
                    <div className="min-w-0">
                      <p className="font-extrabold text-sm text-chill-accent truncate">{app.name}</p>
                      <p className="text-[10px] font-bold text-chill-accent/40 truncate">{app.sub}</p>
                    </div>
                  </div>
                  <Toggle on={connected[app.id]} onToggle={() => toggleApp(app.id)} />
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div>
            <p className="text-[10px] font-extrabold text-chill-accent/40 uppercase tracking-widest mb-3 ml-1">
              notifications
            </p>
            <div className="bg-chill-surface rounded-[1.5rem] overflow-hidden divide-y divide-chill-accent/5">
              {[
                { key: 'expiry', label: 'expiry alerts',  sub: 'before food goes bad' },
                { key: 'weekly', label: 'weekly digest',  sub: 'your waste score recap' },
                { key: 'tips',   label: 'meal tips',      sub: 'ideas based on your fridge' },
              ].map(n => (
                <div key={n.key} className="flex items-center justify-between gap-3 p-4">
                  <div>
                    <p className="font-extrabold text-sm text-chill-accent">{n.label}</p>
                    <p className="text-[10px] font-bold text-chill-accent/40">{n.sub}</p>
                  </div>
                  <Toggle on={notifs[n.key]} onToggle={() => toggleNotif(n.key)} />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-5 pb-8 pt-2 text-center">
          <p className="text-[10px] font-bold text-chill-accent/20">chillguy v1.0.0 · made with ✌️</p>
        </div>
      </div>
    </>
  );
}
