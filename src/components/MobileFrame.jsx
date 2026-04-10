import React from 'react';

export default function MobileFrame({ children }) {
  return (
    // Mobile: true fullscreen. Desktop: centered phone mockup.
    <div className="h-[100dvh] w-full md:flex md:items-center md:justify-center md:p-6">

      {/* Phone shell — border + rounded corners only on desktop */}
      <div className="
        relative h-full w-full bg-chill-bg flex flex-col overflow-hidden
        md:h-[850px] md:w-[400px] md:rounded-[3rem] md:border-[14px] md:border-gray-900 md:shadow-2xl
      ">
        {/* Notch — desktop only */}
        <div className="hidden md:flex absolute top-0 inset-x-0 h-6 justify-center z-50">
          <div className="w-32 h-6 bg-gray-900 rounded-b-2xl" />
        </div>

        {/* App content */}
        <div className="flex-1 overflow-hidden bg-chill-bg flex flex-col pt-12 md:pt-6 md:rounded-[2rem]">
          {/* Connected status strip */}
          <div className="flex items-center justify-center gap-1.5 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-chill-fresh animate-pulse" />
            <span className="text-[10px] font-extrabold text-chill-accent/50 tracking-widest uppercase">
              ChillGuy Mini&nbsp;·&nbsp;Connected
            </span>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
