import { BarChart3 } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import type { Message } from '../types';

interface ReportsPageProps {
  messages: Message[];
}

const COLORS = {
  spam: '#f97316',
  harassment: '#ef4444',
  scam: '#a855f7',
  promotional: '#eab308',
  normal: '#22c55e',
};

export default function ReportsPage({ messages }: ReportsPageProps) {
  if (messages.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 pb-24">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-8">
          <h1 className="text-2xl font-bold mb-2">Reports & Analytics</h1>
          <p className="text-indigo-100">0 messages scanned</p>
        </div>
        <div className="flex flex-col items-center justify-center py-20 px-6">
          <BarChart3 className="w-16 h-16 text-slate-300 mb-4" />
          <p className="text-slate-500 text-center">
            No data yet - scan some messages first
          </p>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const categoryCounts = messages.reduce((acc, msg) => {
    acc[msg.category] = (acc[msg.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(categoryCounts).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));

  const barData = Object.entries(categoryCounts).map(([name, value]) => ({
    category: name.charAt(0).toUpperCase() + name.slice(1),
    count: value,
  }));

  const totalScanned = messages.length;
  const threatsDetected = messages.filter(
    (m) => m.category === 'Spam' || m.category === 'Harassment' || m.category === 'Scam'
  ).length;
  const safeMessages = messages.filter((m) => m.category === 'Normal').length;
  const actionsTaken = messages.filter((m) => m.action !== null).length;

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-8">
        <h1 className="text-2xl font-bold mb-2">Reports & Analytics</h1>
        <p className="text-indigo-100">{totalScanned} messages scanned</p>
      </div>

      {/* Quick Stats */}
      <div className="px-6 md:px-8 py-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Quick Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-slate-500 text-sm mb-1">Total Scanned</p>
            <p className="text-2xl font-bold text-slate-900">{totalScanned}</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-slate-500 text-sm mb-1">Threats Detected</p>
            <p className="text-2xl font-bold text-red-500">{threatsDetected}</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-slate-500 text-sm mb-1">Safe Messages</p>
            <p className="text-2xl font-bold text-green-500">{safeMessages}</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <p className="text-slate-500 text-sm mb-1">Actions Taken</p>
            <p className="text-2xl font-bold text-indigo-600">{actionsTaken}</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="px-6 md:px-8 md:grid md:grid-cols-2 md:gap-6">
        {/* Pie Chart */}
        <div className="py-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Category Distribution</h2>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: { name?: string; percent?: number }) =>
                    `${name ?? ''} ${((percent ?? 0) * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[entry.name.toLowerCase() as keyof typeof COLORS]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="py-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Messages by Category</h2>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#6366f1">
                  {barData.map((entry) => (
                    <Cell
                      key={entry.category}
                      fill={COLORS[entry.category.toLowerCase() as keyof typeof COLORS]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
