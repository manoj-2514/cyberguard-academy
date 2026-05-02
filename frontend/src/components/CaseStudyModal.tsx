import React from 'react';
import { X, ShieldAlert, Activity, FileText, Target, AlertTriangle, BookOpen, ExternalLink } from 'lucide-react';

interface CaseStudy {
  title: string;
  organization: string;
  attack_type: string;
  what_happened: string;
  attack_flow: string[];
  impact: string;
  key_mistake: string;
  lessons_learned: string;
}

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseStudy: CaseStudy | null;
  loading: boolean;
  topic: string;
}

const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ isOpen, onClose, caseStudy, loading, topic }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 animate-in fade-in duration-300">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 block mb-1">
                Forensic Case Study
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                {loading ? 'Loading Intelligence...' : caseStudy?.title}
              </h2>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors group"
          >
            <X className="w-6 h-6 text-slate-400 group-hover:text-slate-900 transition-colors" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-12 custom-scrollbar">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-4">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-slate-500 font-bold animate-pulse">Analyzing attack vectors...</p>
            </div>
          ) : caseStudy ? (
            <>
              {/* Row 1: Quick Intel */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                    <Activity className="w-4 h-4" /> Victim Organization
                  </h3>
                  <p className="text-lg font-black text-slate-900">{caseStudy.organization}</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4" /> Attack Type
                  </h3>
                  <p className="text-lg font-black text-slate-900">{caseStudy.attack_type}</p>
                </div>
              </div>

              {/* Row 2: Narrative */}
              <section>
                <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <FileText className="w-7 h-7 text-indigo-500" /> What Happened
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg font-medium whitespace-pre-line">
                  {caseStudy.what_happened}
                </p>
              </section>

              {/* Row 3: Attack Flow */}
              <section className="bg-slate-900 rounded-[32px] p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                <h3 className="text-2xl font-black mb-10 flex items-center gap-3 relative z-10">
                  <Activity className="w-7 h-7 text-blue-400" /> Technical Attack Flow
                </h3>
                <div className="space-y-6 relative z-10">
                  {caseStudy.attack_flow.map((step, idx) => (
                    <div key={idx} className="flex gap-6 group">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-black text-sm group-hover:scale-110 transition-transform">
                          {idx + 1}
                        </div>
                        {idx !== caseStudy.attack_flow.length - 1 && (
                          <div className="w-0.5 h-12 bg-slate-700 mt-2"></div>
                        )}
                      </div>
                      <p className="text-slate-300 font-bold text-lg pt-0.5">{step}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Row 4: Impact & Mistake */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="bg-rose-50 p-8 rounded-[32px] border border-rose-100">
                   <h3 className="text-xl font-black text-rose-900 mb-4 flex items-center gap-3">
                     <AlertTriangle className="w-6 h-6 text-rose-600" /> Critical Impact
                   </h3>
                   <p className="text-rose-800 font-bold leading-relaxed">{caseStudy.impact}</p>
                </div>
                <div className="bg-amber-50 p-8 rounded-[32px] border border-amber-100">
                   <h3 className="text-xl font-black text-amber-900 mb-4 flex items-center gap-3">
                     <Target className="w-6 h-6 text-amber-600" /> The Key Mistake
                   </h3>
                   <p className="text-amber-800 font-bold leading-relaxed">{caseStudy.key_mistake}</p>
                </div>
              </div>

              {/* Row 5: Lessons Learned */}
              <section className="bg-blue-600 rounded-[32px] p-8 sm:p-10 text-white shadow-xl shadow-blue-100">
                <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                  <BookOpen className="w-7 h-7 text-blue-200" /> Lessons Learned
                </h3>
                <p className="text-blue-50 text-xl leading-relaxed font-black italic">
                  "{caseStudy.lessons_learned}"
                </p>
              </section>

              {/* Footer CTA */}
              <div className="pt-6 flex justify-center">
                <a 
                  href={`/case-study/${topic}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 font-black hover:underline group"
                >
                  View Full Forensic Page <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </>
          ) : (
            <div className="py-20 text-center text-slate-400 font-bold">
              Case study intelligence not available for this topic.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseStudyModal;
