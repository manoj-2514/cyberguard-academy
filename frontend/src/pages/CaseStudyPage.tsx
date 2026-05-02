import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ShieldAlert, Activity, FileText, Target, AlertTriangle, BookOpen, ArrowLeft } from 'lucide-react';

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

import { API_BASE_URL as API_BASE } from '../config';

const CaseStudyPage: React.FC = () => {
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get topic from URL: /case-study/TopicName
  const pathParts = window.location.pathname.split('/');
  const topic = decodeURIComponent(pathParts[pathParts.length - 1]);

  useEffect(() => {
    const fetchCaseStudy = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE}/case-study/${topic}`);
        setCaseStudy(response.data);
      } catch (err) {
        console.error('Failed to fetch case study:', err);
        setError('Could not load forensic data for this incident.');
      } finally {
        setLoading(false);
      }
    };

    if (topic) fetchCaseStudy();
  }, [topic]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-black animate-pulse text-xl">Accessing Forensic Vault...</p>
      </div>
    );
  }

  if (error || !caseStudy) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-10 text-center">
        <AlertTriangle className="w-20 h-20 text-rose-500 mb-6" />
        <h1 className="text-3xl font-black text-slate-900 mb-4">Access Denied</h1>
        <p className="text-slate-500 text-lg max-w-md">{error || 'Intelligence dossier not found.'}</p>
        <button 
          onClick={() => window.close()}
          className="mt-10 px-8 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all"
        >
          Close Vault
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Premium Header */}
      <div className="bg-slate-900 text-white py-16 sm:py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600 opacity-10 rounded-full -translate-y-1/2 translate-x-1/4 blur-[120px]"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <button 
            onClick={() => window.close()}
            className="flex items-center gap-2 text-blue-400 font-bold mb-10 hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> Return to Academy
          </button>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/20">
              <ShieldAlert className="w-8 h-8 text-white" />
            </div>
            <span className="px-5 py-2 bg-blue-500/20 text-blue-300 text-xs font-black uppercase tracking-[0.3em] rounded-full border border-blue-500/30">
              Classified Intelligence Report
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-black mb-8 leading-tight tracking-tight">
            {caseStudy.title}
          </h1>
          
          <div className="flex flex-wrap gap-10">
            <div>
              <p className="text-slate-500 font-black uppercase tracking-widest text-xs mb-2">Target Organization</p>
              <p className="text-2xl font-bold">{caseStudy.organization}</p>
            </div>
            <div>
              <p className="text-slate-500 font-black uppercase tracking-widest text-xs mb-2">Attack Methodology</p>
              <p className="text-2xl font-bold">{caseStudy.attack_type}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="max-w-5xl mx-auto px-6 -mt-12">
        <div className="bg-white rounded-[48px] shadow-2xl p-10 sm:p-16 space-y-20">
          {/* Narrative */}
          <section>
            <h3 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-4">
              <FileText className="w-9 h-9 text-indigo-500" /> Operational Narrative
            </h3>
            <p className="text-slate-600 leading-relaxed text-xl font-medium whitespace-pre-line border-l-4 border-indigo-100 pl-8">
              {caseStudy.what_happened}
            </p>
          </section>

          {/* Attack Chain */}
          <section className="bg-slate-900 rounded-[40px] p-10 sm:p-16 text-white shadow-2xl relative overflow-hidden">
             <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 opacity-10 rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px]"></div>
             <h3 className="text-3xl font-black mb-12 flex items-center gap-4">
               <Activity className="w-9 h-9 text-blue-400" /> Forensic Attack Chain
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {caseStudy.attack_flow.map((step, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                    <span className="text-5xl font-black text-blue-500/30 block mb-6">0{idx + 1}</span>
                    <p className="text-xl font-bold leading-snug">{step}</p>
                  </div>
                ))}
             </div>
          </section>

          {/* Critical Failures */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
             <div className="bg-rose-50 p-10 rounded-[40px] border border-rose-100">
                <h3 className="text-2xl font-black text-rose-900 mb-6 flex items-center gap-4">
                  <AlertTriangle className="w-8 h-8 text-rose-600" /> Impact Analysis
                </h3>
                <p className="text-rose-800 text-xl font-bold leading-relaxed">{caseStudy.impact}</p>
             </div>
             <div className="bg-amber-50 p-10 rounded-[40px] border border-amber-100">
                <h3 className="text-2xl font-black text-amber-900 mb-6 flex items-center gap-4">
                  <Target className="w-8 h-8 text-amber-600" /> The Security Gap
                </h3>
                <p className="text-amber-800 text-xl font-bold leading-relaxed">{caseStudy.key_mistake}</p>
             </div>
          </div>

          {/* Strategic Takeaway */}
          <section className="bg-blue-600 rounded-[40px] p-12 sm:p-16 text-white shadow-2xl shadow-blue-200 text-center">
            <BookOpen className="w-16 h-16 text-blue-200 mx-auto mb-10 opacity-50" />
            <h3 className="text-3xl font-black mb-8">Strategic Lesson Learned</h3>
            <p className="text-2xl sm:text-4xl font-black italic leading-tight max-w-4xl mx-auto">
              "{caseStudy.lessons_learned}"
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyPage;
