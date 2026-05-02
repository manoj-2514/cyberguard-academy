import React from 'react';
import { Shield, Globe, Users } from 'lucide-react';
import type { ViewType } from './Header';

interface FooterProps {
  onNavigate: (view: ViewType) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-32 pb-16">
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-16 mb-32">
          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-8">Product</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li><button onClick={() => onNavigate('modules')} className="hover:text-blue-500 transition-all">Simulations</button></li>
              <li><button onClick={() => onNavigate('modules')} className="hover:text-blue-500 transition-all">Learning Tracks</button></li>
              <li><button className="hover:text-blue-500 transition-all">AI Feedback</button></li>
              <li><button className="hover:text-blue-500 transition-all">For Enterprise</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-8">Company</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li><button onClick={() => onNavigate('about')} className="hover:text-blue-500 transition-all">About Us</button></li>
              <li><button className="hover:text-blue-500 transition-all">Careers</button></li>
              <li><button className="hover:text-blue-500 transition-all">Press</button></li>
              <li><button onClick={() => onNavigate('leaderboard')} className="hover:text-blue-500 transition-all">Leaderboard</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-8">Resources</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li><button className="hover:text-blue-500 transition-all">Blog</button></li>
              <li><button className="hover:text-blue-500 transition-all">Security Whitepapers</button></li>
              <li><button className="hover:text-blue-500 transition-all">DPDP Guide</button></li>
              <li><button className="hover:text-blue-500 transition-all">FAQ</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-8">Legal</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li><button className="hover:text-blue-500 transition-all">Privacy Policy</button></li>
              <li><button className="hover:text-blue-500 transition-all">Terms of Service</button></li>
              <li><button className="hover:text-blue-500 transition-all">Cookie Policy</button></li>
            </ul>
          </div>
        </div>

        <div className="pt-16 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black text-white tracking-tight">CyberGuard Academy</span>
          </div>
          <p className="text-slate-600 text-xs font-bold uppercase tracking-widest">© 2026 CyberGuard Academy. Engineered with precision.</p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-slate-600 hover:text-white transition-all"><Globe className="w-5 h-5" /></a>
            <a href="#" className="text-slate-600 hover:text-white transition-all"><Users className="w-5 h-5" /></a>
            <a href="#" className="text-slate-600 hover:text-white transition-all"><Shield className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
