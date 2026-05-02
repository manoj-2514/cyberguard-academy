import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { ShieldAlert, ShieldCheck, AlertTriangle, Loader2, QrCode, CheckCircle, Globe, Search, Info } from 'lucide-react';

interface RedFlag {
  label: string;
  explanation: string;
  legitimate_version: string;
}

interface DomainAnalysis {
  domain: string;
  subdomain_flags: string;
  path_flags: string;
  estimated_age: string;
}

interface AnalyzeQrResponse {
  threat_level: 'SAFE' | 'SUSPICIOUS' | 'DANGEROUS';
  verdict: string;
  attack_type: string;
  destination_category: string;
  delivery_risk_note: string;
  url_visibility_warning: string;
  domain_analysis: DomainAnalysis;
  confidence_score: number;
  red_flags: RedFlag[];
  what_to_do: string[];
}

const QRCodeAnalyzer: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<AnalyzeQrResponse | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUrl = url.trim();
    if (!cleanUrl) {
      setError('URL is required.');
      return;
    }
    
    if (!cleanUrl.includes('.')) {
      setError('Please enter a valid URL extracted from the QR code.');
      return;
    }

    setError('');
    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/simulator/analyze-qr`, { url: cleanUrl });
      setResult(response.data);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.detail || 'Failed to analyze QR code.');
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
            <QrCode className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">QR Code Threat Analyzer</h3>
        </div>

        <form onSubmit={handleAnalyze} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500">URL from QR Code</label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Paste the URL hidden inside the QR code..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-700"
              />
            </div>
            <p className="text-[10px] font-bold text-slate-400 mt-2 flex items-center gap-1.5">
              <Info className="w-3 h-3" /> Don't have the URL? Use a QR scanner app to extract it first, then paste it here.
            </p>
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
            {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Analyzing QR Threat...</> : <><Search className="w-5 h-5" /> Analyze QR Code</>}
          </button>
        </form>
      </div>

      <div className="h-full relative">
        {!result && !loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 text-center p-8 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
            <QrCode className="w-16 h-16 mb-4 text-slate-300" />
            <h4 className="text-lg font-black text-slate-600 mb-2">Quishing Detection</h4>
            <p className="text-sm font-medium">QR codes bypass traditional link filters. Paste the hidden URL to see if it leads to a credential harvester or malware.</p>
          </div>
        )}

        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-white rounded-3xl border border-slate-100 shadow-xl">
            <div className="w-16 h-16 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin mb-6"></div>
            <h4 className="text-lg font-black text-slate-900 mb-2">Analyzing QR Destination...</h4>
            <p className="text-slate-500 text-sm font-medium animate-pulse">Running domain reputation checks and delivery risk analysis.</p>
          </div>
        )}

        {result && !loading && (
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/40 border border-slate-100 animate-slide-up">
            <div className={`p-6 md:p-8 border-b-2 flex flex-col sm:flex-row sm:items-center gap-6 ${result.threat_level === 'SAFE' ? 'text-emerald-600 bg-emerald-50 border-emerald-200' : result.threat_level === 'SUSPICIOUS' ? 'text-amber-600 bg-amber-50 border-amber-200' : 'text-rose-600 bg-rose-50 border-rose-200'}`}>
              <div className="shrink-0 bg-white p-3 rounded-2xl shadow-sm">
                {result.threat_level === 'SAFE' ? <ShieldCheck className="w-8 h-8 text-emerald-600" /> : result.threat_level === 'SUSPICIOUS' ? <AlertTriangle className="w-8 h-8 text-amber-600" /> : <ShieldAlert className="w-8 h-8 text-rose-600" />}
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-70">QR Risk Audit</div>
                <h2 className="text-3xl font-black tracking-tight mb-2">{result.threat_level}</h2>
                <p className="font-bold opacity-90 leading-tight">{result.verdict}</p>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-8">
              {/* QR Context Risk */}
              <div className="bg-slate-900 rounded-2xl p-6 text-white border border-slate-800">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-4">QR-Specific Context Analysis</h4>
                <div className="space-y-4">
                  <div className="space-y-1 border-b border-white/5 pb-3">
                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-tight">Delivery Risk</span>
                    <p className="text-xs font-bold text-white">{result.delivery_risk_note}</p>
                  </div>
                  <div className="space-y-1 border-b border-white/5 pb-3">
                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-tight">Visibility Warning</span>
                    <p className="text-xs font-bold text-white leading-relaxed">{result.url_visibility_warning}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-tight">Destination Category</span>
                    <p className="text-xs font-black text-blue-300">{result.destination_category}</p>
                  </div>
                </div>
              </div>

              {/* Confidence & Attack Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Identified Attack</h4>
                  <p className="text-sm font-bold text-slate-900">{result.attack_type}</p>
                </div>
                <div>{renderConfidenceBar(result.confidence_score)}</div>
              </div>

              {/* Red Flags */}
              {result.red_flags.length > 0 && (
                <div>
                  <h4 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-rose-500" /> Destination Indicators</h4>
                  <div className="space-y-3">
                    {result.red_flags.map((flag, idx) => (
                      <div key={idx} className="border border-slate-200 rounded-xl p-4 shadow-sm bg-white">
                        <h5 className="font-bold text-slate-900 text-sm mb-1">{flag.label}</h5>
                        <p className="text-xs text-slate-600 mb-2">{flag.explanation}</p>
                        <div className="bg-emerald-50 rounded-lg p-2 border border-emerald-100 text-[10px]">
                          <span className="font-black text-emerald-700 uppercase">Safe Equivalent:</span> <span className="font-bold text-emerald-800">{flag.legitimate_version}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Plan */}
              <div>
                <h4 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2"><CheckCircle className="w-4 h-4 text-blue-600" /> QR Safety Steps</h4>
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

export default QRCodeAnalyzer;
