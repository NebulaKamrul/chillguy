import React, { useEffect, useState } from 'react';
import ChillGuyMascot from '../components/ChillGuyMascot';

export default function SplashView({ onDone }) {
  const [fading, setFading] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1800);
    const doneTimer = setTimeout(onDone, 2300);
    return () => { clearTimeout(fadeTimer); clearTimeout(doneTimer); };
  }, [onDone]);

  return (
    <div
      onClick={() => { setFading(true); setTimeout(onDone, 400); }}
      className={`absolute inset-0 z-50 bg-chill-bg flex flex-col items-center justify-center gap-6 rounded-[2rem] cursor-pointer transition-opacity duration-500 ${fading ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Mascot — real PNG, SVG fallback */}
      <div className="animate-float w-44 h-44 relative">
        <img
          src="/chillguylanding.png"
          alt="chill guy"
          className={`w-full h-full object-contain drop-shadow-xl ${imgLoaded && !imgError ? 'block' : 'hidden'}`}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
        />
        {(!imgLoaded || imgError) && (
          <ChillGuyMascot state="vibing" size={180} />
        )}
      </div>

      {/* Wordmark */}
      <div className="text-center flex flex-col items-center gap-2">
        <h1 className="text-5xl font-black text-chill-accent tracking-tighter leading-none">
          chillguy.
        </h1>
        <p className="text-chill-accent/60 font-bold text-sm">
          your fridge. without the stress.
        </p>
      </div>

      {/* Loading dots */}
      <div className="flex gap-2 mt-2">
        <div className="w-2 h-2 rounded-full bg-chill-accent/40 animate-pulse" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 rounded-full bg-chill-accent/40 animate-pulse" style={{ animationDelay: '200ms' }} />
        <div className="w-2 h-2 rounded-full bg-chill-accent/40 animate-pulse" style={{ animationDelay: '400ms' }} />
      </div>

      <p className="absolute bottom-8 text-[10px] text-chill-accent/30 font-bold tracking-widest uppercase">
        tap to skip
      </p>
    </div>
  );
}
