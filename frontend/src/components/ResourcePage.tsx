import React, { useState, useEffect, useRef, useMemo } from 'react';
import PageLayout from './PageLayout';
import { 
  ArrowLeft,
  Shield, 
  CheckCircle, 
  Zap, 
  PlayCircle,
  FileText,
  Target,
  Globe,
  Terminal,
  Lock,
  ChevronDown,
  ChevronUp,
  DownloadCloud,
} from 'lucide-react';
import { learningResources } from '../data/learning_resources';
import type { LevelContent } from '../data/learning_resources';
import { cyberguardDB } from '../utils/cyberguardDB';
import type { ViewType } from './Header';

interface ResourcePageProps {
  resourceId: string;
  onBack: () => void;
  onStartSimulation: (moduleId: string, level: 'easy' | 'medium' | 'hard') => void;
  onViewCaseStudy: (topic: string) => void;
  onNavigate: (view: ViewType, resourceId?: string) => void;
}

const ResourcePage: React.FC<ResourcePageProps> = ({ 
  resourceId, 
  onBack, 
  onStartSimulation
}) => {
  const resource = learningResources.find(r => r.id === resourceId);
  const moduleStats = useMemo(() => cyberguardDB.getModuleStats(resourceId), [resourceId]);
  
  // Determine current level to show (highest available or completed)
  const [currentLevel, setCurrentLevel] = useState<'easy' | 'medium' | 'hard'>(() => {
    if (moduleStats.levels.hard.status !== 'locked') return 'hard';
    if (moduleStats.levels.medium.status !== 'locked') return 'medium';
    return 'easy';
  });

  const [isCaseStudyExpanded, setIsCaseStudyExpanded] = useState(false);
  const [canStartAssessment, setCanStartAssessment] = useState(false);
  const lastSectionRef = useRef<HTMLDivElement>(null);

  const content = resource?.levels[currentLevel] as LevelContent;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCanStartAssessment(true);
        }
      },
      { threshold: 0.5 }
    );

    if (lastSectionRef.current) {
      observer.observe(lastSectionRef.current);
    }

    return () => observer.disconnect();
  }, [currentLevel]);

  if (!resource || !content) {
    return (
      <PageLayout centered maxWidth="sm">
        <div className="text-center">
          <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">Resource Not Found</h2>
          <button onClick={onBack} className="bg-blue-600 text-white px-8 py-4 rounded-xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">
            Return to Modules
          </button>
        </div>
      </PageLayout>
    );
  }

  const levelStatus = moduleStats.levels[currentLevel].status;

  return (
    <PageLayout maxWidth="xl" className="selection:bg-blue-100 animate-fade-in scroll-smooth">
      {/* 0. Level Progress Bar */}
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-white/80 backdrop-blur-xl border border-slate-200 px-8 py-3 rounded-full shadow-2xl flex items-center gap-6">
        {(['easy', 'medium', 'hard'] as const).map(lvl => {
          const status = moduleStats.levels[lvl].status;
          const isActive = currentLevel === lvl;
          return (
            <button 
              key={lvl}
              disabled={status === 'locked' && !isActive}
              onClick={() => setCurrentLevel(lvl)}
              className={`flex items-center gap-2 transition-all ${isActive ? 'scale-110' : 'opacity-60 hover:opacity-100'}`}
            >
              <div className={`w-3 h-3 rounded-full ${
                status === 'completed' ? 'bg-emerald-500' :
                isActive ? 'bg-blue-600 animate-pulse' :
                status === 'locked' ? 'bg-slate-300' : 'bg-slate-400'
              }`} />
              <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-blue-600' : 'text-slate-500'}`}>
                {lvl}
              </span>
            </button>
          );
        })}
      </div>

      {/* 1. Header & Back */}
      <div className="flex items-center justify-between mb-16 pt-12">
        <button onClick={onBack} className="p-4 rounded-2xl hover:bg-white transition-all group border border-slate-100 bg-white shadow-sm active:scale-95">
          <ArrowLeft className="w-6 h-6 text-slate-900 group-hover:-translate-x-1 transition-transform" />
        </button>
        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
          <span>Academy</span>
          <span className="text-slate-200">/</span>
          <span className="text-blue-600">{resource.name}</span>
          <span className="text-slate-200">/</span>
          <span className="text-slate-900">{currentLevel}</span>
        </div>
      </div>

      {/* 2. Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-32 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-10 border border-blue-100">
            <Shield className="w-3 h-3" /> Topic Mastery: {currentLevel}
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-10 tracking-tight leading-[0.95]">
            {content.title}
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium mb-12 max-w-2xl">
            {content.description}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-rose-50 p-6 rounded-3xl border border-rose-100/50">
              <h4 className="text-rose-900 font-black text-[10px] uppercase tracking-widest mb-3">{content.threatLevel}</h4>
              <p className="text-rose-800 text-xs font-bold leading-snug">{content.threatDescription}</p>
            </div>
            <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100/50">
              <h4 className="text-emerald-900 font-black text-[10px] uppercase tracking-widest mb-3">{content.defenseType}</h4>
              <p className="text-emerald-800 text-xs font-bold leading-snug">{content.defenseDescription}</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100/50">
              <h4 className="text-blue-900 font-black text-[10px] uppercase tracking-widest mb-3">{content.priority}</h4>
              <p className="text-blue-800 text-xs font-bold leading-snug">{content.priorityDescription}</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-blue-600/5 blur-[120px] rounded-full"></div>
          <div className="relative bg-slate-900 rounded-[4rem] p-16 text-white shadow-3xl border border-slate-800">
            <div className="flex items-center gap-6 mb-10">
              <div className="w-14 h-14 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/20">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-black tracking-tight">Mission Statement</h3>
            </div>
            <p className="text-2xl text-slate-300 leading-relaxed italic mb-12 font-medium">
              "{content.missionStatement}"
            </p>
            <div className="flex items-center gap-6 border-t border-slate-800 pt-10">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Validated by Global Security Boards</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Learning Objectives & Landscape */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32 items-stretch">
        <div className="bg-white rounded-[4rem] p-16 border border-slate-100 shadow-sm flex flex-col h-full">
          <h2 className="text-4xl font-black text-slate-900 mb-12 flex items-center gap-4 tracking-tight">
            <Target className="w-10 h-10 text-blue-600" /> Learning Objectives
          </h2>
          <div className="space-y-6 flex-1">
            {content.learningObjectives.map((obj, i) => (
              <div key={i} className="flex items-center gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-sm group hover:border-blue-200 transition-all">
                <div className="w-10 h-10 rounded-2xl bg-white text-blue-600 flex items-center justify-center font-black text-sm group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm border border-slate-100">0{i+1}</div>
                <p className="text-slate-700 font-bold text-lg">{obj}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-slate-950 rounded-[4rem] p-16 text-white relative overflow-hidden flex flex-col h-full shadow-3xl">
          <Globe className="absolute -bottom-20 -right-20 w-80 h-80 text-blue-500/10" />
          <h2 className="text-4xl font-black mb-12 flex items-center gap-4 tracking-tight relative z-10">
            <Globe className="w-10 h-10 text-blue-400" /> Global Landscape
          </h2>
          <div className="space-y-8 relative z-10 flex-1">
            <div className="p-10 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
              <p className="text-blue-400 font-black text-[10px] uppercase tracking-widest mb-4">Financial Impact</p>
              <p className="text-2xl text-slate-300 font-black tracking-tight leading-tight">{content.financialImpact}</p>
            </div>
            <div className="p-10 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
              <p className="text-rose-400 font-black text-[10px] uppercase tracking-widest mb-4">Complexity Index</p>
              <p className="text-2xl text-slate-300 font-black tracking-tight leading-tight">{content.complexityIndex}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Real-World Case Study */}
      <section className="mb-32">
        <div className="bg-white rounded-[5rem] p-16 md:p-20 border border-slate-100 shadow-sm">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-6 mb-10">
              <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-xl">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-3xl tracking-tight">Technical Post-Mortem</h4>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Global Impact Analysis</p>
              </div>
            </div>
            <p className="text-slate-600 text-3xl leading-relaxed mb-12 font-black italic">
              "{content.caseStudy.incident}"
            </p>
            <button 
              onClick={() => setIsCaseStudyExpanded(!isCaseStudyExpanded)}
              className="group flex items-center gap-4 bg-slate-100 px-8 py-4 rounded-2xl font-black text-slate-900 hover:bg-blue-600 hover:text-white transition-all shadow-sm mb-8"
            >
              {isCaseStudyExpanded ? 'Hide Analysis' : 'Analyze Case Study'}
              {isCaseStudyExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>

            {isCaseStudyExpanded && (
              <div className="animate-slide-down space-y-12 pt-8 border-t border-slate-100">
                <div>
                  <h5 className="text-xl font-black mb-6 text-slate-900 uppercase tracking-tight">In-Depth Breakdown</h5>
                  <p className="text-slate-600 text-lg leading-relaxed font-medium">{content.caseStudy.analysis}</p>
                </div>
                <div>
                  <h5 className="text-xl font-black mb-8 text-slate-900 uppercase tracking-tight">End-to-End Flowchart</h5>
                  <div className="space-y-4">
                    {content.caseStudy.flowchart.map((step, i) => (
                      <div key={i} className="flex items-center gap-6">
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 font-black text-xs">{i+1}</div>
                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex-1 font-bold text-slate-700">{step}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-emerald-50 p-10 rounded-[3rem] border border-emerald-100">
                  <h5 className="text-xl font-black mb-6 text-emerald-900 uppercase tracking-tight">Strategic Prevention</h5>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {content.caseStudy.prevention.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-emerald-800 font-bold">
                        <CheckCircle className="w-5 h-5 text-emerald-600" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. Key Concepts */}
      <section className="mb-32">
        <div className="bg-blue-600 rounded-[5rem] p-16 md:p-24 text-white relative overflow-hidden shadow-3xl">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,#1e40af_0%,transparent_50%)]"></div>
          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-black mb-16 tracking-tight leading-none">Deep Dive:<br />Key Concepts.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {content.concepts.map((concept, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-xl p-10 rounded-[3rem] border border-white/20 hover:bg-white/20 transition-all">
                  <div className="text-blue-300 font-black text-[10px] uppercase tracking-widest mb-6">Concept 0{i+1}</div>
                  <h4 className="text-2xl font-black mb-4 tracking-tight">{concept.name}</h4>
                  <p className="text-blue-100 font-medium leading-relaxed text-sm">{concept.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Attack Lifecycle */}
      <section className="mb-32">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">Attack Lifecycle.</h2>
          <p className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Step-by-step anatomical breakdown</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-6">
          {content.attackLifecycle.map((step, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col h-full">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-lg mb-6 group-hover:bg-blue-600 transition-colors shadow-xl">
                {step.step}
              </div>
              <h5 className="text-slate-900 font-black mb-3 uppercase text-xs tracking-tight">{step.action}</h5>
              <p className="text-slate-500 font-bold text-xs leading-relaxed">{step.explanation}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Technical Intelligence */}
      <section className="mb-32 bg-slate-950 rounded-[5rem] p-16 md:p-20 text-white relative overflow-hidden shadow-3xl">
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row gap-24 items-start">
            <div className="flex-1 text-left">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-10 border border-blue-500/20">
                <Terminal className="w-3 h-3" /> Technical Intelligence
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-10 tracking-tight leading-[0.95]">Scenario Analysis.</h2>
              <div className="bg-black/80 rounded-[2.5rem] p-10 border border-white/10 font-mono text-sm leading-relaxed text-emerald-400 shadow-2xl overflow-x-auto">
                <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="ml-4 text-slate-600 font-black uppercase tracking-widest text-[10px]">threat_analysis.log</span>
                </div>
                <pre className="whitespace-pre-wrap">{content.technicalIntelligence.scenario}</pre>
              </div>
            </div>
            <div className="w-full lg:w-96 bg-white/5 backdrop-blur-2xl p-12 rounded-[4rem] border border-white/10 shadow-3xl">
              <h4 className="text-2xl font-black mb-10 tracking-tight">Core Metrics</h4>
              <div className="space-y-8">
                {content.technicalIntelligence.metrics.map((m, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-white/5 pb-6">
                    <span className="text-slate-500 font-black uppercase text-[10px] tracking-widest">{m.label}</span>
                    <span className="font-black text-blue-500 text-lg">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Tools & Checklists */}
      <section className="mb-32" ref={lastSectionRef}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-emerald-600 rounded-[4rem] p-12 text-white shadow-3xl flex flex-col h-full">
            <h4 className="text-2xl font-black mb-10 flex items-center gap-3 tracking-tight"><CheckCircle className="w-8 h-8" /> Detection.</h4>
            <ul className="space-y-6 flex-1">
              {content.checklists.detection.map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-sm font-black leading-tight">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-inner">✓</div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-900 rounded-[4rem] p-12 text-white shadow-3xl flex flex-col h-full">
            <h4 className="text-2xl font-black mb-10 flex items-center gap-3 tracking-tight"><Lock className="w-8 h-8" /> Mitigation (SOP).</h4>
            <div className="bg-black/40 p-8 rounded-3xl border border-white/10 font-mono text-[11px] text-blue-400 mb-8 flex-1">
              <pre className="whitespace-pre-wrap">{content.terminalScript}</pre>
            </div>
            <ul className="space-y-4">
              {content.checklists.mitigation.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-xs font-bold text-slate-400">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-[4rem] p-12 border border-slate-200 shadow-sm flex flex-col justify-between h-full group hover:shadow-2xl transition-all">
            <div>
              <h4 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">Manual Guide.</h4>
              <p className="text-slate-500 font-medium mb-12 text-lg leading-relaxed">Download the physical technical reference and checklist for your team.</p>
            </div>
            <button className="w-full bg-slate-950 text-white py-6 rounded-2xl font-black text-xl hover:bg-blue-600 transition-all flex items-center justify-center gap-4 active:scale-95">
              <DownloadCloud className="w-6 h-6" /> Download PDF
            </button>
          </div>
        </div>
      </section>

      {/* 9. Previous Level Review & Start Assessment */}
      <div className="bg-blue-600 rounded-[5rem] p-16 md:p-24 text-center text-white relative overflow-hidden shadow-3xl mb-12">
        <div className="relative z-10 max-w-5xl mx-auto">
          {currentLevel !== 'easy' && (
            <button 
              onClick={() => setCurrentLevel(currentLevel === 'hard' ? 'medium' : 'easy')}
              className="text-blue-200 font-black uppercase tracking-widest text-xs mb-8 hover:text-white transition-colors block mx-auto"
            >
              ← Review {currentLevel === 'hard' ? 'Medium' : 'Easy'} Resources
            </button>
          )}
          
          <p className="text-blue-100 font-black uppercase tracking-[0.2em] text-[10px] mb-6">
            {canStartAssessment ? 'You have read the resources' : 'Scroll to the bottom to unlock the assessment'}
          </p>
          
          <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter leading-[0.9]">
            {levelStatus === 'completed' ? 'Retake' : 'Start'} <br /> {currentLevel} Assessment.
          </h2>
          
          <button 
            disabled={!canStartAssessment}
            onClick={() => onStartSimulation(resourceId, currentLevel)}
            className={`px-16 py-8 rounded-[3rem] text-3xl font-black transition-all shadow-3xl active:scale-95 flex items-center justify-center gap-6 mx-auto ${
              canStartAssessment 
                ? 'bg-white text-blue-600 hover:bg-slate-50' 
                : 'bg-white/20 text-white/40 cursor-not-allowed grayscale'
            }`}
          >
            Launch Level {currentLevel.toUpperCase()} <PlayCircle className="w-10 h-10" />
          </button>
          
          <p className="mt-16 text-blue-100 font-black uppercase tracking-[0.3em] text-[10px] opacity-80">
            Threshold: {currentLevel === 'easy' ? '60%' : currentLevel === 'medium' ? '70%' : '80%'} to Pass • 7 Questions
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default ResourcePage;
