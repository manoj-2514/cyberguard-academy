import React, { useState } from 'react';
import { Lock, GripVertical, ArrowRight, Shield, AlertTriangle, AlertCircle, CheckCircle, XCircle, Zap } from 'lucide-react';

// ─────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────
export interface ClassifyItem {
  id: string;
  label: string;
  description?: string;
  category?: string; // correct category for post-submission validation
}

export interface ClassifyQuestionProps {
  questionNumber: number;
  questionText: string;
  items: ClassifyItem[];
  categories?: string[];
  onSubmit: (placements: Record<string, string>) => void;
  disabled?: boolean;
  /** Correct mappings for post-submission display */
  correctMappings?: Record<string, string>;
}

// ─────────────────────────────────────────────────────────
// Category Config
// ─────────────────────────────────────────────────────────
const getCategoryStyles = (category: string, index: number) => {
  const configs = [
    { color: 'border-rose-400 bg-rose-50', icon: <AlertTriangle className="w-5 h-5 text-rose-500" />, bg: 'bg-rose-500' },
    { color: 'border-amber-400 bg-amber-50', icon: <AlertCircle className="w-5 h-5 text-amber-500" />, bg: 'bg-amber-500' },
    { color: 'border-blue-400 bg-blue-50', icon: <Shield className="w-5 h-5 text-blue-500" />, bg: 'bg-blue-500' },
    { color: 'border-emerald-400 bg-emerald-50', icon: <CheckCircle className="w-5 h-5 text-emerald-500" />, bg: 'bg-emerald-500' },
    { color: 'border-indigo-400 bg-indigo-50', icon: <Shield className="w-5 h-5 text-indigo-500" />, bg: 'bg-indigo-500' },
    { color: 'border-violet-400 bg-violet-50', icon: <Zap className="w-5 h-5 text-violet-500" />, bg: 'bg-violet-500' },
  ];

  if (category === 'HIGH') return configs[0];
  if (category === 'MEDIUM') return configs[1];
  if (category === 'LOW') return configs[2];
  if (category === 'SAFE') return configs[3];

  return configs[index % configs.length];
};

