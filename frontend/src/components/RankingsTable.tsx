import React from 'react';


export interface LeaderboardEntry {
  rank: number;
  user_id: string;
  username: string;
  score: number;
  modules_completed: number;
  best_module: string;
  accuracy: number;
  badges: string[];
  last_active: string;
  is_current_user: boolean;
}

interface RankingsTableProps {
  entries: LeaderboardEntry[];
  currentUserEntry?: LeaderboardEntry;
  isLoading: boolean;
  activeMode?: 'live' | 'demo';
}

const RankingsTable: React.FC<RankingsTableProps> = ({ entries, currentUserEntry, isLoading, activeMode }) => {
  // If the current user is not in the top 10, we'll pin them at the bottom
  const isUserInVisibleList = entries.some(e => e.is_current_user);
  const showPinnedRow = currentUserEntry && !isUserInVisibleList;

  if (!isLoading && entries.length === 0 && activeMode === 'live') {
    return (
      <div className="bg-white rounded-3xl p-12 text-center shadow-xl shadow-slate-200/40 border border-slate-100 mt-12 flex flex-col items-center">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-4 text-3xl">🏆</div>
        <h3 className="text-xl font-black text-slate-900 mb-2">No rankings yet.</h3>
        <p className="text-slate-500 font-medium">Complete modules to be the first on the leaderboard!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/40 border border-slate-100 mt-12 relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] z-20 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Rank</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Player</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Score</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Modules</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Best Performance</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Badges</th>
              <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Activity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {entries.map((entry) => (
              <tr 
                key={entry.user_id === 'demo' ? `${entry.username}-${entry.rank}` : entry.user_id}
                className={`transition-colors hover:bg-slate-50/80 group ${
                  entry.is_current_user ? 'bg-blue-50/50' : ''
                }`}
              >
                <td className="px-6 py-5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm ${
                    entry.rank <= 3 ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {entry.rank}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:scale-110 transition-transform">
                      {entry.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        {entry.username}
                        {entry.is_current_user && (
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[8px] font-black uppercase tracking-tighter rounded">YOU</span>
                        )}
                      </div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{entry.accuracy}% Accuracy</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 font-black text-slate-900">{entry.score.toLocaleString()}</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full" 
                        style={{ width: `${(entry.modules_completed / 20) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-black text-slate-500">{entry.modules_completed}/20</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-tight">
                    {entry.best_module}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex -space-x-1">
                    {entry.badges.map((badge, bIdx) => (
                      <div key={bIdx} className="w-6 h-6 bg-white border border-slate-100 rounded-full flex items-center justify-center text-xs shadow-sm" title={badge}>
                        {badge}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-5 text-xs font-bold text-slate-400">{entry.last_active}</td>
              </tr>
            ))}
          </tbody>
          
          {showPinnedRow && (
            <tfoot className="border-t-4 border-blue-100">
              <tr className="bg-blue-600 text-white">
                <td className="px-6 py-5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm bg-white text-blue-600">
                    {currentUserEntry.rank}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-black">
                      {currentUserEntry.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold">You (Pinned)</div>
                      <div className="text-[10px] font-bold text-blue-100 uppercase tracking-widest">{currentUserEntry.accuracy}% Accuracy</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 font-black">{currentUserEntry.score.toLocaleString()}</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-white/20 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-white rounded-full" 
                        style={{ width: `${(currentUserEntry.modules_completed / 20) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-black text-blue-50">{currentUserEntry.modules_completed}/20</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-tight">
                    {currentUserEntry.best_module}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex -space-x-1">
                    {currentUserEntry.badges.map((badge, bIdx) => (
                      <div key={bIdx} className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs" title={badge}>
                        {badge}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-5 text-xs font-bold text-blue-100">{currentUserEntry.last_active}</td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
};

export default RankingsTable;
