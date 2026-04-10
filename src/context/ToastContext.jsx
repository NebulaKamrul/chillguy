import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(() => {});
export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message) => {
    setToast(null); // reset to re-trigger animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setToast(message));
    });
    setTimeout(() => setToast(null), 2200);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      <div className="relative flex-1 overflow-hidden flex flex-col">
        {children}
        {toast && (
          <div
            key={toast + Date.now()}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-50
                       bg-chill-accent text-chill-surface text-xs font-extrabold
                       px-4 py-2 rounded-full shadow-xl whitespace-nowrap
                       animate-slide-down pointer-events-none"
          >
            {toast}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
}
