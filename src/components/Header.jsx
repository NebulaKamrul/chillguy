import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { useFridge } from '../context/FridgeContext';
import ChillGuyMascot from './ChillGuyMascot';

// Drop chillguy.png into the /public folder — it'll auto-appear here
const MASCOT_SRC = '/chillguy.png';

const tabTitles = {
  fridge: 'my fridge',
  alerts: 'alerts',
  meals: 'meal ideas',
  nutrition: 'nutrition',
};

const quotes = [
  "it's just food man",
  "we move",
  "not my problem... wait it is",
  "eat the pasta. trust.",
  "totally fine",
  "no thoughts, head empty",
  "just vibing",
  "it is what it is",
  "unbothered. moisturized.",
  "could be worse tbh",
];

export default function Header({ currentTab, onMenuClick }) {
  const { mascotState } = useFridge();
  const [quote, setQuote] = useState('');
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleMascotTap = () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
    setTimeout(() => setQuote(''), 3000);
  };

  return (
    <header className="px-6 py-4 flex items-center justify-between z-10 sticky top-0 bg-chill-bg/90 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-xl hover:bg-chill-surface active:scale-90 transition-all"
        >
          <Menu size={22} className="text-chill-accent" />
        </button>
        <h1 className="text-3xl font-extrabold text-chill-accent tracking-tighter">
          {tabTitles[currentTab] ?? currentTab}
        </h1>
      </div>
      <div className="relative flex items-center">
        {quote && (
          <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 w-32 bg-chill-surface text-chill-accent text-xs p-2 rounded-2xl rounded-tr-sm shadow-md font-bold leading-tight">
            "{quote}"
          </div>
        )}
        <button
          onClick={handleMascotTap}
          className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center bg-chill-surface shadow-lg border-2 border-chill-accent/10 hover:scale-105 transition-transform active:scale-95"
        >
          {/* Real PNG — falls back to SVG if file isn't there yet */}
          <img
            src={MASCOT_SRC}
            alt="chill guy"
            className={`w-full h-full object-cover object-top scale-125 ${imgLoaded && !imgError ? 'block' : 'hidden'}`}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
          {(!imgLoaded || imgError) && (
            <ChillGuyMascot state={mascotState} size={56} headOnly />
          )}
        </button>
      </div>
    </header>
  );
}
