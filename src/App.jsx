import { useState } from 'react'
import { FridgeProvider } from './context/FridgeContext'
import { ToastProvider } from './context/ToastContext'
import MobileFrame from './components/MobileFrame'
import Header from './components/Header'
import BottomNavigation from './components/BottomNavigation'
import SettingsPanel from './components/SettingsPanel'
import FridgeView from './views/FridgeView'
import AlertsView from './views/AlertsView'
import MealsView from './views/MealsView'
import NutritionView from './views/NutritionView'
import SplashView from './views/SplashView'

function AppContent() {
  const [currentTab, setCurrentTab] = useState('fridge')
  const [showSplash, setShowSplash] = useState(true)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const renderView = () => {
    switch (currentTab) {
      case 'fridge':    return <FridgeView />
      case 'alerts':    return <AlertsView />
      case 'meals':     return <MealsView />
      case 'nutrition': return <NutritionView />
      default:          return <FridgeView />
    }
  }

  return (
    <MobileFrame>
      {showSplash && <SplashView onDone={() => setShowSplash(false)} />}
      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <Header currentTab={currentTab} onMenuClick={() => setSettingsOpen(true)} />
      <ToastProvider>
        {renderView()}
      </ToastProvider>
      <BottomNavigation currentTab={currentTab} setCurrentTab={setCurrentTab} />
    </MobileFrame>
  )
}

export default function App() {
  return (
    <FridgeProvider>
      <AppContent />
    </FridgeProvider>
  )
}
