import React from 'react';
import { Target, TrendingUp, Award, ArrowRight } from 'lucide-react';

interface PersonalStats {
  rank: number;
  score: number;
  accuracy: number;
  best_module: string;
  percentile: number;
}

interface PersonalStatsCardProps {
  stats: PersonalStats;
  onGoToModules: () => void;
}

const PersonalStatsCard: React.FC<PersonalStatsCardProps> = ({ stats, onGoToModules }) => {
  return (
    <div className="mt-8 bg-blue-600 rounded-3xl p-8 text-white shadow-2xl shadow-blue-600/20 relative overflow-hidden group">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -mr-32 -mt-32 group-hover:scale-125 transition-transform duration-1000"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 blur-[60px] rounded-full -ml-24 -mb-24"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 text-center md:text-left">
          <div className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-2">Your Performance</div>
          <h3 className="text-3xl font-black tracking-tight mb-2">You're in the Top {100 - stats.percentile}%</h3>
          <p className="text-blue-100 font-bold opacity-80 max-w-md">
            You've defended against {stats.score / 10} potential threats with {stats.accuracy}% accuracy. Keep it up!
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Award className="w-5 h-5 text-blue-200" />
            </div>
            <div className="text-2xl font-black">#{stats.rank}</div>
            <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mt-1">Your Rank</div>
          </div>
          
          <div className="text-center">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-5 h-5 text-blue-200" />
            </div>
            <div className="text-2xl font-black">{stats.score}</div>
            <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mt-1">Total Points</div>
          </div>
          
          <div className="text-center">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Target className="w-5 h-5 text-blue-200" />
            </div>
            <div className="text-2xl font-black">{stats.accuracy}%</div>
            <div className="text-[10px] font-black uppercase tracking-widest opacity-60 mt-1">Accuracy</div>
          </div>
          
          <div className="text-center">
            <button 
              onClick={onGoToModules}
              className="w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center mx-auto hover:scale-110 transition-transform shadow-lg shadow-black/10"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
            <div className="text-[10px] font-black uppercase tracking-widest opacity-80 mt-3">Improve Rank</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalStatsCard;
