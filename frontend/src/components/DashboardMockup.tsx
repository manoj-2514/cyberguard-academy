import React from 'react';
import { 
  Mail, 
  AlertTriangle, 
  CheckCircle2, 
  Shield, 
  MousePointer2
} from 'lucide-react';

const DashboardMockup: React.FC = () => {
  return (
    <div className="w-full aspect-square md:aspect-video flex items-center justify-center p-8 relative overflow-hidden group/hero-visual">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>

      {/* 1. Main Simulation Card */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-[3rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] border border-slate-100 p-8 space-y-8 transform -rotate-2 hover:rotate-0 transition-transform duration-1000 group-hover/hero-visual:scale-[1.02]">
        
        {/* Card Header (Minimal) */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-50">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="space-y-1.5">
                <div className="h-3 w-32 bg-slate-100 rounded-full"></div>
                <div className="flex items-center gap-2">
                   <div className="h-2 w-48 bg-slate-50 rounded-full"></div>
                   <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></div>
                </div>
              </div>
           </div>
        </div>

        {/* Email Content Body */}
        <div className="space-y-6">
           <div className="p-8 bg-slate-50/50 rounded-[2rem] border border-slate-100 relative overflow-hidden group/email">
              {/* Highlight Overlay on Suspicious Element */}
              <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover/email:opacity-100 transition-opacity duration-500"></div>
              
              <div className="space-y-4 relative z-10">
                 <div className="h-2.5 w-full bg-slate-200/40 rounded-full"></div>
                 <div className="h-2.5 w-11/12 bg-slate-200/40 rounded-full"></div>
                 {/* The Suspicious Part */}
                 <div className="relative inline-block">
                    <div className="h-2.5 w-64 bg-blue-600/20 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.2)]"></div>
                    <div className="absolute -right-12 -top-6 animate-bounce">
                       <AlertTriangle className="w-6 h-6 text-amber-500" />
                    </div>
                 </div>
                 <div className="h-2.5 w-4/5 bg-slate-200/40 rounded-full"></div>
              </div>
           </div>

           {/* Interactive Button Simulation */}
           <div className="flex justify-center pt-4 relative">
              <div className="absolute -right-4 -bottom-4 animate-cursor-move pointer-events-none opacity-0 group-hover/hero-visual:opacity-100 transition-opacity">
                 <MousePointer2 className="w-8 h-8 text-slate-900 fill-white" />
              </div>
              <button className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-500/20 flex items-center gap-3 active:scale-95 transition-all">
                Report Phishing <CheckCircle2 className="w-5 h-5" />
              </button>
           </div>
        </div>
      </div>

      {/* 2. Floating AI Feedback Bubble */}
      <div className="absolute top-10 right-4 md:-right-12 z-20 max-w-[240px] bg-slate-900 text-white p-6 rounded-[2rem] shadow-2xl animate-float-slow opacity-0 group-hover/hero-visual:opacity-100 transition-all duration-700 delay-300 transform translate-y-4 group-hover/hero-visual:translate-y-0">
         <div className="flex items-center gap-3 mb-3">
            <Shield className="w-5 h-5 text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">AI Forensics</span>
         </div>
         <p className="text-xs font-medium leading-relaxed opacity-90 italic">
           "Notice the subtle misspelling in the domain name. This is a classic <span className="text-blue-400 font-bold">Typosquatting</span> attempt."
         </p>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes cursor-move {
          0% { transform: translate(100px, 100px); }
          100% { transform: translate(0, 0); }
        }
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
        .animate-cursor-move {
          animation: cursor-move 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default DashboardMockup;
