import React from 'react';

export default function ChillGuyMascot({ state = 'vibing', size = 56, headOnly = false, className = '' }) {
  const viewBox = headOnly ? '18 5 164 148' : '0 0 200 290';

  const eyes = (() => {
    switch (state) {
      case 'empty':
        return (
          <>
            {/* X eyes — cooked */}
            <line x1="70" y1="72" x2="84" y2="84" stroke="#1c0e07" strokeWidth="3.5" strokeLinecap="round"/>
            <line x1="84" y1="72" x2="70" y2="84" stroke="#1c0e07" strokeWidth="3.5" strokeLinecap="round"/>
            <line x1="116" y1="72" x2="130" y2="84" stroke="#1c0e07" strokeWidth="3.5" strokeLinecap="round"/>
            <line x1="130" y1="72" x2="116" y2="84" stroke="#1c0e07" strokeWidth="3.5" strokeLinecap="round"/>
          </>
        );
      case 'expired':
      case 'worried':
        return (
          <>
            {/* Worried brows inward */}
            <path d="M67 67 Q77 62 87 67" stroke="#1c0e07" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <path d="M113 67 Q123 62 133 67" stroke="#1c0e07" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            {/* Sad downward eyes */}
            <ellipse cx="77" cy="78" rx="9" ry="5" fill="#1c0e07"/>
            <ellipse cx="123" cy="78" rx="9" ry="5" fill="#1c0e07"/>
          </>
        );
      case 'concerned':
        return (
          <>
            {/* Slight brow raise */}
            <path d="M69 69 Q77 65 85 69" stroke="#1c0e07" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M115 69 Q123 65 131 69" stroke="#1c0e07" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <ellipse cx="77" cy="78" rx="9" ry="4.5" fill="#1c0e07"/>
            <ellipse cx="123" cy="78" rx="9" ry="4.5" fill="#1c0e07"/>
          </>
        );
      default:
        // vibing — calm flat eyes, very chill
        return (
          <>
            <ellipse cx="77" cy="77" rx="9" ry="4.5" fill="#1c0e07"/>
            <ellipse cx="123" cy="77" rx="9" ry="4.5" fill="#1c0e07"/>
          </>
        );
    }
  })();

  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* === HEAD === */}
      {/* Ears (drawn before head so head overlaps base) */}
      <ellipse cx="50" cy="38" rx="18" ry="25" fill="#c28a5f"/>
      <ellipse cx="150" cy="38" rx="18" ry="25" fill="#c28a5f"/>

      {/* Head */}
      <ellipse cx="100" cy="82" rx="58" ry="56" fill="#c28a5f"/>

      {/* Snout — the big dark area */}
      <ellipse cx="100" cy="107" rx="38" ry="30" fill="#1c0e07"/>

      {/* Eyes */}
      {eyes}

      {/* Rosy cheeks */}
      <ellipse cx="62" cy="98" rx="12" ry="8" fill="#e87878" opacity="0.28"/>
      <ellipse cx="138" cy="98" rx="12" ry="8" fill="#e87878" opacity="0.28"/>

      {/* === BODY === */}
      {/* Sweater arms (drawn before body so body covers inner edges) */}
      <rect x="18" y="148" width="34" height="70" rx="17" fill="#9498aa"/>
      <rect x="148" y="148" width="34" height="70" rx="17" fill="#9498aa"/>

      {/* Sweater body */}
      <rect x="40" y="140" width="120" height="94" rx="26" fill="#9498aa"/>

      {/* Neck */}
      <rect x="78" y="128" width="44" height="22" rx="11" fill="#c28a5f"/>

      {/* === JEANS === */}
      <rect x="48" y="226" width="40" height="48" rx="10" fill="#7fb8d4"/>
      <rect x="112" y="226" width="40" height="48" rx="10" fill="#7fb8d4"/>

      {/* Rolled cuffs (lighter) */}
      <rect x="48" y="260" width="40" height="14" rx="7" fill="#a8cfe4"/>
      <rect x="112" y="260" width="40" height="14" rx="7" fill="#a8cfe4"/>

      {/* === SHOES === */}
      <ellipse cx="68" cy="278" rx="28" ry="12" fill="#b84840"/>
      <ellipse cx="132" cy="278" rx="28" ry="12" fill="#b84840"/>

      {/* Shoe highlight */}
      <ellipse cx="60" cy="273" rx="11" ry="5" fill="#d86860" opacity="0.4"/>
      <ellipse cx="124" cy="273" rx="11" ry="5" fill="#d86860" opacity="0.4"/>
    </svg>
  );
}
