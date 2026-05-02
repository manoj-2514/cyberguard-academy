import React, { useState } from 'react';
import { BookOpen, ArrowLeft, Shield, AlertTriangle, Search, Lightbulb, CheckCircle, Brain, Zap, Target, HelpCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { learningResources } from './data/learning_resources';
import type { ResourceModule, ResourceTopic } from './data/learning_resources';

interface LearningCenterProps {
  onBack: () => void;
  onViewCaseStudy: (topic: string) => void;
}

const LearningCenter: React.FC<LearningCenterProps> = ({ onBack, onViewCaseStudy }) => {
  const [selectedModule, setSelectedModule] = useState<ResourceModule>(learningResources[0]);
// ... (rest of logic same)
  const [selectedTopic, setSelectedTopic] = useState<ResourceTopic>(learningResources[0].topics[0]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in duration-500 max-w-[1600px] mx-auto pb-20">
      {/* Sidebar Navigation */}
      <div className="w-full lg:w-80 shrink-0">
        <button
          onClick={onBack}
          className="w-full mb-6 flex items-center gap-2 px-6 py-4 rounded-2xl bg-white border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all shadow-sm group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
        </button>
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden sticky top-8">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" /> Training Modules
            </h2>
          </div>
          <div className="p-3 space-y-1">
            {learningResources.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setSelectedModule(m);
                  setSelectedTopic(m.topics[0]);
                }}
                className={`w-full text-left px-4 py-4 rounded-xl transition-all flex items-center justify-between group ${
                  selectedModule.id === m.id
                    ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-100'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>{m.name}</span>
                <div className={`w-2 h-2 rounded-full transition-all ${
                  selectedModule.id === m.id ? 'bg-white scale-125' : 'bg-slate-300 opacity-0 group-hover:opacity-100'
                }`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 space-y-8">
        {/* Topic Selector Tabs */}
        <div className="flex flex-wrap gap-2">
          {selectedModule.topics.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTopic(t)}
              className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all border-2 ${
                selectedTopic.id === t.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xl scale-105'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
              }`}
            >
              {t.title}
            </button>
          ))}
        </div>

        {/* Detailed Module Dossier */}
        <div className="bg-slate-50 rounded-[40px] border border-slate-200 shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-slate-900 p-10 lg:p-14 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 opacity-10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-4 py-1.5 bg-blue-500/20 text-blue-300 text-xs font-black uppercase tracking-[0.2em] rounded-full border border-blue-500/30">
                  Dossier: {selectedModule.name}
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-black mb-6 tracking-tight">{selectedTopic.title}</h1>
              <p className="text-slate-400 text-xl leading-relaxed max-w-4xl font-medium">
                {selectedTopic.concept}
              </p>
            </div>
          </div>

          <div className="p-8 lg:p-14 space-y-16 bg-white">
            {/* Row 1: The Threat & The Defense Summary */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
              <div className="xl:col-span-2 space-y-10">
                <section>
                  <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                    <AlertTriangle className="w-7 h-7 text-rose-500" /> 1. Why It's Dangerous
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {selectedTopic.risk}
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                    <Search className="w-7 h-7 text-indigo-500" /> 2. Scenario Breakdown
                  </h3>
                  <div className="bg-slate-900 rounded-3xl p-8 text-indigo-100 font-mono text-base leading-relaxed border-l-8 border-indigo-500 shadow-inner">
                    {selectedTopic.scenario}
                  </div>
                </section>
              </div>

              <div className="space-y-6">
                <div className="bg-blue-600 rounded-[32px] p-8 text-white shadow-xl shadow-blue-100 relative group overflow-hidden">
                   <Lightbulb className="absolute -bottom-4 -right-4 w-32 h-32 opacity-10 group-hover:rotate-12 transition-transform duration-500" />
                   <h4 className="text-lg font-black mb-4 flex items-center gap-2">
                     <Zap className="w-5 h-5 fill-white text-white" /> Pro Tip
                   </h4>
                   <p className="text-xl font-bold italic leading-tight relative z-10">
                     "{selectedTopic.proTip}"
                   </p>
                </div>
                <div className="bg-emerald-50 rounded-[32px] p-8 border border-emerald-100">
                   <h4 className="text-emerald-900 text-lg font-black mb-4 flex items-center gap-2">
                     <ShieldCheck className="w-5 h-5 text-emerald-600" /> Correct Action
                   </h4>
                   <p className="text-emerald-800 font-bold text-base leading-relaxed">
                     {selectedTopic.action}
                   </p>
                </div>
              </div>
            </div>

            {/* Row 2: Attack Anatomy (Technical Step-by-step) */}
            <section className="bg-slate-50 rounded-[40px] p-10 lg:p-14 border border-slate-200">
              <h3 className="text-3xl font-black text-slate-900 mb-10 text-center">
                3. Attack Anatomy: Step-by-Step Flow
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {selectedTopic.anatomy.map((step, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative pt-12">
                    <span className="absolute top-4 left-4 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-black text-sm">
                      {i + 1}
                    </span>
                    <p className="text-slate-600 text-sm font-bold leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Row 3: Human Factor & Psychology */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <section className="space-y-8">
                <div className="bg-purple-50 rounded-3xl p-10 border border-purple-100">
                  <h3 className="text-2xl font-black text-purple-900 mb-6 flex items-center gap-3">
                    <Brain className="w-7 h-7 text-purple-600" /> 4. Psychology of the Trap
                  </h3>
                  <p className="text-purple-800 leading-relaxed text-lg font-medium">
                    {selectedTopic.psychology}
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                    <Target className="w-7 h-7 text-amber-500" /> 5. Common Mistakes
                  </h3>
                  <ul className="space-y-4">
                    {selectedTopic.mistakes.map((m, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-600 font-bold bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <XCircle className="w-5 h-5 text-rose-500 shrink-0" /> {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="space-y-8">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                    <Shield className="w-7 h-7 text-emerald-500" /> 6. Red Flags & Evidence
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {selectedTopic.redFlags.map((flag, i) => (
                      <div key={i} className="flex items-start gap-4 bg-emerald-50 p-5 rounded-2xl border border-emerald-100">
                        <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-black text-emerald-900 block text-lg mb-1">{flag}</span>
                          <p className="text-emerald-700 text-sm font-medium">Specific indicator found in this scenario.</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-900 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                      <Zap className="w-16 h-16 text-rose-500" />
                   </div>
                   <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                     <ShieldCheck className="w-7 h-7 text-blue-400" /> 7. Detection Mindset
                   </h3>
                   <p className="text-slate-300 text-lg leading-relaxed font-bold italic">
                     "{selectedTopic.mindset}"
                   </p>
                </div>
              </section>
            </div>

            {/* Row 4: Damage Control & Correct Action */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 pt-16 border-t border-slate-100">
              <div className="bg-rose-50 rounded-[40px] p-10 border border-rose-100 shadow-xl shadow-rose-100/20">
                <h3 className="text-2xl font-black text-rose-900 mb-6 flex items-center gap-3">
                  <AlertTriangle className="w-7 h-7 text-rose-600 animate-pulse" /> 8. What If You Already Interacted?
                </h3>
                <p className="text-rose-800 text-lg font-bold leading-relaxed whitespace-pre-line">
                  {selectedTopic.interacted}
                </p>
              </div>

              <div className="bg-emerald-600 rounded-[40px] p-10 text-white shadow-2xl shadow-emerald-200 flex flex-col justify-center">
                <h3 className="text-3xl font-black mb-6 flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-white" /> 9. Correct Action
                </h3>
                <p className="text-emerald-50 text-xl leading-relaxed font-bold">
                  {selectedTopic.action}
                </p>
              </div>
            </div>

            {/* Row 5: Variations & Real World */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-16 border-t border-slate-100">
              <div>
                <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <HelpCircle className="w-7 h-7 text-blue-500" /> 8. Attack Variations
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedTopic.variations.map((v, i) => (
                    <span key={i} className="px-5 py-3 bg-slate-100 text-slate-700 font-bold rounded-2xl border border-slate-200">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 mb-6">9. Real-World Impact</h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  <span className="font-black text-slate-900">Case Study:</span> {selectedTopic.example}
                </p>
                <div className="mt-6 flex items-center gap-2 text-blue-600 font-bold hover:underline cursor-pointer group" onClick={() => onViewCaseStudy(selectedTopic.title)}>
                  Learn more about this incident <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper for X icon
const XCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default LearningCenter;