// ─────────────────────────────────────────────────────────
// Component (Tap-to-Select-and-Place — Touch + Keyboard Friendly)
// ─────────────────────────────────────────────────────────
const ClassifyQuestion: React.FC<ClassifyQuestionProps> = ({
  questionNumber,
  questionText,
  items,
  categories,
  onSubmit,
  disabled = false,
  correctMappings,
}) => {
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [internalLocked, setInternalLocked] = useState(false);
  const locked = disabled || internalLocked;

  const displayCategories = categories
    ? categories.map((cat, i) => ({ key: cat, label: cat, ...getCategoryStyles(cat, i) }))
    : [
        { key: 'HIGH', label: 'High Risk', ...getCategoryStyles('HIGH', 0) },
        { key: 'MEDIUM', label: 'Medium Risk', ...getCategoryStyles('MEDIUM', 1) },
        { key: 'LOW', label: 'Low Risk', ...getCategoryStyles('LOW', 2) },
        { key: 'SAFE', label: 'Safe', ...getCategoryStyles('SAFE', 3) },
      ];

  const handleCategoryClick = (category: string) => {
    if (locked || !selectedItem) return;
    setPlacements(prev => ({ ...prev, [selectedItem]: category }));
    setSelectedItem(null);
  };

  if (!items || items.length === 0) {
    return (
      <div className="bg-slate-50 p-12 rounded-[2.5rem] border border-dashed border-slate-200 text-center">
        <p className="text-slate-400 font-bold italic">No items available for classification.</p>
      </div>
    );
  }

  const unplacedItems = items.filter(item => !(item.id in placements));
  const allPlaced = Object.keys(placements).length === items.length;

  const handleItemClick = (itemId: string) => {
    if (locked) return;
    setSelectedItem(prev => prev === itemId ? null : itemId);
  };

  const handleRemove = (itemId: string) => {
    if (locked) return;
    setPlacements(prev => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
  };

  const handleSubmit = () => {
    if (locked || !allPlaced) return;
    setInternalLocked(true);
    onSubmit(placements);
  };

  // Check if a placed item is in the correct category
  const isItemCorrect = (itemId: string): boolean | null => {
    if (!locked) return null;
    const item = items.find(i => i.id === itemId);
    const placedCat = placements[itemId];
    const correctCat = item?.category || correctMappings?.[itemId];
    if (!correctCat || !placedCat) return null;
    return placedCat === correctCat;
  };

  const getCorrectCategory = (itemId: string): string | null => {
    const item = items.find(i => i.id === itemId);
    return item?.category || correctMappings?.[itemId] || null;
  };

  return (
    <div className="space-y-8">
      {/* Question header */}
      <div>
        <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-2">
          Question {questionNumber} · Classify
        </p>
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
          {questionText}
        </h2>
        {!locked && (
          <p className="text-slate-500 text-sm font-medium mt-3">
            Tap an item below, then tap a category to place it.
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT: Unplaced items */}
        <div>
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
            Items to Classify ({unplacedItems.length} remaining)
          </h3>
          <div className="space-y-3 min-h-[120px]">
            {unplacedItems.length === 0 && !locked ? (
              <div className="text-center text-slate-400 py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                All items placed ✓
              </div>
            ) : (
              unplacedItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  disabled={locked}
                  aria-pressed={selectedItem === item.id}
                  aria-label={`Select ${item.label} to classify`}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all focus:outline-none focus:ring-4 focus:ring-blue-300 min-h-[48px] ${
                    locked
                      ? 'bg-slate-50 border-slate-100 text-slate-400 cursor-not-allowed'
                      : selectedItem === item.id
                      ? 'bg-blue-50 border-blue-500 shadow-lg shadow-blue-100'
                      : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-md active:scale-[0.98]'
                  }`}
                  style={{ touchAction: 'manipulation', userSelect: 'none' }}
                >
                  <GripVertical className="w-4 h-4 text-slate-300 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="font-bold text-slate-900 block">{item.label}</span>
                    {item.description && (
                      <span className="text-xs text-slate-400 block mt-0.5">{item.description}</span>
                    )}
                  </div>
                  {selectedItem === item.id && (
                    <ArrowRight className="w-5 h-5 text-blue-500 shrink-0 animate-pulse" />
                  )}
                </button>
              ))
            )}
          </div>
        </div>

        {/* RIGHT: Drop zones */}
        <div>
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
            Categories
          </h3>
          <div className="space-y-4">
            {displayCategories.map(cat => {
              const placedHere = items.filter(item => placements[item.id] === cat.key);
              return (
                <div key={cat.key}>
                  <button
                    onClick={() => handleCategoryClick(cat.key)}
                    disabled={locked || !selectedItem}
                    aria-label={`Place selected item into ${cat.label}`}
                    className={`w-full rounded-xl border-2 p-4 transition-all text-left focus:outline-none focus:ring-4 focus:ring-blue-300 ${cat.color} ${
                      locked || !selectedItem
                        ? 'cursor-default'
                        : 'hover:shadow-md hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
                    } ${selectedItem ? 'ring-2 ring-blue-300 ring-offset-2' : ''}`}
                    style={{ touchAction: 'manipulation', userSelect: 'none' }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {cat.icon}
                      <span className="font-black text-sm uppercase tracking-widest">{cat.label}</span>
                      <span className="ml-auto text-xs font-bold text-slate-400">
                        {placedHere.length} items
                      </span>
                    </div>

                    {/* Placed items */}
                    {placedHere.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {placedHere.map(item => {
                          const correct = isItemCorrect(item.id);
                          const correctCat = getCorrectCategory(item.id);

                          return (
                            <span
                              key={item.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemove(item.id);
                              }}
                              role="button"
                              tabIndex={locked ? -1 : 0}
                              aria-label={`Remove ${item.label} from ${cat.label}`}
                              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleRemove(item.id); }}}
                              className={`inline-flex items-center gap-1.5 px-3 py-2 min-h-[48px] rounded-lg text-sm font-bold ${
                                locked
                                  ? correct === true
                                    ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-400'
                                    : correct === false
                                    ? 'bg-rose-100 text-rose-800 border-2 border-rose-400'
                                    : `${cat.bg} text-white`
                                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300 cursor-pointer'
                              }`}
                              style={{ touchAction: 'manipulation', userSelect: 'none' }}
                            >
                              {locked && correct === true && <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />}
                              {locked && correct === false && <XCircle className="w-3.5 h-3.5 text-rose-600" />}
                              {item.label}
                              {!locked && <span className="text-[10px]">✕</span>}
                              {locked && correct === false && correctCat && (
                                <span className="text-[10px] ml-1 opacity-70">→ {correctCat}</span>
                              )}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center justify-between text-sm text-slate-400 font-bold" role="status" aria-live="polite">
        <span>{Object.keys(placements).length} of {items.length} items classified</span>
        {locked && (
          <span className="flex items-center gap-1.5 uppercase tracking-widest text-[10px]">
            <Lock className="w-3.5 h-3.5" /> Locked
          </span>
        )}
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={locked || !allPlaced}
        aria-label="Submit classification"
        className={`w-full py-5 rounded-2xl text-lg font-black transition-all active:scale-[0.97] focus:outline-none focus:ring-4 focus:ring-blue-300 ${
          locked
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
            : !allPlaced
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

export default ClassifyQuestion;
