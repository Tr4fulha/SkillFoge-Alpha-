
import React from 'react';
import { Challenge, Category } from '../types';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { audio } from '../utils/audio';

interface ChallengeCardProps {
  challenge: Challenge;
  isSmall?: boolean;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
  const navigate = useNavigate();
  const { isUnlocked } = useUser();
  const unlocked = !challenge.isLocked || isUnlocked(challenge.id);

  const handleClick = () => {
    audio.playTap();
    if (unlocked) {
      navigate(`/challenge/${challenge.id}`);
    } else {
      // Logic for locking could go here
      audio.playError();
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="flex items-center gap-4 group cursor-pointer animate-slide-up bg-slate-800/20 p-3 rounded-2xl border border-transparent hover:border-slate-700 hover:bg-slate-800/40 transition-all active:scale-95"
    >
      <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 overflow-hidden shrink-0 shadow-lg">
        <div className="w-full h-full bg-gradient-to-br from-primary/30 to-purple-600/30 flex items-center justify-center text-primary font-black text-xl">
          {challenge.title.charAt(0)}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-white truncate group-hover:text-primary transition-colors">{challenge.title}</h4>
        <p className="text-[10px] text-slate-500 mt-0.5 truncate">{challenge.category} • {challenge.difficulty}</p>
        <div className="flex items-center mt-1">
          <span className="text-[10px] text-slate-400 mr-1 font-medium">4,7</span>
          <Star size={8} className="text-yellow-500 fill-current" />
          <span className="text-[10px] text-slate-500 ml-2">{challenge.pointsReward} XP</span>
        </div>
      </div>
      <button className="bg-slate-700/50 text-primary hover:bg-primary hover:text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all">
        Ver
      </button>
    </div>
  );
};

export default ChallengeCard;
