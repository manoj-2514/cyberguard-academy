import { useState, useEffect } from 'react';
import axios from 'axios';
import { ShieldCheck, ShieldAlert, Loader2 } from 'lucide-react';
import LearningCenter from './LearningCenter';
import CaseStudyModal from './components/CaseStudyModal';
import CaseStudyPage from './pages/CaseStudyPage';
import Header from './components/Header';
import type { ViewType } from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ModulesPage from './components/ModulesPage';
import SimulatorPage from './components/SimulatorPage';
import AboutPage from './components/AboutPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ResourcePage from './components/ResourcePage';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import DashboardPage from './components/DashboardPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';
import DemoModal from './components/DemoModal';
import ActiveSimulation from './components/ActiveSimulation';
import SimulationErrorBoundary from './components/SimulationErrorBoundary';

import { API_BASE_URL as API_BASE } from './config';

interface Question {
  id: string;
  question_text: string;
  options: Record<string, string>;
}

interface Scenario {
  id: string;
  sender_email: string;
  subject: string;
  email_body: string;
  phishing_url: string | null;
  difficulty: string;
  topic: string;
  question: Question;
}

interface ResultHistory {
  question_id: string;
  is_correct: boolean;
  selected_option: string;
  topic: string;
}

interface FinalResult {
  score: number;
  total_questions: number;
  weak_areas: string[];
  history: ResultHistory[];
}

function App() {
  const { loading: authLoading, token } = useAuth();
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<'easy' | 'medium' | 'hard'>('easy');
  
  const [finalResult, setFinalResult] = useState<FinalResult | null>(null);
  const [selectedResourceId, setSelectedResourceId] = useState<string | null>(null);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  // --- Case Study State ---
  const [isCaseStudyModalOpen, setIsCaseStudyModalOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<any | null>(null);
  const [caseStudyLoading, setCaseStudyLoading] = useState(false);
  const [activeCaseStudyTopic, setActiveCaseStudyTopic] = useState("");

  useEffect(() => {
    if (sessionId && scenario && currentView !== 'simulation') {
      setCurrentView('simulation');
    }
  }, [sessionId, scenario, currentView]);

  const isCaseStudyPage = window.location.pathname.startsWith('/case-study');

  const handleOpenCaseStudy = async (topic: string) => {
    setActiveCaseStudyTopic(topic);
    setIsCaseStudyModalOpen(true);
    setCaseStudyLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/case-study/${topic}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSelectedCaseStudy(response.data);
    } catch (err) {
      console.error('Failed to load case study:', err);
    } finally {
      setCaseStudyLoading(false);
    }
  };

  const handleNavigate = (view: ViewType, resourceId?: string) => {
    if (view === 'resource' && resourceId) {
      setSelectedResourceId(resourceId);
    }
    if (view !== 'dashboard' && currentView !== view) {
      setSessionId(null);
      setFinalResult(null);
      setScenario(null);
    }
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  // --- Assessment Logic ---
  const startAssessment = async (moduleId: string, level?: 'easy' | 'medium' | 'hard') => {
    const finalLevel = level || 'easy';
    setSelectedModule(moduleId);
    setSelectedLevel(finalLevel);
    setCurrentView('simulation');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  // --- RENDERING LOGIC ---
  let mainContent;

  if (finalResult) {
    mainContent = (
      <ProtectedRoute onRedirect={() => handleNavigate('login')}>
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 pt-24">
          <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
            <div className="flex justify-center mb-6">
              {finalResult.score >= 5 ? (
                <ShieldCheck className="w-20 h-20 text-emerald-500" />
              ) : (
                <ShieldAlert className="w-20 h-20 text-amber-500" />
              )}
            </div>
            <h1 className="text-3xl font-bold text-center mb-2">Assessment Complete</h1>
            <p className="text-center text-slate-500 mb-8">
              You scored {finalResult.score} out of {finalResult.total_questions}
            </p>
            <button
              onClick={() => handleNavigate('dashboard')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </ProtectedRoute>
    );
  } else if (isCaseStudyPage) {
    mainContent = <CaseStudyPage />;
  } else {
    switch (currentView) {
      case 'landing':
        mainContent = <HomePage onNavigate={handleNavigate} onWatchDemo={() => setIsDemoOpen(true)} />;
        break;
      case 'login':
        mainContent = <LoginPage onNavigate={handleNavigate} />;
        break;
      case 'signup':
        mainContent = <SignupPage onNavigate={handleNavigate} />;
        break;
      case 'modules':
        mainContent = (
          <ProtectedRoute onRedirect={() => handleNavigate('login')}>
            <ModulesPage onNavigate={handleNavigate} />
          </ProtectedRoute>
        );
        break;
      case 'simulator':
        mainContent = <SimulatorPage />;
        break;
      case 'about':
        mainContent = (
          <ProtectedRoute onRedirect={() => handleNavigate('login')}>
            <AboutPage />
          </ProtectedRoute>
        );
        break;
      case 'leaderboard':
        mainContent = <LeaderboardPage />;
        break;
      case 'dashboard':
        mainContent = (
          <ProtectedRoute onRedirect={() => handleNavigate('login')}>
            <DashboardPage onNavigate={handleNavigate} />
          </ProtectedRoute>
        );
        break;
      case 'resource':
        mainContent = selectedResourceId ? (
          <ProtectedRoute onRedirect={() => handleNavigate('login')}>
            <ResourcePage 
              resourceId={selectedResourceId} 
              onBack={() => handleNavigate('modules')} 
              onStartSimulation={startAssessment}
              onViewCaseStudy={handleOpenCaseStudy}
              onNavigate={handleNavigate}
            />
          </ProtectedRoute>
        ) : null;
        break;
      case 'learning':
        mainContent = (
          <ProtectedRoute onRedirect={() => handleNavigate('login')}>
            <LearningCenter onBack={() => handleNavigate('dashboard')} onViewCaseStudy={handleOpenCaseStudy} />
          </ProtectedRoute>
        );
        break;
      case 'simulation':
        mainContent = (
          <ProtectedRoute onRedirect={() => handleNavigate('login')}>
            <SimulationErrorBoundary onNavigate={handleNavigate}>
              <ActiveSimulation
                moduleId={selectedModule ? selectedModule.toLowerCase().replace(/\s+/g, '-') : 'email-analysis'}
                moduleName={selectedModule ? selectedModule.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Email Analysis'}
                level={selectedLevel}
                onExit={() => handleNavigate('modules')}
                onNavigate={handleNavigate}
                sessionId={sessionId || undefined}
              />
            </SimulationErrorBoundary>
          </ProtectedRoute>
        );
        break;
      default:
        mainContent = <HomePage onNavigate={handleNavigate} onWatchDemo={() => setIsDemoOpen(true)} />;
    }
  }

  const isSimulationActive = currentView === 'simulation' || !!sessionId;

  return (
    <>
      {!isSimulationActive && <Header currentView={currentView} onNavigate={handleNavigate} />}
      {mainContent}
      {!isSimulationActive && currentView !== 'login' && currentView !== 'signup' && <Footer onNavigate={handleNavigate} />}
      <CaseStudyModal 
        isOpen={isCaseStudyModalOpen}
        onClose={() => setIsCaseStudyModalOpen(false)}
        caseStudy={selectedCaseStudy}
        topic={activeCaseStudyTopic}
        loading={caseStudyLoading}
      />
      <DemoModal 
        isOpen={isDemoOpen} 
        onClose={() => setIsDemoOpen(false)} 
        onStartTraining={() => { setIsDemoOpen(false); handleNavigate('signup'); }} 
      />
    </>
  );
}

export default App;
