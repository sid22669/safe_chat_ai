import React from 'react';
import { Bell, Ban, AlertTriangle, Flag, Megaphone, CheckCircle } from 'lucide-react';
import type { Message } from '../types';

interface NotificationsPageProps {
  messages: Message[];
}

const NotificationsPage: React.FC<NotificationsPageProps> = ({ messages }) => {
  // Filter messages to get only security alerts (non-Normal categories)
  const alerts = messages.filter((msg) => msg.category !== 'Normal');

  // Get icon based on category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Spam':
        return <Ban className="w-5 h-5 text-red-500" />;
      case 'Harassment':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'Scam':
        return <Flag className="w-5 h-5 text-purple-500" />;
      case 'Promotional':
        return <Megaphone className="w-5 h-5 text-blue-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  // Get border color based on category
  const getBorderColor = (category: string) => {
    switch (category) {
      case 'Spam':
        return 'border-l-red-500';
      case 'Harassment':
        return 'border-l-orange-500';
      case 'Scam':
        return 'border-l-purple-500';
      case 'Promotional':
        return 'border-l-blue-500';
      default:
        return 'border-l-gray-500';
    }
  };

  // Truncate message content
  const truncateContent = (content: string, maxLength: number = 80) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-3">
          <Bell className="w-7 h-7" />
          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            <p className="text-sm text-white/90">
              {alerts.length} {alerts.length === 1 ? 'alert' : 'alerts'}
            </p>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="px-4 md:px-8 py-4 mt-4">
        {alerts.length === 0 ? (
          // Empty state
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <Bell className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-gray-500 text-center text-lg font-medium">
              All clear! No security alerts.
            </p>
          </div>
        ) : (
          // Alert cards
          <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`bg-white rounded-2xl shadow-sm border-l-4 ${getBorderColor(
                alert.category
              )} p-4 hover:shadow-md transition-shadow`}
            >
              {/* Header with icon and category */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(alert.category)}
                  <span className="font-semibold text-gray-900">
                    {alert.category}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {Math.round(alert.confidence * 100)}%
                </span>
              </div>

              {/* Message content */}
              <p className="text-gray-700 mb-3 leading-relaxed">
                {truncateContent(alert.content)}
              </p>

              {/* Footer with timestamp and action status */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  {new Date(alert.timestamp).toLocaleString()}
                </span>
                {alert.action ? (
                  <div className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full">
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-medium">Resolved</span>
                  </div>
                ) : (
                  <div className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full font-medium">
                    Pending review
                  </div>
                )}
              </div>
            </div>
          ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
