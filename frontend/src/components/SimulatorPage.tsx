import React, { useState } from 'react';
import { Mail, Link as LinkIcon, MessageSquare, Key, ArrowRight, QrCode, Globe } from 'lucide-react';
import PhishingDetector from './PhishingDetector';
import MaliciousURLAnalyzer from './MaliciousURLAnalyzer';
import SocialEngineeringAnalyzer from './SocialEngineeringAnalyzer';
import PasswordStrengthAnalyzer from './PasswordStrengthAnalyzer';
import QRCodeAnalyzer from './QRCodeAnalyzer';
import FakeWebsiteDetector from './FakeWebsiteDetector';

export type SimulatorType = 'phishing' | 'url' | 'social' | 'password' | 'qr' | 'website';

const SimulatorPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SimulatorType>('phishing');

  const tabs = [
    { id: 'phishing', label: 'Phishing Email Detector', icon: <Mail className="w-4 h-4" /> },
    { id: 'url', label: 'Malicious URL Analyzer', icon: <LinkIcon className="w-4 h-4" /> },
    { id: 'social', label: 'Social Engineering Chat', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'password', label: 'Password Strength AI', icon: <Key className="w-4 h-4" /> },
    { id: 'qr', label: 'QR Code Analyzer', icon: <QrCode className="w-4 h-4" /> },
    { id: 'website', label: 'Fake Website Detector', icon: <Globe className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="section-container relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">Test Your Instincts. <span className="text-blue-500">Live.</span></h1>
          <p className="text-lg md:text-xl font-medium text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Pick a threat type and see if you can outsmart real-world cyberattacks — powered by AI.
          </p>
        </div>
      </div>

      <div className="section-container -mt-8 relative z-20">
        {/* Module Selector */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-2 flex flex-wrap md:flex-nowrap gap-2 overflow-x-auto mb-10 hide-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SimulatorType)}
              className={`flex-1 min-w-[200px] flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Simulator Content */}
        <div className="animate-fade-in">
          {activeTab === 'phishing' && <PhishingDetector />}
          {activeTab === 'url' && <MaliciousURLAnalyzer />}
          {activeTab === 'social' && <SocialEngineeringAnalyzer />}
          {activeTab === 'password' && <PasswordStrengthAnalyzer />}
          {activeTab === 'qr' && <QRCodeAnalyzer />}
          {activeTab === 'website' && <FakeWebsiteDetector />}
          
          {/* Fallback for unhandled tabs */}
          {!['phishing', 'url', 'social', 'password', 'qr', 'website'].includes(activeTab) && (
            <div className="bg-white rounded-3xl p-12 text-center shadow-xl shadow-slate-200/40 border border-slate-100 max-w-2xl mx-auto mt-12">
              <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                {tabs.find(t => t.id === activeTab)?.icon}
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-3">Coming Soon</h3>
              <p className="text-slate-500 font-medium leading-relaxed mb-8">
                This simulator module is currently locked. Finish the associated training module in CyberGuard Academy to unlock this interactive experience.
              </p>
              <button 
                onClick={() => window.location.href = '/'}
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-blue-600 transition-colors"
              >
                Go to Training Modules <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimulatorPage;
