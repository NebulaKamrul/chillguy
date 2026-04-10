import React from 'react';
import { useFridge } from '../context/FridgeContext';
import ChillGuyMascot from '../components/ChillGuyMascot';

function DonutChart({ protein, carbs, fat, cals }) {
  const total = protein + carbs + fat || 1;
  const p = (protein / total) * 100;
  const c = (carbs / total) * 100;
  const f = (fat / total) * 100;

  return (
    <div className="flex items-center justify-center gap-6">
      {/* Chart */}
      <div className="relative w-36 h-36 shrink-0">
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `conic-gradient(
              #4ade80 0% ${p}%,
              #60a5fa ${p}% ${p + c}%,
              #fbbf24 ${p + c}% 100%
            )`,
          }}
        />
        <div className="absolute inset-7 rounded-full bg-chill-surface flex flex-col items-center justify-center">
          <span className="text-xl font-black text-chill-accent leading-none">{cals}</span>
          <span className="text-[9px] font-bold text-chill-accent/40 uppercase tracking-wider">kcal</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#4ade80] shrink-0" />
          <span className="text-xs font-bold text-chill-accent/70">Protein</span>
          <span className="text-xs font-black text-chill-accent ml-auto pl-4">{protein}g</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#60a5fa] shrink-0" />
          <span className="text-xs font-bold text-chill-accent/70">Carbs</span>
          <span className="text-xs font-black text-chill-accent ml-auto pl-4">{carbs}g</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#fbbf24] shrink-0" />
          <span className="text-xs font-bold text-chill-accent/70">Fat</span>
          <span className="text-xs font-black text-chill-accent ml-auto pl-4">{fat}g</span>
        </div>
      </div>
    </div>
  );
}

function StatPill({ label, value, sub, color = 'bg-white' }) {
  return (
    <div className={`${color} p-4 rounded-[1.5rem] shadow-sm flex flex-col gap-1`}>
      <span className="text-[10px] font-extrabold text-chill-accent/50 uppercase tracking-wider">{label}</span>
      <span className="font-black text-2xl text-chill-accent leading-none">{value}</span>
      {sub && <span className="text-[10px] font-bold text-chill-accent/40">{sub}</span>}
    </div>
  );
}

export default function NutritionView() {
  const { items, freshItems, expiredItems, estimatedSavings } = useFridge();

  if (items.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 gap-4 text-chill-accent/50">
        <ChillGuyMascot state="empty" size={100} />
        <p className="font-bold text-center">no food. zero macros. technically flawless.</p>
      </div>
    );
  }

  const cals    = items.length * 105;
  const protein = items.length * 12;
  const carbs   = items.length * 8;
  const fat     = items.length * 3;

  const wasteScore = items.length === 0 ? 100
    : Math.max(0, Math.round(((items.length - expiredItems.length) / items.length) * 100));

  const wasteLabel =
    wasteScore >= 90 ? 'elite. basically zero waste.' :
    wasteScore >= 70 ? 'pretty solid. keep it up.' :
    wasteScore >= 50 ? 'mid. try harder bestie.' :
    'uh oh. clean out your fridge.';

  return (
    <div className="flex-1 overflow-y-auto px-6 pb-6 no-scrollbar flex flex-col gap-4">

      {/* Macro donut card */}
      <div className="bg-chill-surface p-5 rounded-[2rem] shadow-sm">
        <p className="text-[10px] font-extrabold text-chill-accent/50 uppercase tracking-widest mb-4">
          estimated macros
        </p>
        <DonutChart protein={protein} carbs={carbs} fat={fat} cals={cals} />
        <p className="text-[10px] text-chill-accent/30 font-bold text-center mt-4">
          rough estimate based on what's tracked
        </p>
      </div>

      {/* Waste score */}
      <div className="bg-chill-surface p-5 rounded-[2rem] shadow-sm">
        <p className="text-[10px] font-extrabold text-chill-accent/50 uppercase tracking-widest mb-3">
          waste score
        </p>
        <div className="flex items-end gap-3 mb-2">
          <span className="text-5xl font-black text-chill-accent">{wasteScore}<span className="text-2xl opacity-50">%</span></span>
        </div>
        {/* Bar */}
        <div className="w-full h-3 bg-chill-accent/10 rounded-full overflow-hidden mb-2">
          <div
            className="h-full rounded-full bg-chill-fresh transition-all duration-700"
            style={{ width: `${wasteScore}%` }}
          />
        </div>
        <p className="text-xs font-bold text-chill-accent/50">{wasteLabel}</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatPill label="items tracked" value={items.length} sub="in your fridge" />
        <StatPill label="saved this month" value={`$${estimatedSavings}`} sub="by tracking" />
        <StatPill label="still fresh" value={freshItems.length} sub="items" />
        <StatPill label="expired" value={expiredItems.length} sub={expiredItems.length === 0 ? 'nothing! 🎉' : 'toss those'} />
      </div>
    </div>
  );
}
