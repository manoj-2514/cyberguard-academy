import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import PageLayout from './PageLayout';
import { cyberguardDB } from '../utils/cyberguardDB';
import { generateCertificatePDF } from '../utils/pdf';
import { learningResources } from '../data/learning_resources';
import {
  Search, LayoutGrid, List, CheckCircle2,
  XCircle, Clock, Lock, ArrowRight, Play,
  TrendingUp, Award, Flame, User, Settings, ChevronRight,
  TrendingDown, Download, Share2, Calendar, Target, Shield, DownloadCloud,
  FileSpreadsheet, FileArchive, Plus, Monitor,
  AlertTriangle, FileText, Trophy, Eye, Loader2
} from 'lucide-react';
import type { ViewType } from './Header';

interface DashboardPageProps {
  onNavigate: (view: ViewType, moduleId?: string) => void;
}

// ─────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────

function getCertId(moduleId: string, dateStr: string): string {
  const d = new Date(dateStr);
  const datePart = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  return `CG-${datePart}-${moduleId.toUpperCase().replace(/[^A-Z0-9]/g, '')}-001`;
}

function getExpiryDate(dateStr: string): string {
  const d = new Date(dateStr);
  d.setFullYear(d.getFullYear() + 1);
  return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}

const modulesRegistry = learningResources.map(m => ({
  id: m.id,
  title: m.name,
  category: m.id === 'phishing' || m.id === 'password_security' || m.id === 'social_engineering' || m.id === 'safe_browsing' || m.id === 'digital_footprint' ? 'User Awareness' :
    m.id === 'wifi_security' || m.id === 'device_security' || m.id === 'cloud_security' || m.id === 'mfa_authentication' || m.id === 'url_analysis' || m.id === 'mobile_security' ? 'Network & Device' :
      m.id === 'data_classification' || m.id === 'privacy_awareness' || m.id === 'incident_response' || m.id === 'physical_security' || m.id === 'supply_chain' ? 'Data & Compliance' : 'Scenario Simulations'
}));

const demoData = {
  profile: {
    name: "Manoj (Demo)",
    email: "manxj555@gmail.com",
    memberSince: "Jan 1, 2024",
    avatar: null
  },
  stats: {
    modulesCompleted: 20,
    averageScore: 91,
    certificatesEarned: 18,
    currentStreak: 21,
    bestStreak: 21,
    totalLearningTimeSeconds: 21600,
    scoreDistribution: { excellent: 14, good: 4, satisfactory: 2, fail: 0 },
    strongestModule: { id: "password_security", title: "Password Security", score: 100 },
    weakestModule: { id: "supply_chain", title: "Supply Chain Risk", score: 72 },
    categoryAverages: [
      { category: "Threat Awareness", avg: 94, count: 4 },
      { category: "Account Security", avg: 97, count: 4 },
      { category: "Network & Device", avg: 88, count: 4 },
      { category: "Data & Compliance", avg: 84, count: 4 },
      { category: "Compliance & Risk", avg: 87, count: 2 },
      { category: "Emerging Threats", avg: 83, count: 2 }
    ],
    allBadgesEarned: true,
    allAttempts: [] as any[],
    recentActivity: [] as any[],
  }
};

// ─────────────────────────────────────────────────────────
// DashboardPage
// ─────────────────────────────────────────────────────────

type ViewMode = 'table' | 'grid';
type SortMode = 'name' | 'status' | 'score' | 'date';

