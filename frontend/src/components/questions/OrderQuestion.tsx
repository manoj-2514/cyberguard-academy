import React, { useState } from 'react';
import { Lock, ChevronUp, ChevronDown, GripVertical, CheckCircle, XCircle } from 'lucide-react';

// ─────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────
export interface OrderStep {
  id: string;
  label: string;
}

export interface OrderQuestionProps {
  questionNumber: number;
  questionText: string;
  /** Steps in randomized order */
  steps: OrderStep[];
  onSubmit: (orderedIds: string[]) => void;
  disabled?: boolean;
  /** Correct order of IDs for post-submission display */
  correctOrderIds?: string[];
}

// ─────────────────────────────────────────────────────────
// Component (Move-up/down buttons — fully accessible + touch friendly)
// ─────────────────────────────────────────────────────────
const OrderQuestion: React.FC<OrderQuestionProps> = ({
  questionNumber,
  questionText,
  steps: initialSteps,
  onSubmit,
  disabled = false,
  correctOrderIds,
}) => {
  const [items, setItems] = useState<OrderStep[]>(initialSteps);
  const [internalLocked, setInternalLocked] = useState(false);
  const locked = disabled || internalLocked;
  const [activeId, setActiveId] = useState<string | null>(null);

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (locked) return;
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= items.length) return;

    setItems(prev => {
      const next = [...prev];
      [next[index], next[newIndex]] = [next[newIndex], next[index]];
      return next;
    });
  };

  const handleItemClick = (id: string) => {
    if (locked) return;
    if (activeId === null) {
      setActiveId(id);
    } else if (activeId === id) {
      setActiveId(null);
    } else {
      setItems(prev => {
        const next = [...prev];
        const fromIdx = next.findIndex(i => i.id === activeId);
        const toIdx = next.findIndex(i => i.id === id);
        if (fromIdx !== -1 && toIdx !== -1) {
          [next[fromIdx], next[toIdx]] = [next[toIdx], next[fromIdx]];
        }
        return next;
      });
      setActiveId(null);
    }
  };

  const handleSubmit = () => {
    if (locked) return;
    setInternalLocked(true);
    onSubmit(items.map(i => i.id));
  };

  // Post-submission: check if each item is in the correct position
  const isPositionCorrect = (index: number): boolean | null => {
    if (!locked || !correctOrderIds || correctOrderIds.length === 0) return null;
    return items[index]?.id === correctOrderIds[index];
  };

  // Get the correct position (1-indexed) for an item
  const getCorrectPosition = (itemId: string): number | null => {
    if (!correctOrderIds) return null;
    const idx = correctOrderIds.indexOf(itemId);
    return idx >= 0 ? idx + 1 : null;
  };

  return (
    <div className="space-y-8">
      {/* Question header */}
      <div>
        <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-2">
          Question {questionNumber} · Sequence
        </p>
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
          {questionText}
        </h2>
        {!locked && (
          <p className="text-slate-500 text-sm font-medium mt-3">
            Use the arrows to reorder, or tap two items to swap them.
          </p>
        )}
      </div>

      {/* Sortable list */}
      <div className="space-y-3" role="list" aria-label="Reorderable steps">
        {items.map((item, index) => {
          const posCorrect = isPositionCorrect(index);
          const correctPos = getCorrectPosition(item.id);

          return (
            <div
              key={item.id}
              role="listitem"
              aria-label={`Step ${index + 1}: ${item.label}`}
              className={`flex items-center gap-3 md:gap-4 p-4 md:p-5 rounded-xl border-2 transition-all ${
                locked
                  ? posCorrect === true
                    ? 'bg-emerald-50 border-emerald-400'
                    : posCorrect === false
                    ? 'bg-rose-50 border-rose-400'
                    : 'bg-slate-50 border-slate-100'
                  : activeId === item.id
                  ? 'bg-blue-50 border-blue-500 shadow-lg shadow-blue-100 scale-[1.02]'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
              style={{ touchAction: 'manipulation' }}
            >
              {/* Position number */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg shrink-0 transition-colors ${
                locked
                  ? posCorrect === true
                    ? 'bg-emerald-500 text-white'
                    : posCorrect === false
                    ? 'bg-rose-500 text-white'
                    : 'bg-slate-200 text-slate-500'
                  : activeId === item.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600'
              }`}>
                {index + 1}
              </div>

              {/* Grip + Label (clickable for swap) */}
              <button
                onClick={() => handleItemClick(item.id)}
                disabled={locked}
                className="flex items-center gap-3 flex-1 min-w-0 text-left focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg p-1 -m-1"
                aria-label={`${activeId === item.id ? 'Deselect' : 'Select'} "${item.label}" to swap`}
                style={{ touchAction: 'manipulation', userSelect: 'none' }}
              >
                <GripVertical className={`w-5 h-5 shrink-0 ${locked ? 'text-slate-200' : 'text-slate-300'}`} />
                <span className={`font-bold text-base ${
                  locked
                    ? posCorrect === true
                      ? 'text-emerald-800'
                      : posCorrect === false
                      ? 'text-rose-800'
                      : 'text-slate-500'
                    : 'text-slate-900'
                }`}>
                  {item.label}
                </span>
              </button>

              {/* Result indicators */}
              {locked && posCorrect === true && (
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
              )}
              {locked && posCorrect === false && (
                <div className="flex items-center gap-1.5 shrink-0">
                  <XCircle className="w-5 h-5 text-rose-500" />
                  {correctPos && (
                    <span className="text-xs font-bold text-rose-500">→ #{correctPos}</span>
                  )}
                </div>
              )}

              {/* Move buttons */}
              {!locked && (
                <div className="flex flex-col gap-1 shrink-0">
                  <button
                    onClick={() => moveItem(index, 'up')}
                    disabled={index === 0}
                    aria-label={`Move "${item.label}" up`}
                    className={`flex items-center justify-center p-2 min-h-[48px] min-w-[48px] rounded-lg transition-all focus:outline-none focus:ring-4 focus:ring-blue-300 ${
                      index === 0
                        ? 'text-slate-200 cursor-not-allowed'
                        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 active:scale-90'
                    }`}
                    style={{ touchAction: 'manipulation' }}
                  >
                    <ChevronUp className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => moveItem(index, 'down')}
                    disabled={index === items.length - 1}
                    aria-label={`Move "${item.label}" down`}
                    className={`flex items-center justify-center p-2 min-h-[48px] min-w-[48px] rounded-lg transition-all focus:outline-none focus:ring-4 focus:ring-blue-300 ${
                      index === items.length - 1
                        ? 'text-slate-200 cursor-not-allowed'
                        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 active:scale-90'
                    }`}
                    style={{ touchAction: 'manipulation' }}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </button>
                </div>
              )}

              {locked && !posCorrect && <Lock className="w-4 h-4 text-slate-300 shrink-0" />}
            </div>
          );
        })}
      </div>

      {/* Correct order display after submission */}
      {locked && correctOrderIds && correctOrderIds.length > 0 && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <div className="text-xs font-black uppercase tracking-widest text-emerald-700 mb-2 flex items-center gap-2">
            <CheckCircle className="w-3.5 h-3.5" /> Correct Order
          </div>
          <div className="flex flex-wrap gap-2">
            {correctOrderIds.map((id, i) => {
              const step = items.find(s => s.id === id);
              return (
                <span key={id} className="inline-flex items-center gap-1.5 text-sm text-emerald-800 font-bold">
                  <span className="w-6 h-6 rounded-lg bg-emerald-200 text-emerald-800 flex items-center justify-center text-xs font-black">{i + 1}</span>
                  {step?.label || id}
                  {i < correctOrderIds.length - 1 && <span className="text-emerald-300 mx-1">→</span>}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={locked}
        aria-label="Submit sequence order"
        className={`w-full py-5 rounded-2xl text-lg font-black transition-all active:scale-[0.97] focus:outline-none focus:ring-4 focus:ring-blue-300 ${
          locked
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
            : 'bg-slate-900 text-white hover:bg-blue-600 shadow-xl active:shadow-md'
        }`}
      >
        {locked ? (
          <span className="flex items-center justify-center gap-2">
            <Lock className="w-5 h-5" /> Answer Locked
          </span>
        ) : (
          'Submit Answer'
        )}
      </button>
    </div>
  );
};

export default OrderQuestion;
