import { Shield, Ban, AlertTriangle, Flag, Megaphone, CheckCircle, AlertCircle } from 'lucide-react';
import type { MessageCategory, MessageAction } from '../types';
import { useState } from 'react';

interface ScanResultProps {
  category: MessageCategory;
  confidence: number;
  flaggedPatterns: string[];
  messageId: string;
  onAction: (messageId: string, action: MessageAction) => void;
}

const categoryConfig: Record<MessageCategory, { icon: typeof Shield; gradient: string; bg: string; text: string; border: string; label: string }> = {
  Normal: { icon: CheckCircle, gradient: 'from-green-400 to-emerald-600', bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', label: 'Safe Message' },
  Spam: { icon: Ban, gradient: 'from-orange-400 to-orange-600', bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', label: 'Spam Detected' },
  Harassment: { icon: AlertTriangle, gradient: 'from-red-400 to-red-600', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', label: 'Harassment Detected' },
  Scam: { icon: Flag, gradient: 'from-purple-400 to-purple-600', bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', label: 'Scam Detected' },
  Promotional: { icon: Megaphone, gradient: 'from-yellow-400 to-yellow-600', bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', label: 'Promotional Content' },
};

export function ScanResult({ category, confidence, flaggedPatterns, messageId, onAction }: ScanResultProps) {
  const [actionTaken, setActionTaken] = useState<MessageAction | null>(null);
  const config = categoryConfig[category];
  const Icon = config.icon;

  const handleAction = (action: MessageAction) => {
    onAction(messageId, action);
    setActionTaken(action);
  };

  const confidenceColor = confidence >= 0.9 ? 'bg-green-500' : confidence >= 0.7 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className={`${config.bg} border-2 ${config.border} rounded-2xl p-5 space-y-4`}>
      <div className="flex items-center gap-3">
        <div className={`p-3 bg-gradient-to-br ${config.gradient} rounded-xl shadow-md`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className={`${config.text} font-bold text-lg`}>{config.label}</h3>
          <p className="text-slate-600 text-sm">Category: {category}</p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <p className="text-slate-700 text-sm font-medium">AI Confidence</p>
          <span className={`${config.text} font-bold`}>{(confidence * 100).toFixed(0)}%</span>
        </div>
        <div className="bg-slate-200 rounded-full h-3 overflow-hidden">
          <div className={`h-full rounded-full ${confidenceColor} transition-all`} style={{ width: `${confidence * 100}%` }} />
        </div>
      </div>

      {flaggedPatterns.length > 0 && (
        <div>
          <p className="text-slate-700 text-sm font-medium mb-2">Detected Patterns</p>
          <div className="flex flex-wrap gap-1.5">
            {flaggedPatterns.map((pattern, idx) => (
              <span key={idx} className="px-2.5 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-medium border border-red-200">
                {pattern}
              </span>
            ))}
          </div>
        </div>
      )}

      {actionTaken ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
          <CheckCircle className="w-5 h-5 text-green-600 mx-auto mb-1" />
          <p className="text-green-700 text-sm font-medium">Action taken: {actionTaken}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => handleAction('Allow')} className="flex items-center justify-center gap-2 px-3 py-2.5 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-colors border border-green-200 font-medium text-sm">
            <CheckCircle className="w-4 h-4" /> Allow
          </button>
          <button onClick={() => handleAction('Block')} className="flex items-center justify-center gap-2 px-3 py-2.5 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors border border-red-200 font-medium text-sm">
            <Ban className="w-4 h-4" /> Block
          </button>
          <button onClick={() => handleAction('Warn')} className="flex items-center justify-center gap-2 px-3 py-2.5 bg-yellow-100 text-yellow-700 rounded-xl hover:bg-yellow-200 transition-colors border border-yellow-200 font-medium text-sm">
            <AlertCircle className="w-4 h-4" /> Warn
          </button>
          <button onClick={() => handleAction('Report')} className="flex items-center justify-center gap-2 px-3 py-2.5 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 transition-colors border border-purple-200 font-medium text-sm">
            <Shield className="w-4 h-4" /> Report
          </button>
        </div>
      )}
    </div>
  );
}
