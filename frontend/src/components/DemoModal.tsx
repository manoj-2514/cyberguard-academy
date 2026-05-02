import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Shield, 
  Mail, 
  AlertTriangle, 
  CheckCircle2, 
  Trophy, 
  ArrowRight
} from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTraining: () => void;
}

const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose, onStartTraining }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  useEffect(() => {
    if (isOpen) setStep(1);
  }, [isOpen]);

  if (!isOpen) return null;

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
    else onStartTraining();
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col items-center text-center space-y-12 animate-fade-in-up">
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-500/10 rounded-full blur-2xl animate-pulse"></div>
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/30 relative z-10">
                <Shield className="w-12 h-12 text-white" />
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-5xl font-black text-slate-900 leading-tight tracking-tight">
                Train for the <br />
                <span className="text-blue-600">Modern Threat.</span>
              </h2>
              <p className="text-xl text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
                Experience an immersive, AI-driven cybersecurity training platform designed for real retention.
              </p>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-10 animate-fade-in-up w-full max-w-3xl">
            <div className="text-center space-y-3">
              <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em]">IMMERSIVE SANDBOX</span>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">Realistic Simulation</h3>
              <p className="text-slate-500 font-medium text-lg">Spot malicious indicators in a safe, interactive environment.</p>
            </div>
            <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
              <div className="bg-slate-50/50 px-8 py-5 border-b border-slate-100 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Threat Lab v2.0</div>
              </div>
              <div className="p-10 space-y-8">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-2.5 w-40 bg-slate-100 rounded-full"></div>
                    <div className="h-2 w-64 bg-slate-50 rounded-full"></div>
                  </div>
                </div>
                <div className="p-8 bg-blue-50/30 rounded-3xl border border-blue-100/50 relative group">
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-slate-100 animate-bounce">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                  </div>
                  <div className="space-y-4">
                    <div className="h-3 w-full bg-slate-200/50 rounded-full"></div>
                    <div className="h-3 w-11/12 bg-slate-200/50 rounded-full"></div>
                    <div className="h-3 w-4/5 bg-blue-600/20 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.1)]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-10 animate-fade-in-up w-full max-w-3xl">
            <div className="text-center space-y-3">
              <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em]">CRITICAL CHOICE</span>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">Analyze & Respond</h3>
              <p className="text-slate-500 font-medium text-lg">Make the call. Your accuracy determines your score.</p>
            </div>
            <div className="grid grid-cols-1 gap-5">
              {[
                { label: 'A', text: 'Trust and Continue', active: false },
                { label: 'B', text: 'Report as Suspicious', active: true }
              ].map((opt, i) => (
                <div 
                  key={i} 
                  className={`p-7 rounded-[2rem] border-2 transition-all flex items-center justify-between ${
                    opt.active 
                      ? 'bg-blue-600 border-blue-600 text-white shadow-2xl shadow-blue-500/30 translate-x-2' 
                      : 'bg-white border-slate-100 text-slate-900 hover:border-blue-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-6">
                     <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${opt.active ? 'bg-white/20' : 'bg-slate-100'}`}>
                       {opt.label}
                     </div>
                     <span className="font-black text-lg tracking-tight">{opt.text}</span>
                  </div>
                  {opt.active && <CheckCircle2 className="w-6 h-6 text-white" />}
                </div>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-10 animate-fade-in-up w-full max-w-3xl">
            <div className="text-center space-y-3">
              <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em]">AI-DRIVEN FEEDBACK</span>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">Pedagogical Analysis</h3>
              <p className="text-slate-500 font-medium text-lg">Understand the 'why' with deep forensics.</p>
            </div>
            <div className="bg-white p-10 rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.08)] border border-slate-100 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-[100px] -mr-32 -mt-32"></div>
               <div className="relative z-10 space-y-8">
                 <div className="flex items-center gap-4">
                   <div className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest">Expert Insight</div>
                   <div className="h-px flex-1 bg-slate-100"></div>
                 </div>
                 <p className="text-slate-600 text-xl font-medium leading-relaxed italic">
                   "You correctly identified the character replacement in the URL. This is a common tactic to bypass visual inspection."
                 </p>
                 <div className="grid grid-cols-2 gap-6 pt-6">
                    <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                      <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">ACCURACY</div>
                      <div className="text-3xl font-black text-slate-900">+12%</div>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                      <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">SECURITY LVL</div>
                      <div className="text-3xl font-black text-slate-900">Elite</div>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="flex flex-col items-center text-center space-y-12 animate-fade-in-up">
            <div className="relative">
              <div className="absolute -inset-4 bg-emerald-500/10 rounded-full blur-2xl animate-pulse"></div>
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-500/30 relative z-10">
                <Trophy className="w-12 h-12 text-white" />
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-5xl font-black text-slate-900 leading-tight tracking-tight">
                Ready to Join <br />
                the <span className="text-blue-600">Frontline?</span>
              </h2>
              <p className="text-xl text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
                Your journey to becoming a cybersecurity expert starts now. Build your human firewall today.
              </p>
            </div>
            <button 
              onClick={onStartTraining}
              className="px-12 py-6 bg-blue-600 text-white rounded-[2rem] font-black text-xl hover:bg-blue-700 transition-all shadow-3xl shadow-blue-500/30 flex items-center gap-4 active:scale-95 group"
            >
              Get Started Free
              <ArrowRight className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-white/60 backdrop-blur-2xl animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl h-[85vh] sm:h-auto min-h-[600px] bg-white rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden border border-white flex flex-col animate-modal-entrance">
        
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-slate-50">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-1000 ease-out"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>

        {/* Header */}
        <div className="px-10 pt-10 pb-6 flex justify-between items-center relative z-20">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
               <Shield className="w-4 h-4 text-white" />
             </div>
             <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
               Product Tour • {step}/{totalSteps}
             </span>
          </div>
          <button 
            onClick={onClose}
            className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center hover:text-slate-900 hover:bg-slate-100 transition-all active:scale-90"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 px-10 pb-16 sm:px-24 sm:pb-24 flex items-center justify-center overflow-y-auto">
          <div className="w-full">
            {renderStep()}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="px-12 pb-12 flex items-center justify-between">
          <button 
            onClick={prevStep}
            disabled={step === 1}
            className={`flex items-center gap-3 font-black text-sm uppercase tracking-widest transition-all ${
              step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-400 hover:text-blue-600'
            }`}
          >
            <ChevronLeft className="w-5 h-5" /> Previous
          </button>
          
          <div className="hidden sm:flex gap-3">
            {[1, 2, 3, 4, 5].map((s) => (
              <div 
                key={s} 
                className={`w-2.5 h-2.5 rounded-full transition-all duration-700 ${
                  step === s ? 'w-10 bg-blue-600' : 'bg-slate-100'
                }`}
              ></div>
            ))}
          </div>

          <button 
            onClick={nextStep}
            className={`px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl active:scale-95 flex items-center gap-2 ${
              step === totalSteps ? 'opacity-0 pointer-events-none' : ''
            }`}
          >
            Next <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes modal-entrance {
          from { opacity: 0; transform: scale(0.9) translateY(40px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-modal-entrance {
          animation: modal-entrance 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default DemoModal;
