import React from 'react';
import { useFridge } from '../context/FridgeContext';
import { differenceInDays } from 'date-fns';
import ChillGuyMascot from '../components/ChillGuyMascot';

function MockNotification({ item }) {
  if (!item) return null;
  const days = differenceInDays(new Date(item.expiryDate), new Date());
  const text = days < 0
    ? `${item.name} already expired. throw it out.`
    : days === 0
    ? `${item.name} expires today. cook it now.`
    : `${item.name} expires in ${days} day${days !== 1 ? 's' : ''}. use it or lose it.`;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-3 flex items-start gap-3 shadow-sm mb-4">
      <div className="w-9 h-9 rounded-xl bg-chill-bg flex items-center justify-center text-lg shrink-0">
        🧊
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-0.5">
          <span className="text-xs font-extrabold text-chill-accent">ChillGuy</span>
          <span className="text-[10px] text-chill-accent/30 font-bold">just now</span>
        </div>
        <p className="text-xs font-bold text-chill-accent/60 leading-snug">{text}</p>
      </div>
    </div>
  );
}

export default function AlertsView() {
  const { expiringItems, expiredItems, removeItem } = useFridge();

  const topAlert = expiredItems[0] ?? expiringItems[0] ?? null;

  if (expiringItems.length === 0 && expiredItems.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 gap-3">
        <ChillGuyMascot state="vibing" size={110} />
        <p className="font-extrabold text-chill-accent text-center text-lg">all good. literally chill.</p>
        <p className="text-xs font-bold text-chill-accent/40 text-center">
          nothing's about to expire. take a breath.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-6 pb-6 no-scrollbar flex flex-col">
      {/* Mock push notification */}
      <MockNotification item={topAlert} />

      {/* Expired */}
      {expiredItems.length > 0 && (
        <div className="mb-4">
          <h2 className="text-chill-error font-extrabold text-xs uppercase tracking-widest mb-3 ml-1">
            already gone 💀
          </h2>
          <div className="flex flex-col gap-3">
            {expiredItems.map(item => {
              const days = Math.abs(differenceInDays(new Date(item.expiryDate), new Date()));
              return (
                <div key={item.id} className="bg-chill-error/10 border-2 border-chill-error/20 p-4 rounded-[1.5rem] flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-chill-accent line-through opacity-60">{item.name}</h3>
                    <p className="text-xs font-bold text-chill-error mt-0.5">expired {days} day{days !== 1 ? 's' : ''} ago. nasty.</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="bg-chill-error text-white text-xs font-extrabold px-4 py-2 rounded-xl active:scale-95 transition-transform"
                  >
                    toss it
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Expiring soon */}
      {expiringItems.length > 0 && (
        <div>
          <h2 className="text-chill-warning font-extrabold text-xs uppercase tracking-widest mb-3 ml-1">
            eat this rn ⚡
          </h2>
          <div className="flex flex-col gap-3">
            {expiringItems.map(item => {
              const days = differenceInDays(new Date(item.expiryDate), new Date());
              return (
                <div key={item.id} className="bg-chill-warning/10 border-2 border-chill-warning/20 p-4 rounded-[1.5rem] flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-chill-accent">{item.name}</h3>
                    <p className="text-xs font-bold text-chill-warning mt-0.5">
                      {days === 0 ? 'expires today' : `${days} day${days !== 1 ? 's' : ''} left`}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="bg-chill-warning text-white text-xs font-extrabold px-4 py-2 rounded-xl active:scale-95 transition-transform"
                  >
                    ate it
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
