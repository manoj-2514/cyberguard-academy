import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { Shield, ShieldAlert, ShieldCheck, AlertTriangle, Loader2, Globe, LayoutTemplate, Send, CheckCircle, Code, Search, Info, Monitor } from 'lucide-react';

interface RedFlag {
  label: string;
  explanation: string;
  legitimate_version: string;
}

interface FakePageIndicators {
  visual_cloning: string;
  form_action_analysis: string;
  brand_impersonation: string;
  ssl_misuse: string;
}

interface AnalyzeWebpageResponse {
  threat_level: 'SAFE' | 'SUSPICIOUS' | 'DANGEROUS';
  verdict: string;
  attack_type: string;
  impersonation_target: string;
  fake_page_indicators: FakePageIndicators;
  confidence_score: number;
  red_flags: RedFlag[];
  what_to_do: string[];
}

const FakeWebsiteDetector: React.FC = () => {
  const [mode, setMode] = useState<'url' | 'html'>('url');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<AnalyzeWebpageResponse | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanContent = content.trim();
    if (!cleanContent) {
      setError(mode === 'url' ? 'URL is required.' : 'HTML source is required.');
      return;
    }
    
    if (mode === 'url' && !cleanContent.includes('.')) {
      setError('Please enter a valid website URL.');
      return;
    }

    if (mode === 'html' && !cleanContent.includes('<')) {
      setError('Please paste valid HTML source code (must contain at least one tag).');
      return;
    }

    setError('');
    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/simulator/analyze-webpage`, { 
        mode,
        content: cleanContent 
      });
      setResult(response.data);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.detail || 'Failed to analyze webpage.');
    } finally {
      setLoading(false);
    }
  };

  const renderConfidenceBar = (score: number) => {
    let colorClass = 'bg-emerald-500';
    if (score >= 40 && score <= 70) colorClass = 'bg-amber-500';
    if (score > 70) colorClass = 'bg-rose-500';

    return (
      <div className="mt-2">
        <div className="flex justify-between text-xs font-bold mb-1">
          <span className="text-slate-500 uppercase tracking-widest">AI Certainty</span>
          <span className="text-slate-700">{score}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div className={`h-2.5 rounded-full transition-all duration-1000 ${colorClass}`} style={{ width: `${score}%` }}></div>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/40 border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
            <Monitor className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">Fake Website Detector</h3>
        </div>

        <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
          <button 
            onClick={() => { setMode('url'); setContent(''); setError(''); setResult(null); }}
            className={`flex-1 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${mode === 'url' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Analyze by URL
          </button>
          <button 
            onClick={() => { setMode('html'); setContent(''); setError(''); setResult(null); }}
            className={`flex-1 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${mode === 'html' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Analyze by HTML
          </button>
        </div>

        <form onSubmit={handleAnalyze} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500">
              {mode === 'url' ? 'Suspicious Website URL' : 'Page HTML Source'}
            </label>
            {mode === 'url' ? (
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="e.g. https://microsft-office-365.secure-auth.net"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-700"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <textarea 
                  placeholder="Paste the page's HTML source code here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={10}
                  className="w-full px-4 py-4 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-mono text-xs text-slate-700 resize-none"
                ></textarea>
                <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5 px-1">
                  <Info className="w-3 h-3" /> Right-click any webpage → View Page Source → Copy & paste here.
                </p>
              </div>
            )}
          </div>

          {error && (
            <div className="p-4 bg-rose-50 text-rose-600 rounded-xl text-sm font-bold border border-rose-100 flex items-center gap-3">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 rounded-xl text-white font-black bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-600/20 disabled:opacity-70"
          >
            {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Deep Scanning Page...</> : <><Search className="w-5 h-5" /> Analyze Webpage</>}
          </button>
        </form>
      </div>

      <div className="h-full relative">
        {!result && !loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 text-center p-8 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
            <LayoutTemplate className="w-16 h-16 mb-4 text-slate-300" />
            <h4 className="text-lg font-black text-slate-600 mb-2">Cloning Detection</h4>
            <p className="text-sm font-medium">Attackers clone official login pages to steal credentials. The AI scans for visual cloning, brand misuse, and suspicious form destinations.</p>
          </div>
        )}

        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-white rounded-3xl border border-slate-100 shadow-xl">
            <div className="w-16 h-16 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin mb-6"></div>
            <h4 className="text-lg font-black text-slate-900 mb-2">Analyzing Brand Assets...</h4>
            <p className="text-slate-500 text-sm font-medium animate-pulse">Checking form action destinations and SSL validity.</p>
          </div>
        )}

        {result && !loading && (
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/40 border border-slate-100 animate-slide-up">
            <div className={`p-6 md:p-8 border-b-2 flex flex-col sm:flex-row sm:items-center gap-6 ${result.threat_level === 'SAFE' ? 'text-emerald-600 bg-emerald-50 border-emerald-200' : result.threat_level === 'SUSPICIOUS' ? 'text-amber-600 bg-amber-50 border-amber-200' : 'text-rose-600 bg-rose-50 border-rose-200'}`}>
              <div className="shrink-0 bg-white p-3 rounded-2xl shadow-sm">
                {result.threat_level === 'SAFE' ? <ShieldCheck className="w-8 h-8 text-emerald-600" /> : result.threat_level === 'SUSPICIOUS' ? <AlertTriangle className="w-8 h-8 text-amber-600" /> : <ShieldAlert className="w-8 h-8 text-rose-600" />}
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-70">Web Integrity Audit</div>
                <h2 className="text-3xl font-black tracking-tight mb-2">{result.threat_level}</h2>
                <p className="font-bold opacity-90 leading-tight">{result.verdict}</p>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-8">
              {/* Fake Page Indicators */}
              <div className="bg-slate-900 rounded-2xl p-6 text-white border border-slate-800">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-4 flex items-center gap-2">
                  <Monitor className="w-3 h-3" /> Impersonation Scan: <span className="text-white">{result.impersonation_target}</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Visual Cloning</span>
                    <p className="text-xs font-bold leading-relaxed">{result.fake_page_indicators.visual_cloning}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Form Destination</span>
                    <p className="text-xs font-bold leading-relaxed">{result.fake_page_indicators.form_action_analysis}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Brand signals</span>
                    <p className="text-xs font-bold leading-relaxed">{result.fake_page_indicators.brand_impersonation}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">SSL/HTTPS Status</span>
                    <p className="text-xs font-bold leading-relaxed">{result.fake_page_indicators.ssl_misuse}</p>
                  </div>
                </div>
              </div>

              {/* Confidence & Attack Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Methodology</h4>
                  <p className="text-sm font-bold text-slate-900">{result.attack_type}</p>
                </div>
                <div>{renderConfidenceBar(result.confidence_score)}</div>
              </div>

              {/* Red Flags */}
              {result.red_flags.length > 0 && (
                <div>
                  <h4 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-rose-500" /> Critical Red Flags</h4>
                  <div className="space-y-3">
                    {result.red_flags.map((flag, idx) => (
                      <div key={idx} className="border border-slate-200 rounded-xl p-4 shadow-sm bg-white">
                        <h5 className="font-bold text-slate-900 text-sm mb-1">{flag.label}</h5>
                        <p className="text-xs text-slate-600 mb-2">{flag.explanation}</p>
                        <div className="bg-emerald-50 rounded-lg p-2 border border-emerald-100 text-[10px]">
                          <span className="font-black text-emerald-700 uppercase">Real Page Pattern:</span> <span className="font-bold text-emerald-800">{flag.legitimate_version}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Plan */}
              <div>
                <h4 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2"><CheckCircle className="w-4 h-4 text-blue-600" /> Immediate Actions</h4>
                <div className="space-y-2">
                  {result.what_to_do.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-blue-50/50 p-3 rounded-xl border border-blue-100/30 text-sm font-bold text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] shrink-0">{idx + 1}</div>
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FakeWebsiteDetector;
