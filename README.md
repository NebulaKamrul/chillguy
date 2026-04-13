# chillguy: student smart fridge companion

> *he doesn't worry about expired food. you shouldn't either.*

A mobile-first web app built to help university students reduce food waste, save money, and actually use what's in their fridge. Track expiry dates, get alerts before food goes bad, find recipes based on what you already have, and monitor your waste score over time.

Live demo → **[chillguy-v1.vercel.app](https://chillguy-v1.vercel.app)**

---

## features

- **fridge tracker**: add items with expiry dates, colour-coded by freshness (fresh / expiring / expired)
- **expiry alerts**: prioritized list of what's about to go bad, with simulated push notifications
- **meal ideas**: 6 student-friendly recipes that cross-reference your actual fridge contents in real time
- **nutrition breakdown**: macro donut chart (protein / carbs / fat) + waste score gamification
- **savings tracker**: estimates money saved by tracking food each month
- **connected apps**: toggle integrations with MyFitnessPal, Apple Health, Google Fit, and Cronometer
- **settings panel**: hamburger menu with notification controls and fridge status
- **first-launch onboarding**: auto-loads realistic sample data so the app is never empty on first open
- **fully mobile responsive**: true fullscreen on phone, phone mockup on desktop

---

## tech stack

| layer | tool |
|---|---|
| framework | [React 19](https://react.dev) via [Vite 8](https://vitejs.dev) |
| styling | [Tailwind CSS 3](https://tailwindcss.com) with custom design tokens |
| icons | [Lucide React](https://lucide.dev) |
| date logic | [date-fns](https://date-fns.org) |
| state management | React Context API (no Redux) |
| persistence | localStorage (no backend required) |
| fonts | [Nunito](https://fonts.google.com/specimen/Nunito) via Google Fonts |
| deployment | [Vercel](https://vercel.com) |

---

## project structure

```
src/
├── components/
│   ├── MobileFrame.jsx       # phone shell (desktop) / fullscreen (mobile)
│   ├── Header.jsx            # top bar with mascot avatar + hamburger menu
│   ├── BottomNavigation.jsx  # 4-tab nav bar
│   ├── ChillGuyMascot.jsx    # SVG mascot with expression states
│   └── SettingsPanel.jsx     # slide-in settings drawer
│
├── context/
│   ├── FridgeContext.jsx     # global fridge state, expiry logic, savings calc
│   └── ToastContext.jsx      # toast notification system
│
├── views/
│   ├── SplashView.jsx        # animated landing / splash screen
│   ├── FridgeView.jsx        # main fridge tab
│   ├── AlertsView.jsx        # expiry alerts tab
│   ├── MealsView.jsx         # recipe suggestions tab
│   └── NutritionView.jsx     # macro chart + waste score tab
│
public/
├── chillguy.png              # favicon + header avatar
└── chillguylanding.png       # splash screen mascot
```

---

## design decisions

- **no backend** — all data lives in localStorage, keeping the prototype fully static and free to host
- **context api over redux** — two simple contexts (fridge state + toasts) cover all global state needs without the overhead
- **mobile-first** — `h-[100dvh]` + `overscroll-behavior: none` + `viewport-fit=cover` for a native app feel on iOS/Android
- **custom tailwind tokens** — `chill-bg`, `chill-surface`, `chill-accent`, `chill-warning`, `chill-error`, `chill-fresh` keep the colour system consistent across every component
- **date-fns over native Date** — `differenceInDays()` handles timezone-safe expiry calculations cleanly

---

## built for

BUSI 2200: Marketing Management
Ontario Tech University
ChillGuy Smart Mini-Fridge: Final Marketing Strategy Project
