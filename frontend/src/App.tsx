import { useState } from 'react';
import type { Screen, MessageCategory } from './types';
import { useUser } from './hooks/useUser';
import { useMessages } from './hooks/useMessages';
import { OnboardingFlow } from './components/OnboardingFlow';
import { LoginScreen } from './components/LoginScreen';
import { HomePage } from './components/HomePage';
import { CategoryDetail } from './components/CategoryDetail';
import { ScanSheet } from './components/ScanSheet';
import ReportsPage from './components/ReportsPage';
import NotificationsPage from './components/NotificationsPage';
import { SettingsPage } from './components/SettingsPage';
import { BottomNavigation, DesktopSidebar } from './components/BottomNavigation';

function App() {
  const { user, login, logout, setUser } = useUser();
  const { messages, addMessage, setAction, clearMessages } = useMessages();
  const [screen, setScreen] = useState<Screen>('home');
  const [scanOpen, setScanOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<MessageCategory>('Normal');

  // Onboarding / login gates
  if (!user.onboarded) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-full max-w-md">
          <OnboardingFlow onComplete={() => setUser(prev => ({ ...prev, onboarded: true }))} />
        </div>
      </div>
    );
  }

  if (!user.name) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-full max-w-md">
          <LoginScreen onLogin={login} />
        </div>
      </div>
    );
  }

  const handleCategoryClick = (category: MessageCategory) => {
    setSelectedCategory(category);
    setScreen('category-detail');
  };

  const handleLogout = () => {
    clearMessages();
    logout();
  };

  const showNav = screen !== 'category-detail';

  const screenContent = (
    <>
      {screen === 'home' && (
        <HomePage
          messages={messages}
          userName={user.name}
          onCategoryClick={handleCategoryClick}
          onScanOpen={() => setScanOpen(true)}
        />
      )}
      {screen === 'reports' && (
        <ReportsPage messages={messages} />
      )}
      {screen === 'notifications' && (
        <NotificationsPage messages={messages} />
      )}
      {screen === 'settings' && (
        <SettingsPage
          userName={user.name}
          onLogout={handleLogout}
          onClearMessages={clearMessages}
        />
      )}
      {screen === 'category-detail' && (
        <CategoryDetail
          category={selectedCategory}
          messages={messages.filter(m => m.category === selectedCategory)}
          onBack={() => setScreen('home')}
          onAction={setAction}
        />
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Desktop sidebar - hidden on mobile */}
      {showNav && (
        <aside className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          <DesktopSidebar currentScreen={screen} onNavigate={setScreen} />
        </aside>
      )}

      {/* Main content */}
      <main className={showNav ? 'md:pl-64' : ''}>
        <div className="mx-auto max-w-4xl min-h-screen pb-20 md:pb-0">
          {screenContent}
        </div>
      </main>

      {/* ScanSheet uses fixed positioning, works on both */}
      <ScanSheet
        isOpen={scanOpen}
        onClose={() => setScanOpen(false)}
        onMessageScanned={addMessage}
        onAction={setAction}
      />

      {/* Mobile bottom nav - hidden on desktop */}
      {showNav && (
        <div className="md:hidden">
          <BottomNavigation currentScreen={screen} onNavigate={setScreen} />
        </div>
      )}
    </div>
  );
}

export default App;
