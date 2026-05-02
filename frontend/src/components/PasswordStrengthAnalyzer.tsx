import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { ShieldAlert, ShieldCheck, AlertTriangle, Loader2, Key, CheckCircle, Eye, EyeOff, Lock, Zap } from 'lucide-react';

interface Vulnerability {
  pattern: string;
  attack_vector: string;
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH';
}

interface AnalyzePasswordResponse {
  strength: 'WEAK' | 'MODERATE' | 'STRONG' | 'VERY STRONG';
  crack_time: string;
  strength_score: number;
  confidence_score: number;
  vulnerabilities: Vulnerability[];
  what_makes_it: string[];
  suggestions: string[];
}

const PasswordStrengthAnalyzer: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<AnalyzePasswordResponse | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Password is required for analysis.');
      return;
    }
    
    setError('');
    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/simulator/analyze-password`, { password: password.trim() });
      setResult(response.data);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.detail || 'Failed to analyze password.');
    } finally {
      setLoading(false);
    }
  };

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'VERY STRONG': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'STRONG': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'MODERATE': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'WEAK': return 'text-rose-600 bg-rose-50 border-rose-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const renderScoreBar = (score: number, label: string) => {
    let colorClass = 'bg-rose-500';
    if (score >= 30) colorClass = 'bg-amber-500';
    if (score >= 60) colorClass = 'bg-blue-500';
    if (score >= 85) colorClass = 'bg-emerald-500';

    return (
      <div className="mt-2">
        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-1.5">
          <span className="text-slate-500">{label}</span>
          <span className="text-slate-900">{score}%</span>
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
            <Key className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">Password AI Audit</h3>
        </div>

        <form onSubmit={handleAnalyze} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500">Test Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Enter a password to test..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-4 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-mono font-medium text-slate-700"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-[10px] font-bold text-slate-400 mt-2 px-1 flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3" /> This password is never stored or sent to any server for logging. Analysis happens securely.
            </p>
          </div>

          {error && (
            <div className="p-4 bg-rose-50 text-rose-600 rounded-xl text-sm font-bold border border-rose-100 flex items-center gap-3 animate-shake">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 rounded-xl text-white font-black bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-600/20 disabled:opacity-70"
          >
            {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Auditing Entropy...</> : <><Zap className="w-5 h-5" /> Analyze Password</>}
          </button>
        </form>
      </div>

      <div className="h-full relative">
        {!result && !loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 text-center p-8 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
            <Lock className="w-16 h-16 mb-4 text-slate-300" />
            <h4 className="text-lg font-black text-slate-600 mb-2">Security Benchmark</h4>
            <p className="text-sm font-medium">Test your password against modern brute-force and dictionary attack simulations powered by neural entropy analysis.</p>
          </div>
        )}

        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-white rounded-3xl border border-slate-100 shadow-xl">
            <div className="w-16 h-16 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin mb-6"></div>
            <h4 className="text-lg font-black text-slate-900 mb-2">Calculating Entropy...</h4>
            <p className="text-slate-500 text-sm font-medium animate-pulse">Running combinatorial analysis and GPU crack-time estimations.</p>
          </div>
        )}

        {result && !loading && (
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/40 border border-slate-100 animate-slide-up">
            <div className={`p-6 md:p-8 border-b-2 flex flex-col sm:flex-row sm:items-center gap-6 ${getStrengthColor(result.strength)}`}>
              <div className="shrink-0 bg-white p-3 rounded-2xl shadow-sm">
                {result.strength === 'VERY STRONG' || result.strength === 'STRONG' ? <ShieldCheck className="w-8 h-8" /> : <ShieldAlert className="w-8 h-8" />}
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-70">Security Profile</div>
                <h2 className="text-3xl font-black tracking-tight mb-2">{result.strength}</h2>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Est. Crack Time:</span>
                  <span className="text-sm font-bold opacity-100">{result.crack_time}</span>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-8">
              <div className="grid grid-cols-1 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                {renderScoreBar(result.strength_score, 'Entropy Score')}
                {renderScoreBar(result.confidence_score, 'AI Analysis Certainty')}
              </div>

              {result.vulnerabilities.length > 0 && (
                <div>
                  <h4 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-rose-500" /> Attack Vector Analysis</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {result.vulnerabilities.map((vuln, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                        <div>
                          <p className="text-sm font-black text-slate-900">{vuln.pattern}</p>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">Exploit: {vuln.attack_vector}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-[10px] font-black ${vuln.risk_level === 'HIGH' ? 'bg-rose-100 text-rose-600' : vuln.risk_level === 'MEDIUM' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                          {vuln.risk_level} RISK
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Core Observations</h4>
                  <ul className="space-y-3">
                    {result.what_makes_it.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm font-bold text-slate-700 leading-tight">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></div>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Improvement Tips</h4>
                  <ul className="space-y-3">
                    {result.suggestions.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm font-bold text-emerald-700 leading-tight">
                        <CheckCircle className="w-4 h-4 mt-0.5 shrink-0 text-emerald-500" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordStrengthAnalyzer;
