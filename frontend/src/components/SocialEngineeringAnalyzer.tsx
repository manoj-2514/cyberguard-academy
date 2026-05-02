import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { ShieldAlert, ShieldCheck, AlertTriangle, Loader2, MessageSquare, BrainCircuit, User } from 'lucide-react';

interface Tactic {
  name: string;
  usage: string;
  trigger: string;
}

interface AnalyzeScriptResponse {
  threat_level: 'SAFE' | 'SUSPICIOUS' | 'DANGEROUS';
  verdict: string;
  attack_category: string;
  attacker_goal: string;
  psychological_trigger: 'Fear' | 'Greed' | 'Trust' | 'Urgency' | 'Curiosity';
  confidence_score: number;
  tactics: Tactic[];
  what_to_do: string[];
}

const SocialEngineeringAnalyzer: React.FC = () => {
  const [scenarioType, setScenarioType] = useState('phone');
  const [script, setScript] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<AnalyzeScriptResponse | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!script.trim()) {
      setError('Script/Message content is required.');
      return;
    }
    
    setError('');
    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/simulator/analyze-script`, { 
        scenario_type: scenarioType,
        script: script.trim() 
      });
      setResult(response.data);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.detail || 'Failed to analyze script.');
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

  const getTriggerBadge = (trigger: string) => {
    const colors: Record<string, string> = {
      Fear: 'bg-rose-100 text-rose-700 border-rose-200',
      Greed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      Trust: 'bg-blue-100 text-blue-700 border-blue-200',
      Urgency: 'bg-amber-100 text-amber-700 border-amber-200',
      Curiosity: 'bg-indigo-100 text-indigo-700 border-indigo-200'
    };
    return <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${colors[trigger] || 'bg-slate-100 text-slate-700 border-slate-200'}`}>{trigger}</span>;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/40 border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">Script Analyzer</h3>
        </div>

        <form onSubmit={handleAnalyze} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500">Scenario Type</label>
            <select 
              value={scenarioType}
              onChange={(e) => setScenarioType(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-500 transition-all font-bold text-slate-700 cursor-pointer"
            >
              <option value="phone">Phone Call Script</option>
              <option value="sms">SMS / Text Message</option>
              <option value="in-person">In-Person Script</option>
              <option value="chat">Chat / Instant Message</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500">Message Content</label>
            <textarea 
              placeholder="Paste the conversation, script, or message content here..."
              value={script}
              onChange={(e) => setScript(e.target.value)}
              rows={8}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-700 resize-none"
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
            className="w-full py-4 rounded-xl text-white font-black bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-600/20 disabled:opacity-70"
          >
            {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Analyzing Tactics...</> : <><BrainCircuit className="w-5 h-5" /> Analyze Script</>}
          </button>
        </form>
      </div>

      <div className="h-full relative">
        {!result && !loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 text-center p-8 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
            <User className="w-16 h-16 mb-4 text-slate-300" />
            <h4 className="text-lg font-black text-slate-600 mb-2">Awaiting Script</h4>
            <p className="text-sm font-medium">The AI will detect manipulation tactics like authority impersonation, fearmongering, and pretexting.</p>
          </div>
        )}

        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-white rounded-3xl border border-slate-100 shadow-xl">
            <div className="w-16 h-16 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin mb-6"></div>
            <h4 className="text-lg font-black text-slate-900 mb-2">Deconstructing Script...</h4>
            <p className="text-slate-500 text-sm font-medium animate-pulse">Running linguistic pattern matching and psychological profiling.</p>
          </div>
        )}

        {result && !loading && (
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/40 border border-slate-100 animate-slide-up">
            <div className={`p-6 md:p-8 border-b-2 flex flex-col sm:flex-row sm:items-center gap-6 ${result.threat_level === 'SAFE' ? 'text-emerald-600 bg-emerald-50 border-emerald-200' : result.threat_level === 'SUSPICIOUS' ? 'text-amber-600 bg-amber-50 border-amber-200' : 'text-rose-600 bg-rose-50 border-rose-200'}`}>
              <div className="shrink-0 bg-white p-3 rounded-2xl shadow-sm">
                {result.threat_level === 'SAFE' ? <ShieldCheck className="w-8 h-8 text-emerald-600" /> : result.threat_level === 'SUSPICIOUS' ? <AlertTriangle className="w-8 h-8 text-amber-600" /> : <ShieldAlert className="w-8 h-8 text-rose-600" />}
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-70">Behavioral Audit</div>
                <h2 className="text-3xl font-black tracking-tight mb-2">{result.threat_level}</h2>
                <p className="font-bold opacity-90 leading-tight">{result.verdict}</p>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Primary Vulnerability</h4>
                  {getTriggerBadge(result.psychological_trigger)}
                  
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-6 mb-1">Attacker's Goal</h4>
                  <p className="text-sm font-bold text-slate-700 leading-tight">{result.attacker_goal}</p>
                </div>
                <div>{renderConfidenceBar(result.confidence_score)}</div>
              </div>

              {result.tactics.length > 0 && (
                <div>
                  <h4 className="text-sm font-black text-slate-900 mb-4">Manipulation Tactics Detected</h4>
                  <div className="grid grid-cols-1 gap-4">
                    {result.tactics.map((tactic, idx) => (
                      <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm relative overflow-hidden group">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 transition-all group-hover:w-2"></div>
                        <h5 className="font-bold text-slate-900 text-sm mb-1">{tactic.name}</h5>
                        <p className="text-xs text-slate-600 mb-2 italic">"{tactic.usage}"</p>
                        <p className="text-xs text-blue-600 font-bold tracking-tight bg-blue-50 inline-block px-2 py-0.5 rounded-lg border border-blue-100">Trigger: {tactic.trigger}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-sm font-black text-slate-900 mb-4">Defensive Action Plan</h4>
                <div className="space-y-2">
                  {result.what_to_do.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200/50 text-sm font-bold text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] shrink-0 mt-0.5">{idx + 1}</div>
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

export default SocialEngineeringAnalyzer;
