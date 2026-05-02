import React from 'react';
import { AlertCircle, RotateCcw, Play } from 'lucide-react';

export interface ResumeBannerProps {
  currentQuestion: number;
  lastUpdatedAt: string;
  onResume: () => void;
  onStartOver: () => void;
}

const ResumeBanner: React.FC<ResumeBannerProps> = ({ currentQuestion, lastUpdatedAt, onResume, onStartOver }) => {
  const date = new Date(lastUpdatedAt).toLocaleDateString(undefined, {
    month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
  });

  return (
    <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-5 mb-8 animate-fade-in shadow-sm" role="alert" aria-live="polite">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-blue-900 font-black text-lg">In-Progress Attempt Found</h3>
            <p className="text-blue-700 text-sm font-medium">
              You left off at <strong className="font-black">Question {currentQuestion}</strong> on {date}.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onStartOver}
            aria-label="Start over and clear saved progress"
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-blue-600 bg-white border border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-all font-bold text-sm focus:outline-none focus:ring-4 focus:ring-blue-300 min-h-[48px]"
          >
            <RotateCcw className="w-4 h-4" /> Start Over
          </button>
          <button
            onClick={onResume}
            aria-label={`Resume simulation from Question ${currentQuestion}`}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-md active:scale-95 font-black text-sm focus:outline-none focus:ring-4 focus:ring-blue-300 min-h-[48px]"
          >
            <Play className="w-4 h-4 fill-current" /> Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeBanner;
