import React from 'react';
import PageLayout from './PageLayout';
import { 
  Mail, 
  AlertTriangle, 
  ShieldCheck, 
  Users, 
  FileWarning, 
  UserX, 
  Lock, 
  Wifi, 
  Smartphone, 
  Cloud, 
  Key, 
  AlertCircle, 
  PhoneCall, 
  Globe, 
  ChevronRight,
  ArrowRight,
  Fingerprint as FingerprintIcon,
  Search,
  Brain,
  Link,
  Briefcase
} from 'lucide-react';
import type { ViewType } from './Header';

interface ModulesPageProps {
  onNavigate: (view: ViewType, resourceId?: string) => void;
}

const ModulesPage: React.FC<ModulesPageProps> = ({ onNavigate }) => {
  const categories = [
    {
      title: "User Awareness",
      icon: <Mail className="w-6 h-6" />,
      colorClass: "bg-blue-600 shadow-blue-600/20",
      modules: [
        { id: 'phishing', name: 'Email Analysis', icon: Mail, description: 'Spot malicious emails and fake links.' },
        { id: 'password_security', name: 'Password Security', icon: ShieldCheck, description: 'Learn best practices for credentials.' },
        { id: 'social_engineering', name: 'Social Engineering', icon: Users, description: 'Defend against psychological manipulation.' },
        { id: 'safe_browsing', name: 'Safe Browsing', icon: Globe, description: 'Defend against web-based browser attacks.' },
        { id: 'digital_footprint', name: 'Digital Footprint', icon: Search, description: 'Manage your public OSINT exposure.' },
      ]
    },
    {
      title: "Network & Device",
      icon: <Wifi className="w-6 h-6" />,
      colorClass: "bg-emerald-600 shadow-emerald-600/20",
      modules: [
        { id: 'wifi_security', name: 'Wi-Fi Security', icon: Wifi, description: 'Navigate public and private networks safely.' },
        { id: 'device_security', name: 'Device Security', icon: Smartphone, description: 'Harden your mobile and desktop hardware.' },
        { id: 'cloud_security', name: 'Cloud Security', icon: Cloud, description: 'Protect data in SaaS and cloud platforms.' },
        { id: 'mfa_authentication', name: 'MFA & Authentication', icon: Key, description: 'Master multi-factor and account security.' },
        { id: 'url_analysis', name: 'URL Analysis', icon: Link, description: 'Analyze malicious links and domains.' },
        { id: 'mobile_security', name: 'Mobile Security', icon: Smartphone, description: 'Secure mobile apps and remote access.' },
      ]
    },
    {
      title: "Data & Compliance",
      icon: <Lock className="w-6 h-6" />,
      colorClass: "bg-amber-600 shadow-amber-600/20",
      modules: [
        { id: 'data_classification', name: 'Data Classification', icon: ShieldCheck, description: 'Label and protect sensitive information.' },
        { id: 'privacy_awareness', name: 'Privacy Awareness', icon: FingerprintIcon, description: 'Comply with DPDP Act and user rights.' },
        { id: 'incident_response', name: 'Incident Response', icon: AlertCircle, description: 'Master the NIST/SANS response lifecycle.' },
        { id: 'physical_security', name: 'Physical Security', icon: Lock, description: 'Secure your physical workspace and devices.' },
        { id: 'supply_chain', name: 'Supply Chain Risk', icon: Briefcase, description: 'Manage vendor and partner security risks.' },
      ]
    },
    {
      title: "Scenario Simulations",
      icon: <FileWarning className="w-6 h-6" />,
      colorClass: "bg-rose-600 shadow-rose-600/20",
      modules: [
        { id: 'malware_awareness', name: 'Malware Awareness', icon: AlertTriangle, description: 'Identify viruses and ransomware risks.' },
        { id: 'ransomware', name: 'Ransomware Scenarios', icon: FileWarning, description: 'Handle encryption attacks and recovery.' },
        { id: 'insider_threat', name: 'Insider Threat', icon: UserX, description: 'Identify risks from within the organization.' },
        { id: 'attack_calls', name: 'Simulated Attack Calls', icon: PhoneCall, description: 'Handle malicious vishing and fraud calls.' },
        { id: 'ai_deepfake', name: 'AI & Deepfake Risks', icon: Brain, description: 'Identify AI-generated voice and video fraud.' },
      ]
    }
  ];

  return (
    <PageLayout maxWidth="xl" className="animate-fade-in">
      <div className="max-w-3xl mb-24">
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-[0.95]">
          Explore the <br />
          <span className="text-blue-600">Curriculum.</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed">
          Over 20 specialized modules designed to transform your workforce into a proactive security asset. Choose a track to begin.
        </p>
      </div>

      <div className="space-y-32">
        {categories.map((cat, i) => (
          <section key={i} className="animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12 border-b border-slate-100 pb-8">
              <div className={`w-16 h-16 ${cat.colorClass} text-white rounded-2xl flex items-center justify-center shadow-2xl`}>
                {cat.icon}
              </div>
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">{cat.title}</h2>
                <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest">{cat.modules.length} Specialized Learning Units</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {cat.modules.map((m) => (
                <button 
                  key={m.id} 
                  onClick={() => onNavigate('resource', m.id)} 
                  className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-3xl hover:border-blue-400 transition-all text-left group flex flex-col h-full active:scale-95"
                >
                  <div className="w-14 h-14 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
                    <m.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight leading-tight">{m.name}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-1">{m.description}</p>
                  <div className="flex items-center text-blue-600 font-black text-sm group-hover:gap-3 transition-all">
                    View Module <ChevronRight className="w-5 h-5 ml-2" />
                  </div>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Final CTA */}
      <section className="mt-40 p-16 md:p-24 bg-slate-950 rounded-[4rem] text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.15)_0%,transparent_70%)] opacity-30"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-10 tracking-tight leading-[0.95]">Ready to Secure Your Team?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => onNavigate('simulator')}
              className="w-full sm:w-auto bg-blue-600 text-white px-12 py-6 rounded-[2.5rem] text-2xl font-black hover:bg-blue-700 transition-all shadow-3xl shadow-blue-900/40 active:scale-95 flex items-center justify-center gap-4"
            >
              Try Simulator <ArrowRight className="w-6 h-6" />
            </button>
            <button 
              onClick={() => onNavigate('leaderboard')}
              className="w-full sm:w-auto bg-slate-900 text-white border border-slate-800 px-12 py-6 rounded-[2.5rem] text-2xl font-black hover:bg-slate-800 transition-all flex items-center justify-center gap-4"
            >
              Book a Demo
            </button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ModulesPage;
