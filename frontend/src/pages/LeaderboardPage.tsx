import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useAuth } from '../contexts/AuthContext';
import { Clock, Filter, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import Podium from '../components/Podium';
import RankingsTable from '../components/RankingsTable';
import type { LeaderboardEntry } from '../components/RankingsTable';
import PersonalStatsCard from '../components/PersonalStatsCard';
import BadgeShowcase from '../components/BadgeShowcase';

interface PersonalStats {
  rank: number;
  score: number;
  accuracy: number;
  best_module: string;
  percentile: number;
  badges: string[];
}

interface LeaderboardResponse {
  mode: 'live' | 'demo';
  total_players: number;
  last_updated: string;
  leaderboard: LeaderboardEntry[];
  current_user_stats: PersonalStats | null;
}

const DEMO_DATA: LeaderboardEntry[] = [
    {rank: 1, user_id: "demo_1", username: "CyberHawk_99", score: 9850, modules_completed: 20, best_module: "Phishing Detection", accuracy: 98, badges: ["🛡️", "🎯", "🔥", "👁️", "🏆", "🧠"], last_active: "2 hours ago", is_current_user: false},
    {rank: 2, user_id: "demo_2", username: "PhishSlayer", score: 9200, modules_completed: 20, best_module: "Social Engineering", accuracy: 94, badges: ["🛡️", "🎯", "🔥", "👁️", "🏆"], last_active: "5 hours ago", is_current_user: false},
    {rank: 3, user_id: "demo_3", username: "ZeroTrust_X", score: 8750, modules_completed: 18, best_module: "Malicious URL", accuracy: 91, badges: ["🛡️", "🎯", "🔥", "👁️"], last_active: "1 day ago", is_current_user: false},
    {rank: 4, user_id: "demo_4", username: "QuantumShield", score: 8100, modules_completed: 16, best_module: "QR Code Analysis", accuracy: 88, badges: ["🛡️", "🔥", "👁️"], last_active: "1 day ago", is_current_user: false},
    {rank: 5, user_id: "demo_5", username: "VaultBreaker", score: 7650, modules_completed: 14, best_module: "Password Security", accuracy: 85, badges: ["🛡️", "🎯"], last_active: "2 days ago", is_current_user: false},
    {rank: 6, user_id: "demo_6", username: "DarkPatrol", score: 7200, modules_completed: 12, best_module: "Fake Website Detection", accuracy: 83, badges: ["🛡️", "🔥"], last_active: "3 days ago", is_current_user: false},
    {rank: 7, user_id: "demo_7", username: "SecureNova", score: 6800, modules_completed: 10, best_module: "Phishing Detection", accuracy: 80, badges: ["🛡️"], last_active: "3 days ago", is_current_user: false},
    {rank: 8, user_id: "demo_8", username: "NullPointer_", score: 6100, modules_completed: 8, best_module: "Social Engineering", accuracy: 77, badges: ["🛡️"], last_active: "5 days ago", is_current_user: false},
    {rank: 9, user_id: "demo_9", username: "ByteWarden", score: 5500, modules_completed: 5, best_module: "Password Security", accuracy: 74, badges: ["🛡️"], last_active: "1 week ago", is_current_user: false},
    {rank: 10, user_id: "demo_10", username: "IronVeil", score: 4900, modules_completed: 3, best_module: "Malicious URL", accuracy: 70, badges: ["🛡️"], last_active: "1 week ago", is_current_user: false}
];

const LeaderboardPage: React.FC = () => {
  const { token } = useAuth();
  const [data, setData] = useState<LeaderboardResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [timeFilter, setTimeFilter] = useState('all');
  const [moduleFilter, setModuleFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [activeMode, setActiveMode] = useState<'live' | 'demo'>(token ? 'live' : 'demo');

  const fetchLiveLeaderboard = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/leaderboard`, {
        params: {
          time_filter: timeFilter,
          module_filter: moduleFilter,
          page: page,
          limit: 10
        },
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      setData(response.data);
      // Auto-switch to demo if backend returned demo mode initially
      if (response.data.mode === 'demo' && !token) {
          setActiveMode('demo');
      }
    } catch (err) {
      console.error('Leaderboard fetch failed', err);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [timeFilter, moduleFilter, page, token]);

  useEffect(() => {
    if (token && activeMode === 'live') {
      fetchLiveLeaderboard();
      const interval = setInterval(fetchLiveLeaderboard, 30000); // Poll every 30s
      return () => clearInterval(interval);
    }
  }, [fetchLiveLeaderboard, activeMode, token]);

  if (!data && loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  const tableEntries = activeMode === 'demo' 
    ? DEMO_DATA 
    : (data?.leaderboard?.filter(e => e.user_id !== 'demo') || []);
  const topThree = tableEntries.filter(e => e.rank <= 3);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="section-container relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">Hall of <span className="text-blue-500">Fame</span></h1>
              <p className="text-lg font-medium text-slate-400 max-w-xl leading-relaxed">
                Celebrating the defenders who refused to be fooled. See where you stand against the elite.
              </p>
            </div>

            <div className="flex flex-col items-end gap-3">
              {!token ? (
                <div className="badge-demo">
                  <Activity className="w-3 h-3" />
                  Demo Mode
                </div>
              ) : activeMode === 'live' ? (
                <div className="badge-live">
                  <span className="pulse-dot" />
                  Live Mode
                </div>
              ) : (
                <div className="badge-demo">
                  <Activity className="w-3 h-3" />
                  Demo Mode
                </div>
              )}
              {token && activeMode === 'live' && (
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  Updated {data?.last_updated ? new Date(data.last_updated).toLocaleTimeString() : 'Recently'}
                </div>
              )}
            </div>
          </div>

          <Podium topThree={topThree} />
        </div>
      </div>

      <div className="section-container -mt-12 relative z-20">
        {/* Mode Toggle Bar (Logged-in only) */}
        {token && (
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-2 flex gap-2 mb-8 max-w-sm">
            <button
              onClick={() => setActiveMode('live')}
              className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeMode === 'live' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'
                }`}
            >
              {activeMode === 'live' && <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>}
              Live Rankings
            </button>
            <button
              onClick={() => setActiveMode('demo')}
              className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeMode === 'demo' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'
                }`}
            >
              {activeMode === 'demo' && <span>🎭</span>}
              Demo Preview
            </button>
          </div>
        )}

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex bg-slate-100 p-1 rounded-xl w-full md:w-auto">
            {['all', 'month', 'week'].map((f) => (
              <button
                key={f}
                onClick={() => { setTimeFilter(f); setPage(1); }}
                className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${timeFilter === f ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
              >
                {f === 'all' ? 'All Time' : f === 'month' ? 'This Month' : 'This Week'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select
                value={moduleFilter}
                onChange={(e) => { setModuleFilter(e.target.value); setPage(1); }}
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-xs font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
              >
                <option value="all">All Modules</option>
                <option value="phishing">Phishing Email</option>
                <option value="url">Malicious URL</option>
                <option value="social">Social Engineering</option>
                <option value="password">Password Security</option>
                <option value="qr">QR Code Analyzer</option>
                <option value="website">Fake Website Detector</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sign in CTA for Demo Mode */}
        {!token && (
          <div className="signin-banner">
            <div className="flex items-center gap-4">
              <span className="text-3xl">👋</span>
              <div>
                <p className="text-lg font-black text-white">Join the defense!</p>
                <p className="text-slate-400 font-medium">You are viewing a demo. Sign in to see real rankings and compete with others.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <a href="/login" className="flex-1 md:flex-none px-8 py-3 bg-slate-800 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-slate-700 transition-all text-center border border-slate-700">
                Login
              </a>
              <a href="/signup" className="flex-1 md:flex-none px-8 py-3 bg-blue-600 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all text-center shadow-lg shadow-blue-600/20">
                Sign Up Free
              </a>
            </div>
          </div>
        )}

        {token && activeMode === 'demo' && (
          <div className="mt-8 mb-4 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-3">
            <span className="text-xl">⚠️</span>
            <p className="text-sm font-bold text-amber-900">You are viewing demo data. Switch to Live Rankings to see your progress.</p>
          </div>
        )}

        <RankingsTable
          entries={tableEntries}
          currentUserEntry={data?.leaderboard?.find(e => e.is_current_user)}
          isLoading={loading}
          activeMode={activeMode}
        />

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white transition-all shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-black text-slate-900">Page {page}</span>
          <button
            disabled={tableEntries.length < 10}
            onClick={() => setPage(p => p + 1)}
            className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white transition-all shadow-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {token && data?.current_user_stats && (
          <PersonalStatsCard
            stats={data.current_user_stats}
            onGoToModules={() => window.location.href = '/modules'}
          />
        )}

        <BadgeShowcase unlockedEmojis={data?.current_user_stats?.badges || []} />
      </div>
    </div>
  );
};

export default LeaderboardPage;
