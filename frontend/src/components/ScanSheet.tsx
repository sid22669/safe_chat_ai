import { useState } from 'react';
import { X, ScanSearch, Loader2 } from 'lucide-react';
import { classifyMessage } from '../lib/api';
import { ScanResult } from './ScanResult';
import type { Message, MessageCategory, MessageAction, ThreatLevel } from '../types';

interface ScanSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onMessageScanned: (msg: Omit<Message, 'id' | 'timestamp' | 'action'>) => Message;
  onAction: (messageId: string, action: MessageAction) => void;
}

export function ScanSheet({ isOpen, onClose, onMessageScanned, onAction }: ScanSheetProps) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<{
    category: MessageCategory;
    confidence: number;
    flaggedPatterns: string[];
    threatLevel: ThreatLevel;
    messageId: string;
  } | null>(null);

  const handleScan = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await classifyMessage(text.trim());
      const msg = onMessageScanned({
        content: text.trim(),
        category: response.category,
        confidence: response.confidence,
        flaggedPatterns: response.flagged_patterns,
        threatLevel: response.threat_level,
      });
      setResult({
        category: response.category,
        confidence: response.confidence,
        flaggedPatterns: response.flagged_patterns,
        threatLevel: response.threat_level,
        messageId: msg.id,
      });
    } catch {
      setError('Failed to classify message. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setText('');
    setResult(null);
    setError('');
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:flex md:items-center md:justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0" onClick={handleClose} />
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto md:relative md:w-full md:max-w-2xl md:rounded-3xl md:max-h-[90vh] md:shadow-2xl">
        <div className="sticky top-0 bg-white rounded-t-3xl md:rounded-t-3xl border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-xl">
              <ScanSearch className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Scan Message</h2>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        <div className="p-6 pb-24 md:pb-6">
          {!result ? (
            <div className="space-y-4">
              <div>
                <label className="block text-slate-700 text-sm font-medium mb-2">Paste or type a message to analyze</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter the message you want to check for spam, scams, harassment, or other threats..."
                  className="w-full h-40 p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors text-slate-900 resize-none"
                  disabled={loading}
                />
                <div className="flex justify-end mt-1">
                  <span className="text-slate-400 text-xs">{text.length} characters</span>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm">{error}</div>
              )}

              <button
                onClick={handleScan}
                disabled={!text.trim() || loading}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold"
              >
                {loading ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Analyzing with AI...</>
                ) : (
                  <><ScanSearch className="w-5 h-5" /> Scan Message</>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                <p className="text-slate-500 text-xs mb-1">Scanned message:</p>
                <p className="text-slate-700 text-sm">{text}</p>
              </div>
              <ScanResult
                category={result.category}
                confidence={result.confidence}
                flaggedPatterns={result.flaggedPatterns}
                threatLevel={result.threatLevel}
                messageId={result.messageId}
                onAction={onAction}
              />
              <button onClick={handleReset} className="w-full py-3 px-6 bg-slate-100 text-slate-700 rounded-2xl hover:bg-slate-200 transition-colors font-medium">
                Scan Another Message
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
