import React, { useState } from 'react';
import { CheckCircle, Circle, Lock, Mail, ExternalLink, AlertTriangle, XCircle } from 'lucide-react';

// ─────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────
export interface Hotspot {
  id: string;
  label: string;
  displayText?: string;
  element?: string;
  isSuspicious?: boolean;
  explanation?: string;
  x?: number;
  y?: number;
  position?: { top: string; left: string; width: string; height: string };
}

export interface SpotScenario {
  senderName: string;
  senderEmail: string;
  subject: string;
  body: string;
  url?: string;
}

export interface SpotQuestionProps {
  questionNumber: number;
  questionText: string;
  scenario: SpotScenario;
  hotspots: Hotspot[];
  onSubmit: (selectedIds: string[]) => void;
  disabled?: boolean;
}

// ─────────────────────────────────────────────────────────
// Hotspot State Model
// ─────────────────────────────────────────────────────────
type HotspotState = 'idle' | 'selected' | 'correct' | 'missed' | 'wrong' | 'safe';

const HOTSPOT_STYLES: Record<HotspotState, string> = {
  idle: 'bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer',
  selected: 'bg-blue-50 border-2 border-blue-500 cursor-pointer shadow-md shadow-blue-100',
  correct: 'bg-emerald-50 border-2 border-emerald-500 cursor-not-allowed',
  missed: 'bg-amber-50 border-2 border-amber-400 cursor-not-allowed',
  wrong: 'bg-rose-50 border-2 border-rose-500 cursor-not-allowed',
  safe: 'bg-white border border-slate-200 opacity-50 cursor-not-allowed',
};

const CHECKBOX_STYLES: Record<HotspotState, string> = {
  idle: 'border-slate-300 bg-white',
  selected: 'border-blue-500 bg-blue-500 text-white',
  correct: 'border-emerald-500 bg-emerald-500 text-white',
  missed: 'border-amber-400 bg-amber-100 text-amber-600',
  wrong: 'border-rose-500 bg-rose-500 text-white',
  safe: 'border-slate-200 bg-slate-50',
};

