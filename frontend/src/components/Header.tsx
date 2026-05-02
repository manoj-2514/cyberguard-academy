import React, { useState } from 'react';
import { Shield, User, LogOut, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { scrollToSection } from '../utils/scrollTo';

export type ViewType = 'landing' | 'modules' | 'simulator' | 'about' | 'leaderboard' | 'dashboard' | 'learning' | 'resource' | 'login' | 'signup' | 'simulation';

interface HeaderProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const { token, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleProfileSettings = () => {
    setDropdownOpen(false);
    if (currentView === 'dashboard') {
      scrollToSection('platform-settings');
    } else {
      onNavigate('dashboard');
      setTimeout(() => {
        scrollToSection('platform-settings');
      }, 300);
    }
  };

  const handleMyCertificates = () => {
    setDropdownOpen(false);
    if (currentView === 'dashboard') {
      scrollToSection('achievement-certificates');
    } else {
      onNavigate('dashboard');
      setTimeout(() => {
        scrollToSection('achievement-certificates');
      }, 300);
    }
  };

  const navItems: { label: string; view: ViewType; public?: boolean }[] = [
    { label: 'Home', view: 'landing', public: true },
    { label: 'Simulator', view: 'simulator', public: true },
    { label: 'Modules', view: 'modules' },
    { label: 'Leaderboard', view: 'leaderboard', public: true },
    { label: 'About', view: 'about' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100/50">
      <div className="section-container">
        <div className="flex justify-between items-center h-20 md:h-24">
          <button 
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-3 hover:opacity-80 transition-all active:scale-95"
          >
            <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-500/20">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900">CyberGuard <span className="text-blue-600">Academy</span></span>
          </button>
          
          <div className="hidden lg:flex items-center gap-10 text-[13px] font-black uppercase tracking-widest text-slate-500">
            {/* Only show nav items if logged in, as they are protected routes */}
            {navItems.map((item) => {
              // Show if item is public OR if user is logged in
              if (!item.public && !token) return null;
              
              return (
                <button
                  key={item.view}
                  onClick={() => onNavigate(item.view)}
                  className={`relative py-1 transition-all hover:text-blue-600 ${
                    currentView === item.view ? 'text-blue-600' : ''
                  }`}
                >
                  {item.label}
                  {currentView === item.view && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            {token ? (
              <div 
                className="relative group"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button 
                  onClick={() => onNavigate('dashboard')}
                  className="flex items-center gap-3 p-1.5 pr-4 rounded-full border border-slate-200 hover:border-blue-200 hover:bg-blue-50 transition-all active:scale-95 bg-white shadow-sm hover:shadow"
                >
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="text-sm font-black text-slate-900 leading-tight">Student</p>
                    <p className="text-xs font-bold text-slate-500">My Account</p>
                  </div>
                </button>
                
                {/* Dropdown Menu */}
                <div className={`absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl border border-slate-100 shadow-xl transition-all transform origin-top-right ${dropdownOpen ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'}`}>
                  <div className="p-2 space-y-1">
                    <button 
                      onClick={() => { setDropdownOpen(false); onNavigate('dashboard'); }}
                      className="w-full text-left px-4 py-2.5 text-sm font-bold text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors flex items-center gap-3"
                    >
                      <User className="w-4 h-4" /> Dashboard
                    </button>
                    <button 
                      onClick={handleProfileSettings}
                      className="w-full text-left px-4 py-2.5 text-sm font-bold text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors flex items-center gap-3"
                    >
                      <Shield className="w-4 h-4" /> Profile Settings
                    </button>
                    <button 
                      onClick={handleMyCertificates}
                      className="w-full text-left px-4 py-2.5 text-sm font-bold text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors flex items-center gap-3"
                    >
                      <Award className="w-4 h-4" /> My Certificates
                    </button>
                    <div className="h-px bg-slate-100 my-2"></div>
                    <button 
                      onClick={() => { setDropdownOpen(false); logout(); onNavigate('landing'); }}
                      className="w-full text-left px-4 py-2.5 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors flex items-center gap-3"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => onNavigate('login')}
                  className="px-6 py-3 text-sm font-black uppercase tracking-widest text-slate-600 hover:text-blue-600 transition-all"
                >
                  Login
                </button>
                <button 
                  onClick={() => onNavigate('signup')}
                  className="bg-slate-900 text-white px-8 py-3.5 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl active:scale-95"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
