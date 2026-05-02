import React from 'react';
import { Award, Trophy, Medal } from 'lucide-react';
import type { LeaderboardEntry } from './RankingsTable';

interface PodiumProps {
  topThree: LeaderboardEntry[];
}

const Podium: React.FC<PodiumProps> = ({ topThree }) => {
  // Ensure we have at least placeholders if the list is short
  const p1 = topThree.find(e => e.rank === 1);
  const p2 = topThree.find(e => e.rank === 2);
  const p3 = topThree.find(e => e.rank === 3);

  const PodiumCard = ({ entry, rank, height, color, icon }: { entry?: LeaderboardEntry, rank: number, height: string, color: string, icon: React.ReactNode }) => {
    if (!entry) return null;

    return (
      <div className={`flex flex-col items-center animate-slide-up`} style={{ animationDelay: `${rank * 200}ms` }}>
        <div className="relative mb-4 group">
          <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 ${color} bg-white flex items-center justify-center text-3xl font-black text-slate-800 shadow-xl transition-transform group-hover:scale-110 duration-500`}>
            {entry.username.charAt(0).toUpperCase()}
          </div>
          <div className={`absolute -top-3 -right-3 w-10 h-10 rounded-full ${color} text-white flex items-center justify-center shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform`}>
            {icon}
          </div>
        </div>
        
        <div className="text-center mb-6">
          <h4 className="font-black text-slate-900 tracking-tight text-lg leading-tight truncate w-32 sm:w-40">{entry.username}</h4>
          <div className="text-2xl font-black text-blue-600 tracking-tighter mt-1">{entry.score.toLocaleString()}</div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{entry.accuracy}% ACCURACY</div>
        </div>
        
        <div 
          className={`w-32 sm:w-40 ${height} ${color} rounded-t-3xl shadow-2xl flex flex-col items-center justify-start pt-6 border-x border-t border-white/20`}
        >
          <span className="text-5xl font-black text-white/30 tracking-tighter">#{rank}</span>
          <div className="mt-4 flex -space-x-1">
            {entry.badges.slice(0, 3).map((b, idx) => (
              <span key={idx} className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs backdrop-blur-sm">{b}</span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex items-end justify-center gap-2 sm:gap-6 pt-10 px-4 mt-8">
      {/* 2nd Place */}
      <PodiumCard 
        entry={p2} 
        rank={2} 
        height="h-48 sm:h-56" 
        color="bg-slate-400" 
        icon={<Medal className="w-5 h-5" />} 
      />
      
      {/* 1st Place */}
      <PodiumCard 
        entry={p1} 
        rank={1} 
        height="h-64 sm:h-72" 
        color="bg-amber-400" 
        icon={<Trophy className="w-6 h-6" />} 
      />
      
      {/* 3rd Place */}
      <PodiumCard 
        entry={p3} 
        rank={3} 
        height="h-32 sm:h-40" 
        color="bg-amber-700" 
        icon={<Award className="w-5 h-5" />} 
      />
    </div>
  );
};

export default Podium;
