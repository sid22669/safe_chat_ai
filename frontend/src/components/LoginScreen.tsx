import { useState } from 'react';
import { Shield, User } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (name: string) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-cyan-50 max-w-md mx-auto">
      <div className="pt-16 pb-8 px-8">
        <div className="flex justify-center mb-6">
          <div className="p-5 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl shadow-xl">
            <Shield className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 text-center mb-2">SafeChat AI</h1>
        <p className="text-slate-600 text-center">Enter your name to start protecting your messages</p>
      </div>

      <div className="flex-1 px-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-slate-700 mb-2 text-sm font-medium">Your Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors text-slate-900"
                autoFocus
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
          >
            Start Protecting
          </button>
        </form>
      </div>

      <div className="p-8 text-center">
        <p className="text-slate-500 text-sm">AI-powered message protection system</p>
      </div>
    </div>
  );
}
