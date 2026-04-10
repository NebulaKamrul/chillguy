import React, { useState } from 'react';
import { useFridge } from '../context/FridgeContext';
import { useToast } from '../context/ToastContext';
import { differenceInDays } from 'date-fns';
import { Plus, Trash2, Check, Sparkles, TrendingDown } from 'lucide-react';
import ChillGuyMascot from '../components/ChillGuyMascot';

export default function FridgeView() {
  const { items, addItem, removeItem, loadSampleData, clearAll, estimatedSavings, expiredItems } = useFridge();
  const showToast = useToast();
  const [newItemName, setNewItemName] = useState('');
  const [newItemExpiry, setNewItemExpiry] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newItemName || !newItemExpiry) return;
    addItem({ name: newItemName, expiryDate: newItemExpiry, addedDate: new Date().toISOString() });
    showToast(`added ${newItemName} ✓`);
    setNewItemName('');
    setNewItemExpiry('');
    setIsAdding(false);
  };

  const handleRemove = (item) => {
    removeItem(item.id);
    showToast(`tossed ${item.name} 🗑️`);
  };

  const getStatusColor = (expiryStr) => {
    if (!expiryStr) return 'bg-chill-fresh';
    const days = differenceInDays(new Date(expiryStr), new Date());
    if (days < 0) return 'bg-chill-error';
    if (days <= 3) return 'bg-chill-warning';
    return 'bg-chill-fresh';
  };

  const getStatusText = (expiryStr) => {
    if (!expiryStr) return '';
    const days = differenceInDays(new Date(expiryStr), new Date());
    if (days < 0) return `expired ${Math.abs(days)} day${Math.abs(days) !== 1 ? 's' : ''} ago bro`;
    if (days === 0) return 'expires today. cook it.';
    if (days <= 3) return `use it or lose it bestie (${days} days)`;
    return `good for ${days} days`;
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 pb-6 no-scrollbar flex flex-col gap-4">

      {/* Savings card — only show when there's data */}
      {items.length > 0 && (
        <div className="bg-chill-accent rounded-[1.5rem] p-4 flex items-center justify-between shadow-md">
          <div>
            <p className="text-xs font-extrabold text-white/60 uppercase tracking-wider">saved this month</p>
            <p className="text-3xl font-black text-white leading-none mt-0.5">${estimatedSavings}</p>
            <p className="text-[10px] font-bold text-white/40 mt-1">by tracking your fridge</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-3">
            <TrendingDown size={28} className="text-white" />
          </div>
        </div>
      )}

      {/* Add button / form */}
      {isAdding ? (
        <form onSubmit={handleAdd} className="bg-chill-surface p-4 rounded-[1.5rem] shadow-sm flex flex-col gap-3">
          <input
            type="text"
            placeholder="what'd you buy?"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="bg-white px-4 py-3 rounded-xl w-full text-chill-accent placeholder-chill-accent/40 font-bold focus:outline-none focus:ring-2 focus:ring-chill-accent/20"
            autoFocus
          />
          <div className="flex gap-2">
            <input
              type="date"
              value={newItemExpiry}
              onChange={(e) => setNewItemExpiry(e.target.value)}
              className="bg-white px-4 py-3 rounded-xl text-chill-accent font-bold focus:outline-none focus:ring-2 focus:ring-chill-accent/20 flex-1"
            />
            <button
              type="submit"
              className="bg-chill-accent text-white px-4 py-3 rounded-xl font-bold flex items-center justify-center min-w-[3rem] active:scale-95 transition-transform"
            >
              <Check size={20} />
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="bg-gray-200 text-chill-accent px-4 py-3 rounded-xl font-bold active:scale-95 transition-transform"
            >
              cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full bg-chill-surface text-chill-accent font-extrabold text-base p-4 rounded-[1.5rem] shadow-sm flex items-center justify-center gap-2 hover:bg-chill-surface/80 active:scale-[0.98] transition-all"
        >
          <Plus size={20} /> add something
        </button>
      )}

      {/* Item list */}
      <div className="flex flex-col gap-3">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-8 gap-4">
            <ChillGuyMascot state="empty" size={100} />
            <p className="font-bold text-chill-accent/50">nothing in here. classic.</p>
            <button
              onClick={() => { loadSampleData(); showToast('example data loaded ✓'); }}
              className="flex items-center gap-2 bg-chill-accent text-chill-surface text-sm font-extrabold px-5 py-3 rounded-2xl shadow-md active:scale-95 transition-transform"
            >
              <Sparkles size={15} /> see with example data
            </button>
          </div>
        ) : (
          <>
            {items.map(item => (
              <div key={item.id} className="bg-chill-surface p-4 rounded-[1.5rem] flex items-center shadow-sm">
                <div className={`w-2.5 h-2.5 rounded-full mr-4 shrink-0 ${getStatusColor(item.expiryDate)}`} />
                <div className="flex-1 min-w-0">
                  <h3 className="font-extrabold text-base text-chill-accent truncate">{item.name}</h3>
                  <p className="text-xs text-chill-accent/50 font-bold truncate">{getStatusText(item.expiryDate)}</p>
                </div>
                <button
                  onClick={() => handleRemove(item)}
                  className="ml-3 p-2 text-chill-accent/25 hover:text-chill-error active:scale-90 transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}

            {/* Clear all / reset */}
            <button
              onClick={() => { clearAll(); showToast('fridge cleared 🧹'); }}
              className="w-full text-chill-accent/30 text-xs font-bold py-2 hover:text-chill-accent/60 transition-colors"
            >
              clear all
            </button>
          </>
        )}
      </div>
    </div>
  );
}