// ─────────────────────────────────────────────────────────
// Component — Interactive Hotspot Card List
// ─────────────────────────────────────────────────────────
const SpotQuestion: React.FC<SpotQuestionProps> = ({
  questionNumber,
  questionText,
  scenario,
  hotspots,
  onSubmit,
  disabled = false,
}) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [internalLocked, setInternalLocked] = useState(false);
  const locked = disabled || internalLocked;

  // Backward compatibility: normalize old schema {id, x, y, label} to new schema
  const normalizedHotspots = (hotspots || []).map(h => ({
    id: h.id || h.label || `hs_${Math.random()}`,
    displayText: h.displayText || h.label || 'Unknown Element',
    element: h.element || 'Element',
    isSuspicious: h.isSuspicious ?? true, // old schema: all hotspots were suspicious
    explanation: h.explanation || '',
  }));

  const toggleHotspot = (id: string) => {
    if (locked) return;
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const getHotspotState = (hotspot: typeof normalizedHotspots[0]): HotspotState => {
    if (!locked) {
      return selectedIds.has(hotspot.id) ? 'selected' : 'idle';
    }
    const wasSelected = selectedIds.has(hotspot.id);
    if (hotspot.isSuspicious && wasSelected) return 'correct';
    if (hotspot.isSuspicious && !wasSelected) return 'missed';
    if (!hotspot.isSuspicious && wasSelected) return 'wrong';
    return 'safe';
  };

  const getCheckboxIcon = (state: HotspotState) => {
    switch (state) {
      case 'selected':
      case 'correct':
        return '✓';
      case 'missed':
        return '!';
      case 'wrong':
        return '✗';
      default:
        return '';
    }
  };

  const getResultBadge = (state: HotspotState) => {
    switch (state) {
      case 'correct':
        return <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-black uppercase tracking-widest"><CheckCircle className="w-3.5 h-3.5" /> Correct</span>;
      case 'missed':
        return <span className="inline-flex items-center gap-1 text-amber-600 text-xs font-black uppercase tracking-widest"><AlertTriangle className="w-3.5 h-3.5" /> Missed</span>;
      case 'wrong':
        return <span className="inline-flex items-center gap-1 text-rose-600 text-xs font-black uppercase tracking-widest"><XCircle className="w-3.5 h-3.5" /> Not suspicious</span>;
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    if (locked || selectedIds.size === 0) return;
    setInternalLocked(true);
    onSubmit(Array.from(selectedIds));
  };

  if (!normalizedHotspots || normalizedHotspots.length === 0) {
    return (
      <div className="bg-slate-50 p-12 rounded-[2.5rem] border border-dashed border-slate-200 text-center">
        <p className="text-slate-400 font-bold italic">No elements available to inspect.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Question header */}
      <div>
        <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-2">
          Question {questionNumber} · Spot the Red Flags
        </p>
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
          {questionText}
        </h2>
        {!locked && (
          <p className="text-slate-500 text-sm font-medium mt-3">
            Tap each element you think is suspicious, then submit your selection.
          </p>
        )}
      </div>

      {/* Simulated email (read-only reference) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
          </div>
          <span className="text-xs text-slate-500 font-bold ml-3 uppercase tracking-widest">
            Content Preview
          </span>
        </div>

        <div className="p-5 md:p-6 border-b border-slate-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-slate-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-black text-slate-900">{scenario.senderName}</span>
                <span className="text-sm text-slate-400 font-mono">&lt;{scenario.senderEmail}&gt;</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1">{scenario.subject}</h3>
            </div>
          </div>
        </div>

        <div className="p-5 md:p-6">
          <div className="text-slate-700 leading-relaxed whitespace-pre-wrap text-[15px]">
            {scenario.body}
          </div>
          {scenario.url && (
            <div className="mt-4 inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg border border-blue-200 text-sm font-mono break-all">
              <ExternalLink className="w-4 h-4 shrink-0" />
              {scenario.url}
            </div>
          )}
        </div>
      </div>

      {/* Interactive Hotspot Card List */}
      <div>
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
          Elements to Inspect ({normalizedHotspots.length} items)
        </h3>
        <div className="space-y-3" role="group" aria-label="Selectable elements">
          {normalizedHotspots.map(hotspot => {
            const state = getHotspotState(hotspot);

            return (
              <button
                key={hotspot.id}
                onClick={() => toggleHotspot(hotspot.id)}
                disabled={locked}
                aria-pressed={selectedIds.has(hotspot.id)}
                aria-label={`${hotspot.element}: ${hotspot.displayText}. ${selectedIds.has(hotspot.id) ? 'Selected' : 'Not selected'}`}
                className={`w-full flex items-center gap-4 p-4 md:p-5 rounded-xl text-left transition-all focus:outline-none focus:ring-4 focus:ring-blue-300 min-h-[60px] ${HOTSPOT_STYLES[state]}`}
                style={{ touchAction: 'manipulation', userSelect: 'none' }}
              >
                {/* Checkbox */}
                <div className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center shrink-0 font-black text-sm transition-all ${CHECKBOX_STYLES[state]}`}>
                  {getCheckboxIcon(state)}
                </div>

                {/* Label */}
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                    {hotspot.element}
                  </div>
                  <div className="text-sm font-bold text-slate-800 leading-snug">
                    {hotspot.displayText}
                  </div>
                  {locked && hotspot.explanation && (
                    <div className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      {hotspot.explanation}
                    </div>
                  )}
                </div>

                {/* Result badge */}
                <div className="shrink-0">
                  {getResultBadge(state)}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={locked || selectedIds.size === 0}
        aria-label="Submit selected elements"
        className={`w-full py-5 rounded-2xl text-lg font-black transition-all active:scale-[0.97] focus:outline-none focus:ring-4 focus:ring-blue-300 ${
          locked
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
            : selectedIds.size === 0
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
            : 'bg-slate-900 text-white hover:bg-blue-600 shadow-xl active:shadow-md'
        }`}
      >
        {locked ? (
          <span className="flex items-center justify-center gap-2">
            <Lock className="w-5 h-5" /> Answer Locked
          </span>
        ) : (
          `Submit (${selectedIds.size} selected)`
        )}
      </button>
    </div>
  );
};

export default SpotQuestion;
