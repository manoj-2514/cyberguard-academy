import React from 'react';

interface Badge {
  id: string;
  emoji: string;
  title: string;
  requirement: string;
}

const BADGES: Badge[] = [
  { id: 'defender', emoji: '🛡️', title: 'First Defender', requirement: 'Complete your first module' },
  { id: 'sharpshooter', emoji: '🎯', title: 'Sharpshooter', requirement: '100% accuracy in any module' },
  { id: 'onfire', emoji: '🔥', title: 'On Fire', requirement: 'Complete 3 modules in a row' },
  { id: 'eagleeye', emoji: '👁️', title: 'Eagle Eye', requirement: 'Catch 10 phishing attempts correctly' },
  { id: 'elite', emoji: '🏆', title: 'CyberGuard Elite', requirement: 'Complete all 6 modules' },
  { id: 'mastermind', emoji: '🧠', title: 'Mastermind', requirement: 'Score above 90% across all modules' },
];

interface BadgeShowcaseProps {
  unlockedEmojis: string[];
}

const BadgeShowcase: React.FC<BadgeShowcaseProps> = ({ unlockedEmojis }) => {
  return (
    <div className="mt-16 bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full -mr-20 -mt-20"></div>
      
      <div className="relative z-10">
        <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
          <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-lg">🏆</span>
          Achievement Showcase
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BADGES.map((badge) => {
            const isUnlocked = unlockedEmojis.includes(badge.emoji);
            
            return (
              <div 
                key={badge.id}
                className={`p-6 rounded-2xl border-2 transition-all duration-500 ${
                  isUnlocked 
                    ? 'bg-slate-800/50 border-blue-500/30 shadow-lg shadow-blue-500/5' 
                    : 'bg-slate-900/50 border-slate-800 opacity-60 grayscale'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner ${
                    isUnlocked ? 'bg-blue-600/20' : 'bg-slate-800'
                  }`}>
                    {badge.emoji}
                  </div>
                  <div>
                    <h4 className={`font-black tracking-tight ${isUnlocked ? 'text-white' : 'text-slate-500'}`}>
                      {badge.title}
                    </h4>
                    <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-widest">
                      {isUnlocked ? 'Unlocked' : 'Locked'}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-800">
                  <p className="text-xs font-medium text-slate-400 leading-relaxed">
                    {badge.requirement}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BadgeShowcase;
