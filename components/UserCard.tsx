import React, { useState } from 'react';
import { UserProfile, Category } from '../types';
import { UserPlus, UserCheck, Shield, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UserCardProps {
  user: UserProfile;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing || false);
  const navigate = useNavigate();

  const toggleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFollowing(!isFollowing);
  };

  const handleProfileClick = () => {
    navigate(`/profile/${user.id}`);
  };

  const getTopSkill = () => {
    const entries = Object.entries(user.skills);
    if (entries.length === 0) return null;
    return entries.reduce((a, b) => a[1] > b[1] ? a : b);
  };

  const topSkill = getTopSkill();

  return (
    <div 
        onClick={handleProfileClick}
        className="bg-card rounded-xl border border-slate-700 p-4 flex items-center justify-between hover:border-slate-500 transition-all cursor-pointer group"
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg transition-transform group-hover:scale-105 ${
                user.role === 'Teacher' ? 'bg-indigo-600' : 'bg-slate-700'
            }`}>
                {user.name.charAt(0)}
            </div>
            {user.role === 'Teacher' && (
                <div className="absolute -bottom-1 -right-1 bg-yellow-500 rounded-full p-0.5 border border-dark">
                    <Shield size={10} className="text-white" fill="currentColor" />
                </div>
            )}
        </div>
        
        <div>
          <h4 className="font-bold text-white text-sm group-hover:text-primary transition-colors">{user.name}</h4>
          <div className="flex items-center space-x-2 text-xs text-slate-400">
             <span>Nível {user.level}</span>
             <span>•</span>
             <span className="flex items-center text-yellow-500">
                <Award size={10} className="mr-1" />
                {user.reputation} Rep
             </span>
          </div>
          {topSkill && (
            <div className="mt-1 text-[10px] text-slate-500">
                Especialista em <span className="text-slate-300">{topSkill[0]}</span>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={toggleFollow}
        className={`flex items-center justify-center px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
          isFollowing
            ? 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/50'
            : 'bg-primary text-white shadow-lg shadow-primary/20 hover:bg-indigo-500'
        }`}
      >
        {isFollowing ? (
          <>
            <UserCheck size={14} className="mr-1.5" />
            Seguindo
          </>
        ) : (
          <>
            <UserPlus size={14} className="mr-1.5" />
            Seguir
          </>
        )}
      </button>
    </div>
  );
};

export default UserCard;