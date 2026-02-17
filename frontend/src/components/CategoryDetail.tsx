import { ArrowLeft, Ban, AlertTriangle, Flag, Megaphone, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import type { Message, MessageCategory, MessageAction } from '../types';

interface CategoryDetailProps {
  category: MessageCategory;
  messages: Message[];
  onBack: () => void;
  onAction: (messageId: string, action: MessageAction) => void;
}

const categoryConfig: Record<string, { icon: typeof Shield; gradient: string; description: string }> = {
  Spam: { icon: Ban, gradient: 'from-orange-400 to-orange-600', description: 'Unwanted bulk messages' },
  Harassment: { icon: AlertTriangle, gradient: 'from-red-400 to-red-600', description: 'Threatening or abusive messages' },
  Scam: { icon: Flag, gradient: 'from-purple-400 to-purple-600', description: 'Fraudulent messages and phishing' },
  Promotional: { icon: Megaphone, gradient: 'from-yellow-400 to-yellow-600', description: 'Marketing and promotional content' },
  Normal: { icon: Shield, gradient: 'from-green-400 to-green-600', description: 'Safe messages' },
};

export function CategoryDetail({ category, messages, onBack, onAction }: CategoryDetailProps) {
  const config = categoryConfig[category] || categoryConfig.Normal;
  const Icon = config.icon;

  return (
    <div className="min-h-full bg-slate-50">
      <div className={`bg-gradient-to-br ${config.gradient} text-white px-6 pt-10 pb-6 rounded-b-3xl shadow-lg`}>
        <button onClick={onBack} className="mb-4 p-2 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl"><Icon className="w-7 h-7" /></div>
          <div>
            <h1 className="text-white text-xl font-bold">{category}</h1>
            <p className="text-white/80 text-sm">{messages.length} messages found</p>
          </div>
        </div>
        <p className="text-white/90 text-sm">{config.description}</p>
      </div>

      <div className="px-6 md:px-8 py-6 pb-24">
        {messages.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
            <Icon className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p className="text-slate-600 font-medium">No messages in this category</p>
          </div>
        ) : (
          <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
          {messages.map((message) => (
            <div key={message.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
              <div className="bg-slate-50 rounded-xl p-3 mb-3 border border-slate-200">
                <p className="text-slate-700 text-sm leading-relaxed">{message.content}</p>
              </div>
              <span className="text-slate-500 text-xs">{new Date(message.timestamp).toLocaleString()}</span>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 my-3 border border-blue-200">
                <p className="text-blue-900 text-xs font-medium mb-2">AI Confidence</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-blue-200 rounded-full h-2 overflow-hidden">
                    <div className={`h-full rounded-full ${message.confidence >= 0.9 ? 'bg-green-500' : message.confidence >= 0.7 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${message.confidence * 100}%` }} />
                  </div>
                  <span className="text-blue-900 font-bold text-sm">{(message.confidence * 100).toFixed(0)}%</span>
                </div>
                {message.flaggedPatterns.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {message.flaggedPatterns.map((p, i) => (
                      <span key={i} className="px-2 py-1 bg-red-100 text-red-700 rounded-lg text-xs border border-red-200">{p}</span>
                    ))}
                  </div>
                )}
              </div>
              {message.action ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
                  <p className="text-green-700 text-sm">Action: {message.action}</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => onAction(message.id, 'Allow')} className="flex items-center justify-center gap-2 px-3 py-2.5 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 border border-green-200 text-sm"><CheckCircle className="w-4 h-4" /> Allow</button>
                  <button onClick={() => onAction(message.id, 'Block')} className="flex items-center justify-center gap-2 px-3 py-2.5 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 border border-red-200 text-sm"><Ban className="w-4 h-4" /> Block</button>
                  <button onClick={() => onAction(message.id, 'Warn')} className="flex items-center justify-center gap-2 px-3 py-2.5 bg-yellow-100 text-yellow-700 rounded-xl hover:bg-yellow-200 border border-yellow-200 text-sm"><AlertCircle className="w-4 h-4" /> Warn</button>
                  <button onClick={() => onAction(message.id, 'Report')} className="flex items-center justify-center gap-2 px-3 py-2.5 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 border border-purple-200 text-sm"><Shield className="w-4 h-4" /> Report</button>
                </div>
              )}
            </div>
          ))}
          </div>
        )}
      </div>
    </div>
  );
}
