import React from 'react';
import { Home, Bell, Utensils, BarChart2 } from 'lucide-react';
import { useFridge } from '../context/FridgeContext';

export default function BottomNavigation({ currentTab, setCurrentTab }) {
  const { expiringItems, expiredItems } = useFridge();
  const alertCount = expiringItems.length + expiredItems.length;

  const tabs = [
    { id: 'fridge',    label: 'my fridge',  icon: Home },
    { id: 'alerts',    label: 'heads up',   icon: Bell,     badge: alertCount },
    { id: 'meals',     label: 'cook smth',  icon: Utensils },
    { id: 'nutrition', label: 'breakdown',  icon: BarChart2 },
  ];

  return (
    <div className="bg-chill-surface pb-6 pt-4 px-6 rounded-t-[2rem] shadow-[0_-4px_20px_rgba(0,0,0,0.05)] border-t border-chill-accent/5">
      <div className="flex justify-between items-center">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className="relative flex flex-col items-center p-2 transition-all"
            >
              <div className={`p-2 rounded-2xl transition-colors duration-200 ${isActive ? 'bg-chill-accent text-white' : 'text-chill-accent/50'}`}>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[9px] mt-1 font-extrabold tracking-tight ${isActive ? 'text-chill-accent' : 'text-chill-accent/40'}`}>
                {tab.label}
              </span>
              {tab.badge > 0 && (
                <div className="absolute top-0 right-0 w-5 h-5 bg-chill-error text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-chill-surface">
                  {tab.badge}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
