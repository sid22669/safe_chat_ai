import { Shield, Ban, AlertTriangle, Flag, Megaphone, Activity, TrendingUp, ScanSearch } from 'lucide-react';
import type { Message, MessageCategory } from '../types';

interface HomePageProps {
  messages: Message[];
  userName: string;
  onCategoryClick: (category: MessageCategory) => void;
  onScanOpen: () => void;
}

export function HomePage({ messages, userName, onCategoryClick, onScanOpen }: HomePageProps) {
  const stats = {
    spam: messages.filter(m => m.category === 'Spam').length,
    harassment: messages.filter(m => m.category === 'Harassment').length,
    scam: messages.filter(m => m.category === 'Scam').length,
    promotional: messages.filter(m => m.category === 'Promotional').length,
    total: messages.length,
    blocked: messages.filter(m => m.action === 'Block').length,
  };

  const threatRate = stats.total > 0
    ? (((stats.spam + stats.harassment + stats.scam) / stats.total) * 100).toFixed(0)
    : '0';

  const categories = [
    { title: 'Spam Messages', count: stats.spam, icon: Ban, gradient: 'from-orange-400 to-orange-600', bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', category: 'Spam' as MessageCategory },
    { title: 'Harassment', count: stats.harassment, icon: AlertTriangle, gradient: 'from-red-400 to-red-600', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', category: 'Harassment' as MessageCategory },
    { title: 'Scam Attempts', count: stats.scam, icon: Flag, gradient: 'from-purple-400 to-purple-600', bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', category: 'Scam' as MessageCategory },
    { title: 'Promotions', count: stats.promotional, icon: Megaphone, gradient: 'from-yellow-400 to-yellow-600', bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', category: 'Promotional' as MessageCategory },
  ];

  return (
    <div className="min-h-full bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 md:px-8 pt-10 pb-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <p className="text-blue-100 text-sm">Welcome back,</p>
              <h1 className="text-white text-xl font-bold">{userName || 'User'}</h1>
            </div>
          </div>
          <button
            onClick={onScanOpen}
            className="hidden md:flex items-center gap-2 px-5 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white rounded-2xl font-semibold transition-all shadow-md hover:shadow-lg"
          >
            <ScanSearch className="w-5 h-5" />
            Scan Message
          </button>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-blue-100 text-xs mb-1">Total Scanned</p>
              <p className="text-white text-2xl font-bold">{stats.total}</p>
            </div>
            <div>
              <p className="text-blue-100 text-xs mb-1">Blocked</p>
              <p className="text-white text-2xl font-bold">{stats.blocked}</p>
            </div>
            <div>
              <p className="text-blue-100 text-xs mb-1">Threat Rate</p>
              <p className="text-white text-2xl font-bold">{threatRate}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-8 py-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-500 rounded-xl">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-green-900 font-semibold">System Active</h2>
              <p className="text-green-600 text-sm">Real-time protection enabled</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-green-200 rounded-full h-2 overflow-hidden">
              <div className="bg-green-500 h-full rounded-full w-full animate-pulse"></div>
            </div>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-slate-900 font-semibold mb-1">Detected Categories</h2>
          <p className="text-slate-600 text-sm">Tap a category to view messages</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.title}
              onClick={() => onCategoryClick(cat.category)}
              className={`w-full ${cat.bg} border ${cat.border} rounded-2xl p-4 shadow-sm hover:shadow-md transition-all active:scale-[0.98]`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 bg-gradient-to-br ${cat.gradient} rounded-xl shadow-md`}>
                  <cat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className={`${cat.text} font-semibold mb-0.5`}>{cat.title}</h3>
                  <p className="text-slate-600 text-sm">{cat.count} {cat.count === 1 ? 'message' : 'messages'} detected</p>
                </div>
                <div className={`px-4 py-2 ${cat.bg} ${cat.text} rounded-xl border ${cat.border}`}>
                  <span className="text-2xl font-bold">{cat.count}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-blue-900 font-semibold mb-1">AI Protection Active</p>
              <p className="text-blue-700 text-sm">Advanced NLP algorithms are monitoring your messages for harmful content and suspicious patterns.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden fixed bottom-24 left-0 right-0 z-40 pointer-events-none">
        <button
          onClick={onScanOpen}
          className="absolute bottom-0 right-6 w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center justify-center active:scale-95 pointer-events-auto"
        >
          <ScanSearch className="w-7 h-7 text-white" />
        </button>
      </div>
    </div>
  );
}
