import { Shield, Bell, ShieldOff, Trash2, LogOut, Info } from 'lucide-react';

interface SettingsPageProps {
  userName: string;
  onLogout: () => void;
  onClearMessages: () => void;
}

export function SettingsPage({ userName, onLogout, onClearMessages }: SettingsPageProps) {
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="min-h-full bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white px-6 pt-10 pb-6 rounded-b-3xl shadow-lg">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-slate-300 text-sm mt-1">Manage your profile and app preferences</p>
      </div>

      <div className="px-6 md:px-8 py-6">
      <div className="md:max-w-2xl md:mx-auto space-y-6">
        {/* Profile Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white text-2xl font-bold">{userInitial}</span>
            </div>
            <div className="flex-1">
              <h2 className="text-slate-900 font-semibold text-lg">{userName}</h2>
              <p className="text-slate-500 text-sm">Demo Account</p>
            </div>
          </div>
        </div>

        {/* App Settings Section */}
        <div>
          <h3 className="text-slate-900 font-semibold mb-3 px-2">App Settings</h3>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-slate-100">
            {/* Real-time Protection */}
            <div className="px-6 py-4 flex items-center gap-4">
              <div className="p-2 bg-green-100 rounded-xl">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-slate-900 font-medium">Real-time Protection</h4>
                <p className="text-slate-500 text-sm">Continuously monitor messages</p>
              </div>
              <div className="w-12 h-12 flex items-center justify-center">
                <div className="w-5 h-5 bg-green-500 rounded-full shadow-sm"></div>
              </div>
            </div>

            {/* Push Notifications */}
            <div className="px-6 py-4 flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-xl">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-slate-900 font-medium">Push Notifications</h4>
                <p className="text-slate-500 text-sm">Get alerts for new threats</p>
              </div>
              <div className="w-12 h-12 flex items-center justify-center">
                <div className="w-5 h-5 bg-green-500 rounded-full shadow-sm"></div>
              </div>
            </div>

            {/* Auto-block Threats */}
            <div className="px-6 py-4 flex items-center gap-4">
              <div className="p-2 bg-slate-100 rounded-xl">
                <ShieldOff className="w-5 h-5 text-slate-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-slate-900 font-medium">Auto-block Threats</h4>
                <p className="text-slate-500 text-sm">Automatically block harmful messages</p>
              </div>
              <div className="w-12 h-12 flex items-center justify-center">
                <div className="w-5 h-5 bg-slate-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Management Section */}
        <div>
          <h3 className="text-slate-900 font-semibold mb-3 px-2">Data Management</h3>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-xl">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-slate-900 font-medium mb-1">Clear All Messages</h4>
                <p className="text-slate-500 text-sm mb-4">This will remove all scanned messages from your device. This action cannot be undone.</p>
                <button
                  onClick={onClearMessages}
                  className="w-full bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors shadow-sm active:scale-[0.98]"
                >
                  Clear All Messages
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div>
          <h3 className="text-slate-900 font-semibold mb-3 px-2">About</h3>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-slate-100">
            <div className="px-6 py-4 flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-xl">
                <Info className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-slate-900 font-medium">SafeChat AI</h4>
                <p className="text-slate-500 text-sm">Version 1.0.0</p>
              </div>
            </div>
            <div className="px-6 py-4">
              <p className="text-slate-600 text-sm">Powered by Machine Learning</p>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="pt-4">
          <button
            onClick={onLogout}
            className="w-full border-2 border-red-500 text-red-500 hover:bg-red-50 active:bg-red-100 font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}