export default function DashboardPage({ onNavigate }: DashboardPageProps) {
  const { token } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const [isDemoMode, setIsDemoMode] = useState(() => sessionStorage.getItem('dashboard_demo') === 'true');
  const [userData, setUserData] = useState(() => cyberguardDB.getUserData());
  const [stats, setStats] = useState(() => cyberguardDB.getDashboardStats());
  const [backendStats, setBackendStats] = useState<any>(null);

  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMode] = useState<SortMode>('status');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const [timelineLimit, setTimelineLimit] = useState(5);
  const [certModalOpen, setCertModalOpen] = useState<{ isOpen: boolean; module: any | null }>({ isOpen: false, module: null });
  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [dangerModalOpen, setDangerModalOpen] = useState(false);
  const [exportLoading, setExportLoading] = useState<string | null>(null);
  const [showToast, setShowToast] = useState<{ show: boolean; msg: string; type?: 'success' | 'info' | 'error' }>({ show: false, msg: '' });

  // Fetch backend stats
  useEffect(() => {
    if (token) {
      axios.get(`${API_BASE_URL}/dashboard/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => setBackendStats(res.data))
        .catch(err => console.error('Failed to fetch dashboard stats:', err));
    }
  }, [token]);

  // Refresh stats on storage change
  useEffect(() => {
    const handleStorage = () => {
      setUserData(cyberguardDB.getUserData());
      setStats(cyberguardDB.getDashboardStats());
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const toggleDemoMode = () => {
    const newState = !isDemoMode;
    setIsDemoMode(newState);
    sessionStorage.setItem('dashboard_demo', String(newState));
    triggerToast(newState ? 'Demo Preview Mode Active' : 'Returned to live data');
  };

  const combinedData = useMemo(() => {
    return learningResources.map(res => {
      const dbModule = userData.modules[res.id];
      const levelsStatus = {
        easy: dbModule?.levels.easy.status || 'locked',
        medium: dbModule?.levels.medium.status || 'locked',
        hard: dbModule?.levels.hard.status || 'locked',
      };

      const bestScore = dbModule ? Math.max(
        dbModule.levels.easy.bestScore || 0,
        dbModule.levels.medium.bestScore || 0,
        dbModule.levels.hard.bestScore || 0
      ) : 0;

      const totalTime = dbModule ? (
        (dbModule.levels.easy.attempts?.reduce((a, b) => a + (b.durationSeconds || 0), 0) || 0) +
        (dbModule.levels.medium.attempts?.reduce((a, b) => a + (b.durationSeconds || 0), 0) || 0) +
        (dbModule.levels.hard.attempts?.reduce((a, b) => a + (b.durationSeconds || 0), 0) || 0)
      ) : 0;

      // Overall status: "completed" only if Hard is passed
      let overallStatus: 'completed' | 'in_progress' | 'not_started' = 'not_started';
      if (dbModule) {
        if (dbModule.levels.hard.status === 'completed') overallStatus = 'completed';
        else if (dbModule.overallProgress > 0) overallStatus = 'in_progress';
      }

      return {
        id: res.id,
        title: res.name,
        category: (res as any).category || 'Scenario Simulations',
        levels: levelsStatus,
        score: bestScore,
        status: overallStatus,
        date: dbModule?.lastAttemptAt || '',
        timeElapsed: totalTime
      };
    });
  }, [userData, isDemoMode]);

  const liveStats = useMemo(() => {
    if (isDemoMode) return demoData.stats;
    return stats;
  }, [stats, isDemoMode]);

  const filteredData = useMemo(() => {
    let data = [...combinedData];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter(d => d.title.toLowerCase().includes(q) || d.category.toLowerCase().includes(q));
    }
    if (categoryFilter !== 'All') data = data.filter(d => d.category === categoryFilter);

    data.sort((a, b) => {
      if (sortMode === 'name') return a.title.localeCompare(b.title);
      if (sortMode === 'score') return b.score - a.score;
      if (sortMode === 'date') return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime();
      if (sortMode === 'status') {
        const order: any = { 'completed': 1, 'in_progress': 2, 'not_started': 3 };
        return order[a.status] - order[b.status];
      }
      return 0;
    });

    return data;
  }, [combinedData, searchQuery, categoryFilter, sortMode]);

  const completedOnly = combinedData.filter(d => d.status === 'completed');

  const displayStats = {
    modulesCompleted: isDemoMode ? 20 : (backendStats?.modules_completed ?? stats.modulesCompleted),
    averageScore: isDemoMode ? 91 : (backendStats?.overall_accuracy ?? stats.averageScore),
    certificatesEarned: isDemoMode ? 18 : (backendStats?.certificates_earned ?? stats.certificatesEarned),
    currentStreak: isDemoMode ? 21 : stats.currentStreak,
    totalTime: isDemoMode ? '6h 0m' : `${Math.floor(Number(stats.totalLearningTimeSeconds) / 3600)}h ${Math.floor((Number(stats.totalLearningTimeSeconds) % 3600) / 60)}m`,
  };

  const strongestModule = isDemoMode ? demoData.stats.strongestModule : (backendStats?.top_performer || [...completedOnly].sort((a, b) => b.score - a.score)[0]);
  const weakestModule = isDemoMode ? demoData.stats.weakestModule : (backendStats?.priority_area || [...completedOnly].sort((a, b) => a.score - b.score)[0]);

  const categoryAverages = useMemo(() => {
    if (isDemoMode) return demoData.stats.categoryAverages;
    const cats: Record<string, { total: number; count: number }> = {};
    completedOnly.forEach(d => {
      if (!cats[d.category]) cats[d.category] = { total: 0, count: 0 };
      cats[d.category].total += d.score;
      cats[d.category].count += 1;
    });
    return Object.entries(cats).map(([cat, val]) => ({
      category: cat,
      avg: Math.round(val.total / val.count),
      count: val.count
    })).sort((a, b) => b.avg - a.avg);
  }, [completedOnly, isDemoMode]);

  const timelineEvents = useMemo(() => {
    if (isDemoMode) {
      return Array(15).fill(0).map((_, i) => ({
        id: `demo-ev-${i}`,
        date: new Date(Date.now() - i * 3600000).toISOString(),
        module: 'Demo Module',
        status: 'passed',
        score: 90,
        type: 'completed',
        duration: '12m'
      }));
    }

    // If we have backend stats, use their recent activity
    if (backendStats?.recent_activity) {
      return backendStats.recent_activity.map((a: any) => ({
        id: a.id,
        date: a.date,
        module: a.module,
        status: a.score >= 70 ? 'passed' : a.score > 0 ? 'failed' : 'started',
        score: a.score,
        type: a.type
      }));
    }

    const events: any[] = [];
    liveStats.allAttempts.forEach((a: any) => {
      const modTitle = (modulesRegistry as any[]).find(m => m.id === a.moduleId)?.title || a.moduleId;
      if (a.completedAt) {
        events.push({
          id: `${a.attemptId}-e`,
          date: a.completedAt,
          module: modTitle,
          status: a.passed ? 'passed' : 'failed',
          score: a.finalScore,
          type: 'completed',
          duration: `${Math.round((a.durationSeconds || 0) / 60)}m`
        });
      }
      events.push({
        id: `${a.attemptId}-s`,
        date: a.startedAt,
        module: modTitle,
        status: 'started',
        type: 'started'
      });
    });
    return events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [liveStats, isDemoMode, backendStats]);

  const activityFeed = useMemo(() => {
    // BUG 4: Grouping Logic (Option A)
    const grouped: Record<string, any> = {};

    timelineEvents.forEach(e => {
      const date = new Date(e.date).toLocaleDateString();
      const key = `${e.module}-${date}`;

      if (!grouped[key]) {
        grouped[key] = {
          id: e.id,
          date: e.date,
          module: e.module,
          attempts: 0,
          bestScore: 0,
          finalScore: 0,
          latestStatus: e.status
        };
      }

      grouped[key].attempts += 1;
      grouped[key].bestScore = Math.max(grouped[key].bestScore, e.score || 0);
      if (new Date(e.date).getTime() >= new Date(grouped[key].date).getTime()) {
        grouped[key].finalScore = e.score || 0;
        grouped[key].latestStatus = e.status;
      }
    });

    return Object.values(grouped).slice(0, 10).map(item => ({
      id: item.id,
      date: item.date,
      msg: `${item.module}${item.attempts > 1 ? ` (${item.attempts} attempts)` : ''}`,
      status: item.latestStatus,
      score: item.bestScore,
      icon: item.latestStatus === 'passed' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : item.latestStatus === 'failed' ? <XCircle className="w-4 h-4 text-rose-500" /> : item.latestStatus === 'started' ? <Play className="w-4 h-4 text-blue-500" /> : <Clock className="w-4 h-4 text-amber-500" />
    }));
  }, [timelineEvents]);

  const triggerToast = (msg: string, type: 'success' | 'info' | 'error' = 'info') => {
    setShowToast({ show: true, msg, type });
    setTimeout(() => setShowToast({ show: false, msg: '', type: 'info' }), 3000);
  };

  const handleDownload = (mod: any) => {
    const certId = getCertId(mod.id, mod.date);
    const dateStr = new Date(mod.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
    const expiryStr = getExpiryDate(mod.date);
    generateCertificatePDF(userName, mod.title, certId, mod.score, dateStr, expiryStr);
  };

  const handleShare = (certId: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/verify/${certId}`);
    triggerToast('Share link copied to clipboard!');
  };

  const handleExport = async (type: string, endpoint: string, filename: string) => {
    if (exportLoading) return;
    setExportLoading(type);
    triggerToast(`Preparing your ${type}...`, 'info');

    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard/export/${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      triggerToast(`${type} downloaded successfully!`, 'success');
    } catch (err) {
      console.error('Export failed:', err);
      triggerToast(`Failed to download ${type}. Please try again.`, 'error');
    } finally {
      setExportLoading(null);
    }
  };

  const profile = isDemoMode ? demoData.profile : userData.profile;
  const userName = profile.name || 'Cyber Student';

  return (
    <PageLayout maxWidth="2xl" className="pb-32 dark:bg-slate-950 transition-colors duration-300">
      {isDemoMode && (
        <div className="fixed top-0 left-0 right-0 z-[110] bg-amber-500 text-slate-900 px-4 py-3 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center justify-between font-bold text-sm">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5" />
              <span>Demo Preview — This is sample data showing what your dashboard looks like when fully completed. Your real progress: {stats.modulesCompleted} modules completed.</span>
            </div>
            <button onClick={toggleDemoMode} className="bg-slate-900 text-white px-4 py-1.5 rounded-lg hover:bg-slate-800 transition-colors">Exit Demo</button>
          </div>
        </div>
      )}

      <div role="alert" className={`fixed bottom-8 left-1/2 -translate-x-1/2 ${showToast.type === 'error' ? 'bg-rose-600' : showToast.type === 'success' ? 'bg-emerald-600' : 'bg-slate-900 dark:bg-slate-800'} text-white px-8 py-4 rounded-2xl shadow-2xl transition-all duration-300 z-[100] ${showToast.show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
        <div className="flex items-center gap-3 font-bold text-sm">
          {showToast.type === 'error' ? <XCircle className="w-5 h-5" /> : showToast.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <Shield className="w-5 h-5 text-blue-500" />}
          {showToast.msg}
        </div>
      </div>

      <div className="flex items-center justify-between mb-8 mt-4">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-400 dark:text-slate-500">
          <button onClick={() => onNavigate('landing')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900 dark:text-slate-200">Dashboard</span>
        </div>
        <button
          onClick={toggleDemoMode}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all border ${isDemoMode ? 'bg-amber-100 border-amber-200 text-amber-700' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
        >
          <Eye className="w-4 h-4" />
          {isDemoMode ? 'Live Data' : 'Preview Demo'}
        </button>
      </div>

      <header className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 mb-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-3xl font-black shadow-lg shadow-blue-200 dark:shadow-none shrink-0">{userName.charAt(0)}</div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">{userName}</h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-bold text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {profile.email || 'student@cyberguard.edu'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 hidden md:block"></span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Member since {new Date(profile.memberSince).getFullYear() || 2024}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 hidden md:block"></span>
              <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400"><Award className="w-4 h-4" /> {displayStats.certificatesEarned} Certifications</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 hidden md:block"></span>
              <span className="flex items-center gap-1.5 text-rose-600"><Flame className="w-4 h-4" /> {displayStats.currentStreak} Day Streak</span>
            </div>
          </div>
        </div>
        <button className="relative z-10 flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-colors">
          <Settings className="w-4 h-4" /> Edit Profile
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard title="Modules Completed" value={displayStats.modulesCompleted} total={20} icon={<CheckCircle2 className="w-5 h-5 text-blue-600" />} progress={(Number(displayStats.modulesCompleted) / 20) * 100} color="blue" />
        <StatCard title="Average Score" value={`${displayStats.averageScore}%`} icon={<Target className="w-5 h-5 text-emerald-600" />} badge={Number(displayStats.averageScore) >= 80 ? 'Excellent' : Number(displayStats.averageScore) >= 70 ? 'Passing' : 'Needs Work'} color="emerald" />
        <StatCard title="Certificates Earned" value={displayStats.certificatesEarned} total={20} icon={<Award className="w-5 h-5 text-amber-600" />} color="amber" />
        <StatCard title="Learning Time" value={displayStats.totalTime} icon={<Clock className="w-5 h-5 text-rose-600" />} description={isDemoMode ? "Full Curriculum" : `${displayStats.modulesCompleted} modules session data`} color="rose" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        <div className="lg:col-span-8 space-y-12">

          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3"><Plus className="w-6 h-6 text-blue-600" /> Recommendations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(Object.entries(userData.modules) as [string, any][]).find(([_, m]) => m.currentAttempt) ? (
                <RecommendationCard
                  title="Continue where you left off"
                  subtitle={(Object.entries(userData.modules) as [string, any][]).find(([_, m]) => m.currentAttempt)![0].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  detail={`${(Object.entries(userData.modules) as [string, any][]).find(([_, m]) => m.currentAttempt)![1].currentAttempt?.level.toUpperCase()} Level • Question ${(Object.entries(userData.modules) as [string, any][]).find(([_, m]) => m.currentAttempt)![1].currentAttempt?.questions.length || 0} of 7`}
                  icon={<Clock className="w-5 h-5 text-blue-600" />}
                  action="Resume Now"
                  onClick={() => onNavigate('simulation', (Object.entries(userData.modules) as [string, any][]).find(([_, m]) => m.currentAttempt)![0])}
                />
              ) : (
                <RecommendationCard
                  title="Jump start your journey"
                  subtitle="Email Analysis"
                  detail="Fundamental module"
                  icon={<Play className="w-5 h-5 text-blue-600" />}
                  action="Start Now"
                  onClick={() => onNavigate('simulation', 'email-analysis')}
                />
              )}
              {weakestModule && weakestModule.score < 80 ? (
                <RecommendationCard title="Strengthen your weakest area" subtitle={weakestModule?.title || 'Social Engineering'} detail={`${weakestModule?.score || 65}% Mastery`} icon={<TrendingDown className="w-5 h-5 text-rose-600" />} action="Retake Module" variant="rose" onClick={() => onNavigate('simulation', weakestModule?.id)} />
              ) : (
                <RecommendationCard title="Earn your first badge" subtitle="Password Security" detail="Easy difficulty" icon={<Award className="w-5 h-5 text-emerald-600" />} action="Start Now" variant="emerald" onClick={() => onNavigate('simulation', 'password-security')} />
              )}
              <RecommendationCard title="Recommended next module" subtitle="Incident Response" detail="Prerequisite: Ransomware" icon={<ArrowRight className="w-5 h-5 text-emerald-600" />} action="View Module" variant="emerald" />
              <RecommendationCard title="Try a new category" subtitle="Data & Compliance" detail="4 Modules available" icon={<Shield className="w-5 h-5 text-amber-600" />} action="Explore Category" variant="amber" />
            </div>
          </section>

          <section className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3"><TrendingUp className="w-6 h-6 text-blue-600" /> Performance Analysis</h2>
            {completedOnly.length > 0 || isDemoMode ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6">Score Distribution</h3>
                    <div className="space-y-4">
                      <DistributionBar label="Excellent (90-100)" count={isDemoMode ? 14 : completedOnly.filter(d => d.score >= 90).length} total={isDemoMode ? 20 : completedOnly.length} color="bg-emerald-500" />
                      <DistributionBar label="Good (80-89)" count={isDemoMode ? 4 : completedOnly.filter(d => d.score >= 80 && d.score < 90).length} total={isDemoMode ? 20 : completedOnly.length} color="bg-blue-500" />
                      <DistributionBar label="Satisfactory (70-79)" count={isDemoMode ? 2 : completedOnly.filter(d => d.score >= 70 && d.score < 80).length} total={isDemoMode ? 20 : completedOnly.length} color="bg-amber-500" />
                      <DistributionBar label="Needs Improvement (<70)" count={isDemoMode ? 0 : completedOnly.filter(d => d.score < 70).length} total={isDemoMode ? 20 : completedOnly.length} color="bg-rose-500" />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center gap-6">
                    <HighlightCard type="strongest" module={strongestModule} />
                    <HighlightCard
                      type="weakest"
                      module={weakestModule}
                      fallbackMsg={!backendStats || backendStats.modules_completed < 2 ? "Complete more modules to identify your weak areas" : undefined}
                      recommendation={weakestModule?.score < 70 ? "Review the scenario explanations and retake the module to improve your score." : undefined}
                    />
                  </div>
                </div>
                <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6">Category Averages</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {categoryAverages.map(cat => (
                      <div key={cat.category}>
                        <div className="flex justify-between text-sm font-bold mb-2">
                          <span className="text-slate-700 dark:text-slate-300">{cat.category}</span>
                          <span className="text-slate-900 dark:text-white">{cat.avg}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${cat.avg >= 80 ? 'bg-emerald-500' : cat.avg >= 70 ? 'bg-blue-500' : 'bg-rose-500'}`} style={{ width: `${cat.avg}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 text-slate-300">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">No Performance Data Yet</h3>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400 max-w-sm">Complete your first simulation to see your score distribution and category analysis.</p>
                <button onClick={() => onNavigate('modules')} className="mt-8 px-8 py-3 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">Explore Modules</button>
              </div>
            )}
          </section>

          {/* SECTION 3: FULL TRAINING CATALOG (Restored) */}
          <section>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Full Training Catalog</h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium">Browse and manage your entire curriculum.</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" placeholder="Search modules..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64" />
                </div>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Categories</option>
                  <option value="Threat Awareness">Threat Awareness</option>
                  <option value="Network & Device">Network & Device</option>
                  <option value="Data & Compliance">Data & Compliance</option>
                  <option value="Emerging Threats">Emerging Threats</option>
                </select>
                <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                  <button onClick={() => setViewMode('table')} className={`p-2 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-white dark:bg-slate-900 shadow-sm text-blue-600' : 'text-slate-500'}`} aria-label="Table View"><List className="w-4 h-4" /></button>
                  <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-slate-900 shadow-sm text-blue-600' : 'text-slate-500'}`} aria-label="Grid View"><LayoutGrid className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
            {viewMode === 'table' ? (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm overflow-hidden overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                      <th className="py-5 px-6 text-xs font-black uppercase tracking-widest text-slate-400">Module Name</th>
                      <th className="py-5 px-6 text-xs font-black uppercase tracking-widest text-slate-400">Mastery</th>
                      <th className="py-5 px-6 text-xs font-black uppercase tracking-widest text-slate-400 text-center">Best Score</th>
                      <th className="py-5 px-6 text-xs font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredData.map(mod => (
                      <tr key={mod.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="py-5 px-6">
                          <p className="font-bold text-slate-900 dark:text-white text-[15px]">{mod.title}</p>
                          <p className="text-xs text-slate-500 font-medium mt-1">{mod.category}</p>
                        </td>
                        <td className="py-5 px-6"><div className="flex items-center gap-4"><StatusBadge status={mod.status} /><LevelDots levels={mod.levels} /></div></td>
                        <td className="py-5 px-6 text-center"><span className={`font-black text-lg ${mod.status === 'not_started' ? 'text-slate-300 dark:text-slate-700' : 'text-slate-700 dark:text-slate-300'}`}>{mod.status === 'not_started' && mod.score === 0 ? '-' : `${mod.score}%`}</span></td>
                        <td className="py-5 px-6 text-right"><ActionButton status={mod.status} onClick={() => onNavigate('simulation', mod.id)} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredData.map(mod => (
                  <div key={mod.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-6 shadow-sm hover:shadow-lg transition-all flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-3"><StatusBadge status={mod.status} /><LevelDots levels={mod.levels} /></div>
                      {mod.status !== 'not_started' && <span className="font-black text-lg text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-xl">{mod.score}%</span>}
                    </div>
                    <div className="flex-1"><h3 className="font-black text-slate-900 dark:text-white text-lg mb-2 leading-tight">{mod.title}</h3><p className="text-xs font-bold text-slate-400 mb-6">{mod.category}</p></div>
                    <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800"><ActionButton status={mod.status} onClick={() => onNavigate('simulation', mod.id)} compact className="w-full" /></div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3"><Target className="w-6 h-6 text-blue-600" /> Goals & Milestones</h2>
              <button onClick={() => setGoalModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-sm transition-all"><Plus className="w-4 h-4" /> Set New Goal</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <GoalItem title="Complete All 20 Modules" progress={displayStats.modulesCompleted} total={20} deadline="May 15" />
              <GoalItem title="Achieve 80%+ Average" progress={displayStats.averageScore} total={80} suffix="%" deadline={displayStats.averageScore >= 80 ? "Goal Achieved!" : `Need ${80 - displayStats.averageScore}% more`} />
            </div>
            <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6">Milestones Journey</h3>
              <div className="flex flex-wrap gap-3">
                <MilestoneChip label="Completed 10 modules" checked={backendStats?.milestone_progress?.completed_10_modules || displayStats.modulesCompleted >= 10} progress={`${displayStats.modulesCompleted}/10`} />
                <MilestoneChip label="Earned 10 certificates" checked={backendStats?.milestone_progress?.earned_10_certificates || displayStats.certificatesEarned >= 10} progress={`${displayStats.certificatesEarned}/10`} />
                <MilestoneChip label="Complete 15 modules" progress={`${displayStats.modulesCompleted}/15`} active={displayStats.modulesCompleted >= 10 && displayStats.modulesCompleted < 15} checked={backendStats?.milestone_progress?.completed_15_modules || displayStats.modulesCompleted >= 15} />
                <MilestoneChip label="Complete all 20 modules" progress={`${displayStats.modulesCompleted}/20`} locked={displayStats.modulesCompleted < 15} active={displayStats.modulesCompleted >= 15 && displayStats.modulesCompleted < 20} checked={backendStats?.milestone_progress?.completed_20_modules || displayStats.modulesCompleted >= 20} />
                <MilestoneChip label="Achieve 85%+ average" progress={`${displayStats.averageScore}%`} locked={displayStats.averageScore < 80} active={displayStats.averageScore >= 80 && displayStats.averageScore < 85} checked={backendStats?.milestone_progress?.achieved_85_avg || displayStats.averageScore >= 85} />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3"><Award className="w-6 h-6 text-blue-600" /> Achievement Certificates</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredData.filter(d => d.status === 'completed').map(mod => (
                <CertificateCard key={mod.id} module={mod} onDownload={() => handleDownload(mod)} onView={() => setCertModalOpen({ isOpen: true, module: mod })} onShare={() => handleShare(getCertId(mod.id, mod.date))} onStart={() => onNavigate('simulation', mod.id)} />
              ))}
            </div>
          </section>
        </div>

        <aside className="lg:col-span-4 space-y-8">
          <section className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {activityFeed.map(item => (
                <div key={item.id} className="flex gap-4 items-start group">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0">{item.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black text-slate-400 dark:text-slate-500 mb-0.5">{new Date(item.date).toLocaleDateString()}</p>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">{item.msg}</p>
                    {item.score && <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">{item.score}% Scored</p>}
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-8 w-full py-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 font-bold text-xs rounded-xl transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-600">View Full History</button>
          </section>

          {/* SECTION 5: LEARNING TIMELINE (Restored) */}
          <section className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2"><Clock className="w-5 h-5 text-blue-600" /> Full Timeline</h2>
            <div className="relative pl-4 space-y-6">
              <div className="absolute left-4 top-2 bottom-2 w-px bg-slate-100 dark:bg-slate-800"></div>
              {timelineEvents.slice(0, timelineLimit).map((event) => (
                <div key={event.id} className="relative pl-8">
                  <div className={`absolute left-[-4.5px] top-1.5 w-2.5 h-2.5 rounded-full ring-4 ring-white dark:ring-slate-900 ${event.status === 'passed' ? 'bg-emerald-500' : event.status === 'failed' ? 'bg-rose-500' : event.status === 'started' ? 'bg-blue-500' : 'bg-amber-500'}`}></div>
                  <p className="text-[10px] font-black text-slate-400 mb-1">{new Date(event.date).toLocaleDateString()} {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-200">{event.module}</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-1">{event.type.toUpperCase()} {event.score && `• ${event.score}%`}</p>
                </div>
              ))}
            </div>
            {timelineEvents.length > timelineLimit && (
              <button onClick={() => setTimelineLimit(l => l + 5)} className="mt-6 w-full py-2 bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold text-[10px] rounded-lg hover:bg-slate-100 transition-colors">Load More</button>
            )}
          </section>

          <section className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6">Achievements</h2>
            <div className="grid grid-cols-5 gap-3">
              <BadgeIcon id="1" name="First Steps" earned={displayStats.modulesCompleted >= 1} icon={<Shield className="w-6 h-6" />} color="blue" criteria="Complete your first module" />
              <BadgeIcon id="2" name="Phishing Master" earned={Math.max(userData.modules['email-analysis']?.levels.easy.bestScore || 0, userData.modules['email-analysis']?.levels.medium.bestScore || 0, userData.modules['email-analysis']?.levels.hard.bestScore || 0) >= 90} icon={<Target className="w-6 h-6" />} color="emerald" criteria="Score 90+ on Email Analysis" />
              <BadgeIcon id="3" name="Security Pro" earned={displayStats.modulesCompleted >= 5} icon={<Trophy className="w-6 h-6" />} color="amber" criteria="Complete 5 modules" />
              <BadgeIcon id="4" name="Perfect Score" earned={(Object.values(userData.modules) as any[]).some(m => Math.max(m.levels.easy.bestScore || 0, m.levels.medium.bestScore || 0, m.levels.hard.bestScore || 0) === 100)} icon={<CheckCircle2 className="w-6 h-6" />} color="rose" criteria="Get 100% on any module" />
              <BadgeIcon id="5" name="7-Day Streak" earned={displayStats.currentStreak >= 7} icon={<Flame className="w-6 h-6" />} color="indigo" criteria="Maintain a 7-day streak" />
              <BadgeIcon id="6" name="Ransomware Master" criteria="Score 90+ on Ransomware Defense" progress={userData.modules['ransomware-defense'] ? `${Math.max(userData.modules['ransomware-defense'].levels.easy.bestScore || 0, userData.modules['ransomware-defense'].levels.medium.bestScore || 0, userData.modules['ransomware-defense'].levels.hard.bestScore || 0)}/90` : "0/90"} earned={Math.max(userData.modules['ransomware-defense']?.levels.easy.bestScore || 0, userData.modules['ransomware-defense']?.levels.medium.bestScore || 0, userData.modules['ransomware-defense']?.levels.hard.bestScore || 0) >= 90} />
              <BadgeIcon id="7" name="Perfect Organization" criteria="Complete all 20 modules" progress={`${displayStats.modulesCompleted}/20`} earned={displayStats.modulesCompleted >= 20} />
              <BadgeIcon id="8" name="Speed Demon" criteria="Finish a module in < 8 min" earned={(Object.values(userData.modules) as any[]).some(m => ['easy', 'medium', 'hard'].some(lvl => (m.levels as any)[lvl].attempts.some((a: any) => (a.durationSeconds || 999) < 480)))} />
              <BadgeIcon id="9" name="All-Rounder" criteria="All categories score ≥ 70%" earned={categoryAverages.length >= 4 && categoryAverages.every(c => c.avg >= 70)} />
              <BadgeIcon id="10" name="Consistent" criteria="10 passed modules in a row" earned={displayStats.modulesCompleted >= 10} />
            </div>
          </section>

          <section className="space-y-4">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Learning Time</h3>
              <div className="space-y-4">
                <StatRow label="Total Time" value={displayStats.totalTime} />
                <StatRow label="Avg / Module" value={Number(displayStats.modulesCompleted) > 0 ? `${Math.round(Number(liveStats.totalLearningTimeSeconds) / Number(displayStats.modulesCompleted) / 60)}m` : '0m'} />
                <StatRow label="Fastest Session" value={Number(displayStats.modulesCompleted) > 0 ? `${Math.round(Math.min(...(Object.values(userData.modules) as any[]).flatMap(m => ['easy', 'medium', 'hard'].flatMap(lvl => (m.levels as any)[lvl].attempts.map((a: any) => Number(a.durationSeconds) || 999)))) / 60)}m` : '0m'} />
                <StatRow label="Slowest Session" value={Number(displayStats.modulesCompleted) > 0 ? `${Math.round(Math.max(...(Object.values(userData.modules) as any[]).flatMap(m => ['easy', 'medium', 'hard'].flatMap(lvl => (m.levels as any)[lvl].attempts.map((a: any) => Number(a.durationSeconds) || 0)))) / 60)}m` : '0m'} />
              </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Attempt Accuracy</h3>
              <div className="space-y-4">
                <StatRow label="Total Attempts" value={liveStats.allAttempts.length} />
                <StatRow label="Unique Modules" value={new Set(liveStats.allAttempts.map((a: any) => a.moduleId)).size} />
                <StatRow label="Overall Pass Rate" value={isDemoMode ? "100%" : (backendStats?.overall_pass_rate ? `${backendStats.overall_pass_rate}%` : '0%')} color="emerald" prominent />
                <StatRow
                  label="First-Try Pass Rate"
                  value={isDemoMode ? "14%" : (backendStats?.first_try_pass_rate ? `${backendStats.first_try_pass_rate}%` : '0%')}
                  description="Percentage of modules passed on the first attempt"
                />
                <StatRow label="Retakes Done" value={isDemoMode ? 5 : (liveStats.allAttempts.length - new Set(liveStats.allAttempts.map((a: any) => a.moduleId)).size)} />
              </div>
            </div>
          </section>
        </aside>
      </div>

      <section className="mb-16">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3"><DownloadCloud className="w-6 h-6 text-blue-600" /> Data Portability</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ExportCard
            title="Progress Report"
            type="PDF"
            size="1.2 MB"
            icon={<FileText className="text-blue-600" />}
            loading={exportLoading === 'Progress Report'}
            onClick={() => handleExport('Progress Report', 'progress-report', `CyberGuard_Progress_${userName}.pdf`)}
          />
          <ExportCard
            title="Certificate Bundle"
            type="ZIP"
            size="4.8 MB"
            icon={<FileArchive className="text-amber-600" />}
            loading={exportLoading === 'Certificates'}
            onClick={() => handleExport('Certificates', 'certificates', `CyberGuard_Certificates_${userName}.zip`)}
          />
          <ExportCard
            title="Formal Transcript"
            type="PDF"
            size="0.9 MB"
            icon={<FileSpreadsheet className="text-emerald-600" />}
            loading={exportLoading === 'Transcript'}
            onClick={() => handleExport('Transcript', 'transcript', `CyberGuard_Transcript_${userName}.pdf`)}
          />
          <ExportCard
            title="Data Export"
            type="CSV"
            size="0.2 MB"
            icon={<Monitor className="text-slate-600" />}
            loading={exportLoading === 'raw data'}
            onClick={() => handleExport('raw data', 'data', `CyberGuard_Data_${userName}.csv`)}
          />
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800"><h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3"><Settings className="w-6 h-6 text-blue-600" /> Platform Settings</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800">
          <div className="p-8 space-y-8">
            <SettingsGroup title="Account Security"><SettingsItem label="Full Name" value={userName} action="Change" /><SettingsItem label="Email Address" value={profile.email || 'student@cyberguard.edu'} action="Change" /><SettingsItem label="Password" value="••••••••••••" action="Update" /></SettingsGroup>
            <SettingsGroup title="Learning Preferences"><ToggleItem label="Daily Email Reminders" enabled /><ToggleItem label="Show Detailed Score Breakdown" enabled /><ToggleItem label="Dark Mode" enabled={darkMode} onToggle={toggleDarkMode} /></SettingsGroup>
          </div>
          <div className="p-8 space-y-8">
            <SettingsGroup title="Privacy & Sharing"><ToggleItem label="Public Profile Visibility" enabled={false} /><ToggleItem label="Auto-share certificates on LinkedIn" enabled={false} /><ToggleItem label="Anonymous Analytics Opt-in" enabled /></SettingsGroup>
            <SettingsGroup title="Danger Zone"><div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/20"><h4 className="text-sm font-black text-rose-600 dark:text-rose-400 mb-2">Delete Account</h4><p className="text-xs text-rose-500 font-medium mb-4">Once deleted, all your progress, certificates, and scores will be permanently removed.</p><button onClick={() => setDangerModalOpen(true)} className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-rose-600/20 active:scale-95">Delete My Account</button></div></SettingsGroup>
          </div>
        </div>
      </section>

      {certModalOpen.isOpen && certModalOpen.module && (
        <CertificateModal module={certModalOpen.module} userName={userName} onClose={() => setCertModalOpen({ isOpen: false, module: null })} onDownload={() => handleDownload(certModalOpen.module)} />
      )}

      {goalModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setGoalModalOpen(false)}></div>
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] shadow-2xl relative z-10 p-8 animate-slide-up">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Set New Learning Goal</h3>
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Goal Type</label>
                <select className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl font-bold text-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500">
                  <option>Complete Modules</option>
                  <option>Achieve Average Score</option>
                  <option>Earn Certificates</option>
                  <option>Daily Learning Time</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Target Value</label>
                <input type="number" placeholder="e.g. 20" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl font-bold text-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setGoalModalOpen(false)} className="flex-1 py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-colors">Cancel</button>
              <button onClick={() => { setGoalModalOpen(false); triggerToast('New goal set successfully!'); }} className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-blue-600/20">Set Goal</button>
            </div>
          </div>
        </div>
      )}

      {dangerModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setDangerModalOpen(false)}></div>
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] shadow-2xl relative z-10 p-8 text-center animate-slide-up">
            <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/20 text-rose-600 mx-auto rounded-full flex items-center justify-center mb-6"><AlertTriangle className="w-8 h-8" /></div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Are you sure?</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium mb-8">This action is irreversible. All 14 earned certificates and 5 hours of learning data will be lost forever.</p>
            <div className="flex gap-3"><button onClick={() => setDangerModalOpen(false)} className="flex-1 py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-colors">Cancel</button><button className="flex-1 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-rose-600/20">Confirm Deletion</button></div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}

// ─────────────────────────────────────────────────────────
// UI Sub-Components
// ─────────────────────────────────────────────────────────

const StatCard = ({ title, value, total, icon, progress, badge, description, color }: any) => {
  const colors: any = {
    blue: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20',
    emerald: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20',
    amber: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20',
    rose: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20'
  };
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between h-full group hover:border-blue-200 dark:hover:border-blue-800 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${colors[color]}`}>{icon}</div>
        {badge && <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${colors[color]}`}>{badge}</span>}
      </div>
      <div>
        <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">{title}</p>
        <div className="flex items-baseline gap-1.5"><span className="text-3xl font-black text-slate-900 dark:text-white">{value}</span>{total && <span className="text-lg font-bold text-slate-300 dark:text-slate-700">/ {total}</span>}</div>
        {progress !== undefined && <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-3"><div className={`h-full transition-all duration-1000 ${color === 'blue' ? 'bg-blue-600' : 'bg-slate-400'}`} style={{ width: `${progress}%` }}></div></div>}
        {description && <p className="text-xs font-bold text-slate-400 dark:text-slate-600 mt-2">{description}</p>}
      </div>
    </div>
  );
};

const RecommendationCard = ({ title, subtitle, detail, icon, action, onClick, variant = 'blue' }: any) => {
  const colorMap: any = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900/30 text-blue-600 dark:text-blue-400',
    rose: 'bg-rose-50 dark:bg-rose-900/20 border-rose-100 dark:border-rose-900/30 text-rose-600 dark:text-rose-400',
    emerald: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400',
    amber: 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-900/30 text-amber-600 dark:text-amber-400',
  };
  return (
    <div className={`p-6 rounded-[2rem] border ${colorMap[variant]} flex flex-col justify-between group hover:shadow-lg transition-all`}>
      <div>
        <div className="flex items-center gap-3 mb-4"><div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 shadow-sm">{icon}</div><span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{title}</span></div>
        <h4 className="text-lg font-black text-slate-900 dark:text-white mb-1 leading-tight">{subtitle}</h4>
        <p className="text-xs font-bold text-slate-400 dark:text-slate-500">{detail}</p>
      </div>
      <button onClick={onClick} className="mt-6 flex items-center gap-2 text-sm font-black text-slate-900 dark:text-white hover:gap-3 transition-all">{action} <ChevronRight className="w-4 h-4" /></button>
    </div>
  );
};

const DistributionBar = ({ label, count, total, color }: any) => {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div>
      <div className="flex justify-between text-[11px] font-black text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-widest"><span>{label}</span><span>{count} modules</span></div>
      <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden"><div className={`h-full ${color} rounded-full transition-all duration-1000`} style={{ width: `${pct}%` }}></div></div>
    </div>
  );
};

const HighlightCard = ({ type, module, recommendation, fallbackMsg }: any) => {
  if (!module && !fallbackMsg) return null;
  const isStrong = type === 'strongest';
  return (
    <div className={`p-6 rounded-3xl border ${isStrong ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/20' : 'bg-rose-50 dark:bg-rose-900/10 border-rose-100 dark:border-rose-900/20'}`}>
      <div className="flex items-center gap-3 mb-3">{isStrong ? <Trophy className="w-5 h-5 text-emerald-600" /> : <TrendingDown className="w-5 h-5 text-rose-600" />}<span className={`text-[10px] font-black uppercase tracking-widest ${isStrong ? 'text-emerald-600' : 'text-rose-600'}`}>{isStrong ? 'Top Performer' : 'Priority Area'}</span></div>
      {module ? (
        <h4 className={`text-lg font-black ${isStrong ? 'text-emerald-900 dark:text-emerald-400' : 'text-rose-900 dark:text-rose-400'}`}>{module.title} — {module.score}%</h4>
      ) : (
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{fallbackMsg}</p>
      )}
      {recommendation && <p className="text-xs text-rose-600/80 dark:text-rose-400/60 font-medium mt-2 italic">{recommendation}</p>}
    </div>
  );
};

const GoalItem = ({ title, progress, total, suffix = '', deadline }: any) => {
  const pct = (progress / total) * 100;
  return (
    <div>
      <div className="flex justify-between items-end mb-3"><div><h4 className="text-sm font-black text-slate-800 dark:text-white mb-0.5">{title}</h4><p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">{deadline}</p></div><div className="text-right"><span className="text-xl font-black text-slate-900 dark:text-white">{progress}{suffix}</span><span className="text-xs font-bold text-slate-300 dark:text-slate-600"> / {total}{suffix}</span></div></div>
      <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-blue-600 rounded-full" style={{ width: `${pct}%` }}></div></div>
    </div>
  );
};

const MilestoneChip = ({ label, checked, progress, active, locked }: any) => (
  <div className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${checked ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400' : active ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400' : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500'}`}>
    {checked ? <CheckCircle2 className="w-3.5 h-3.5" /> : locked ? <Lock className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}{label} {progress && <span className="opacity-50">({progress})</span>}
  </div>
);

const CertificateCard = ({ module, onDownload, onView, onShare, onStart }: any) => {
  const isEarned = module.status === 'completed';
  return (
    <div className={`p-6 rounded-[2rem] border transition-all flex flex-col ${isEarned ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg' : 'bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 opacity-80'}`}>
      <div className="flex justify-between items-start mb-6"><div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isEarned ? 'bg-amber-100 dark:bg-amber-900/20 text-amber-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>{isEarned ? <Award className="w-6 h-6" /> : <Lock className="w-6 h-6" />}</div>{isEarned ? <span className="text-xs font-black bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-1 rounded-lg">{module.score}%</span> : <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Complete Hard Level to Earn</span>}</div>
      <h3 className={`font-black text-lg leading-tight mb-2 ${isEarned ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-600'}`}>{module.title}</h3>
      <div className="mt-auto pt-6 flex flex-col gap-2">{isEarned ? (<><button onClick={onDownload} className="w-full py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2"><Download className="w-3.5 h-3.5" /> PDF</button><div className="grid grid-cols-2 gap-2"><button onClick={onView} className="py-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-[10px] rounded-xl transition-all flex items-center justify-center gap-1.5"><Eye className="w-3.5 h-3.5" /> View</button><button onClick={onShare} className="py-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-[10px] rounded-xl transition-all flex items-center justify-center gap-1.5"><Share2 className="w-3.5 h-3.5" /> Share</button></div></>) : (<button onClick={onStart} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-blue-600/20 active:scale-95">{module.status === 'in_progress' ? 'Resume' : 'Start Now'}</button>)}</div>
    </div>
  );
};

const BadgeIcon = ({ name, earned, icon, color, criteria, progress }: any) => {
  const colors: any = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    emerald: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
    amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    rose: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400',
    indigo: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
  };
  return (
    <div className="relative group flex flex-col items-center">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${earned ? colors[color] : 'bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-700 grayscale'}`}>{icon}</div>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 min-w-[120px] shadow-xl text-center"><p className="font-black mb-1">{name}</p><p className="text-slate-400 leading-tight">{criteria || (earned ? 'Earned!' : 'Locked')}</p>{progress && <p className="text-blue-400 mt-1 font-black">{progress}</p>}<div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900"></div></div>
    </div>
  );
};

const StatRow = ({ label, value, color, prominent, description }: any) => (
  <div className="flex flex-col gap-1">
    <div className="flex justify-between items-center">
      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{label}</span>
      <span className={`font-black ${prominent ? 'text-lg' : 'text-sm'} ${color === 'emerald' ? 'text-emerald-600' : 'text-slate-900 dark:text-white'}`}>{value}</span>
    </div>
    {description && <p className="text-[10px] text-slate-400 dark:text-slate-500 italic">{description}</p>}
  </div>
);

const ExportCard = ({ title, type, size, icon, onClick, loading }: any) => (
  <button
    onClick={onClick}
    disabled={loading}
    className={`p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl text-left hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all group active:scale-[0.98] relative overflow-hidden ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
        {loading ? <Loader2 className="w-6 h-6 animate-spin text-blue-600" /> : React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: 'w-6 h-6' })}
      </div>
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{type} • {size}</span>
    </div>
    <h4 className="text-lg font-black text-slate-900 dark:text-white mb-1">{title}</h4>
    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-2">
      {loading ? 'Preparing...' : 'Download Now'}
      {!loading && <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
    </p>
  </button>
);

const SettingsGroup = ({ title, children }: any) => (<div><h3 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6">{title}</h3><div className="space-y-6">{children}</div></div>);

const SettingsItem = ({ label, value, action }: any) => (<div className="flex justify-between items-center group"><div><p className="text-xs font-bold text-slate-400 mb-0.5">{label}</p><p className="text-sm font-black text-slate-800 dark:text-white">{value}</p></div><button className="text-xs font-black text-blue-600 dark:text-blue-400 hover:underline">{action}</button></div>);

const ToggleItem = ({ label, enabled, onToggle }: any) => (
  <div className="flex justify-between items-center"><span className="text-sm font-bold text-slate-700 dark:text-slate-300">{label}</span><button onClick={onToggle} className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${enabled ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'}`} role="switch" aria-checked={enabled}><span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 mt-1 ${enabled ? 'translate-x-6' : 'translate-x-1'}`} /></button></div>
);

const CertificateModal = ({ module, userName, onClose, onDownload }: any) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"><div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div><div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden animate-slide-up flex flex-col max-h-[90vh]"><div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900"><h3 className="font-black text-slate-900 dark:text-white flex items-center gap-2"><Award className="w-5 h-5 text-blue-600" /> Certificate Details</h3><button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"><XCircle className="w-6 h-6" /></button></div><div className="p-8 overflow-y-auto"><div className="aspect-[1.414/1] bg-white border-[10px] border-blue-600 p-2 rounded-lg w-full max-w-3xl mx-auto shadow-2xl relative text-slate-900"><div className="w-full h-full border-2 border-slate-100 flex flex-col items-center justify-center p-8 text-center bg-white"><h4 className="text-4xl md:text-5xl font-black tracking-tighter">CERTIFICATE</h4><p className="text-lg md:text-xl font-medium text-slate-400 tracking-widest mb-10">OF COMPLETION</p><p className="text-slate-400 italic mb-2">This is to certify that</p><p className="text-3xl md:text-4xl font-black text-blue-600 mb-6">{userName}</p><p className="text-slate-400 italic mb-2">has successfully completed</p><p className="text-2xl md:text-3xl font-black text-slate-900 mb-8 max-w-lg">{module.title.toUpperCase()}</p><p className="text-xl font-black text-emerald-600">Score: {module.score}/100</p></div></div><div className="flex flex-wrap justify-center gap-4 mt-8"><button onClick={onDownload} className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl transition-all shadow-lg active:scale-95"><Download className="w-4 h-4" /> Download PDF</button><button className="flex items-center gap-2 px-8 py-3 border border-blue-200 text-blue-700 font-bold rounded-xl transition-all hover:bg-blue-50 active:scale-95"><Share2 className="w-4 h-4" /> Add to LinkedIn</button></div></div></div></div>
);

const StatusBadge = ({ status }: any) => {
  const config: any = {
    completed: { icon: <CheckCircle2 className="w-3 h-3" />, class: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600', label: 'Certified' },
    in_progress: { icon: <Clock className="w-3 h-3" />, class: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600', label: 'In Training' },
    not_started: { icon: <Lock className="w-3 h-3" />, class: 'bg-slate-50 dark:bg-slate-800 text-slate-500', label: 'Available' }
  };
  const s = config[status] || config['not_started'];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${s.class}`}>
      {s.icon}
      {s.label}
    </span>
  );
};

const LevelDots = ({ levels }: { levels: { easy: string; medium: string; hard: string } }) => {
  const getDotColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-500 shadow-emerald-500/50';
      case 'available':
      case 'in_progress': return 'bg-blue-500 shadow-blue-500/50 animate-pulse';
      default: return 'bg-slate-200 dark:bg-slate-800';
    }
  };

  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-2 h-2 rounded-full shadow-sm ${getDotColor(levels.easy)}`} title="Easy Level" />
      <div className={`w-2 h-2 rounded-full shadow-sm ${getDotColor(levels.medium)}`} title="Medium Level" />
      <div className={`w-2 h-2 rounded-full shadow-sm ${getDotColor(levels.hard)}`} title="Hard Level" />
    </div>
  );
};

const ActionButton = ({ status, onClick, compact, className = '' }: any) => {
  const base = `inline-flex items-center justify-center gap-2 font-black rounded-xl transition-all active:scale-95 ${compact ? 'px-4 py-2 text-[10px]' : 'px-6 py-2.5 text-sm'} ${className}`;
  if (status === 'completed') return <button onClick={onClick} className={`${base} bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700`}>Review</button>;
  if (status === 'in_progress') return <button onClick={onClick} className={`${base} bg-blue-50 dark:bg-blue-900/20 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/40`}>Resume</button>;
  return <button onClick={onClick} className={`${base} bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20`}>Start</button>;
};
