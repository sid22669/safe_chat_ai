import { Home, FileText, Bell, Settings, Shield } from 'lucide-react';
import type { Screen } from '../types';

interface NavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const tabs = [
  { screen: 'home' as Screen, icon: Home, label: 'Home' },
  { screen: 'reports' as Screen, icon: FileText, label: 'Reports' },
  { screen: 'notifications' as Screen, icon: Bell, label: 'Alerts' },
  { screen: 'settings' as Screen, icon: Settings, label: 'Settings' },
];

export function BottomNavigation({ currentScreen, onNavigate }: NavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-50">
      <div className="grid grid-cols-4 gap-1 px-2 py-2">
        {tabs.map((tab) => (
          <button
            key={tab.screen}
            onClick={() => onNavigate(tab.screen)}
            className={`flex flex-col items-center gap-1 py-2.5 px-3 rounded-xl transition-all ${
              currentScreen === tab.screen
                ? 'bg-blue-500 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span className="text-xs">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

export function DesktopSidebar({ currentScreen, onNavigate }: NavProps) {
  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      {/* Logo / title */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-slate-100">
        <div className="bg-blue-500 p-2 rounded-xl">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <span className="text-lg font-bold text-slate-800">SafeChat AI</span>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-1 p-3 flex-1">
        {tabs.map((tab) => (
          <button
            key={tab.screen}
            onClick={() => onNavigate(tab.screen)}
            className={`flex items-center gap-3 py-3 px-4 rounded-xl transition-all text-left ${
              currentScreen === tab.screen
                ? 'bg-blue-500 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <tab.icon className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
