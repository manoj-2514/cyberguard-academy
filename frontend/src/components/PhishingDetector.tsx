import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { Shield, ShieldAlert, ShieldCheck, AlertTriangle, Loader2, Mail, LayoutTemplate, Send, CheckCircle } from 'lucide-react';

interface RedFlag {
  label: string;
  explanation: string;
  legitimate_version: string;
}

interface AnalyzeEmailResponse {
  threat_level: 'SAFE' | 'SUSPICIOUS' | 'DANGEROUS';
  verdict: string;
  attack_type: string;
  attacker_intent: string;
  confidence_score: number;
  red_flags: RedFlag[];
  what_to_do: string[];
}

const PhishingDetector: React.FC = () => {
  const [sender, setSender] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<AnalyzeEmailResponse | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) {
      setError('Email body is required to perform an analysis.');
      return;
    }
    
    setError('');
    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/simulator/analyze-email`, {
        sender,
        subject,
        body
      });
      setResult(response.data);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.detail || 'Failed to analyze email. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'SAFE': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'SUSPICIOUS': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'DANGEROUS': return 'text-rose-600 bg-rose-50 border-rose-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getThreatIcon = (level: string) => {
    switch (level) {
      case 'SAFE': return <ShieldCheck className="w-8 h-8 text-emerald-600" />;
      case 'SUSPICIOUS': return <AlertTriangle className="w-8 h-8 text-amber-600" />;
      case 'DANGEROUS': return <ShieldAlert className="w-8 h-8 text-rose-600" />;
      default: return <Shield className="w-8 h-8 text-slate-600" />;
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
          <div 
            className={`h-2.5 rounded-full transition-all duration-1000 ${colorClass}`} 
            style={{ width: `${score}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Input Section */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/40 border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">Paste Suspicious Email</h3>
        </div>

        <form onSubmit={handleAnalyze} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500">From (Sender)</label>
            <input 
              type="text" 
              placeholder="e.g. security@paypal-support-update.com"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-700 placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500">Subject Line</label>
            <input 
              type="text" 
              placeholder="e.g. URGENT: Account Suspension Notice"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-700 placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500 flex justify-between">
              <span>Email Body <span className="text-rose-500">*</span></span>
              <span className="text-slate-400 font-medium normal-case tracking-normal">Required</span>
            </label>
            <textarea 
              placeholder="Paste the main content of the email here..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={8}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-700 placeholder:text-slate-400 resize-none"
            ></textarea>
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
            className="w-full py-4 rounded-xl text-white font-black bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-600/20 disabled:opacity-70 disabled:active:scale-100"
          >
            {loading ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Analyzing Threat...</>
            ) : (
              <><Send className="w-5 h-5" /> Analyze This Email</>
            )}
          </button>
        </form>
      </div>

      {/* Output Section */}
      <div className="h-full relative">
        {!result && !loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 text-center p-8 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
            <LayoutTemplate className="w-16 h-16 mb-4 text-slate-300" />
            <h4 className="text-lg font-black text-slate-600 mb-2">Awaiting Input</h4>
            <p className="text-sm font-medium">Paste an email on the left and click analyze. The AI will tear it apart and show you what it finds.</p>
          </div>
        )}

        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-white rounded-3xl border border-slate-100 shadow-xl">
            <div className="relative mb-6">
              <div className="w-16 h-16 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin"></div>
              <Shield className="w-6 h-6 text-blue-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <h4 className="text-lg font-black text-slate-900 mb-2">Executing Live Threat Analysis...</h4>
            <p className="text-slate-500 text-sm font-medium animate-pulse">Running semantic checks, domain validation, and behavioral analysis.</p>
          </div>
        )}

        {result && !loading && (
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/40 border border-slate-100 animate-slide-up">
            {/* Header / Verdict */}
            <div className={`p-6 md:p-8 border-b-2 flex flex-col sm:flex-row sm:items-center gap-6 ${getThreatColor(result.threat_level)}`}>
              <div className="shrink-0 bg-white p-3 rounded-2xl shadow-sm">
                {getThreatIcon(result.threat_level)}
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-70">Threat Level</div>
                <h2 className="text-3xl font-black tracking-tight mb-2">{result.threat_level}</h2>
                <p className="font-bold opacity-90 leading-tight">{result.verdict}</p>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-8">
              {/* Confidence & Types */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Identified Attack Type</h4>
                  <p className="text-sm font-bold text-slate-900">{result.attack_type}</p>
                  
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-4 mb-1">Attacker's Intent</h4>
                  <p className="text-sm font-bold text-slate-700 leading-tight">{result.attacker_intent}</p>
                </div>
                <div className="flex flex-col justify-center">
                  {renderConfidenceBar(result.confidence_score)}
                </div>
              </div>

              {/* Red Flags */}
              {result.red_flags.length > 0 && (
                <div>
                  <h4 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-500" />
                    Detected Red Flags
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    {result.red_flags.map((flag, idx) => (
                      <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500"></div>
                        <h5 className="font-bold text-slate-900 mb-1">{flag.label}</h5>
                        <p className="text-sm text-slate-600 mb-3">{flag.explanation}</p>
                        <div className="bg-emerald-50 rounded-lg p-2 border border-emerald-100">
                          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700 mb-0.5">Legitimate Version:</p>
                          <p className="text-xs font-bold text-emerald-800">{flag.legitimate_version}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Plan */}
              {result.what_to_do.length > 0 && (
                <div>
                  <h4 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    Recommended Action Plan
                  </h4>
                  <div className="space-y-3">
                    {result.what_to_do.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-blue-50/50 p-3 rounded-xl border border-blue-100/50">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">{idx + 1}</span>
                        <span className="text-sm font-bold text-slate-700 leading-tight">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhishingDetector;
