
import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_USERS, ALL_ACHIEVEMENTS } from '../constants';
import SkillRadar from '../components/SkillRadar';
import { Share2, ArrowLeft, Heart, Layout, Trophy } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { Rarity } from '../types';
import { audio } from '../utils/audio';

type ProfileTab = 'OVERVIEW' | 'FAVORITES' | 'ACHIEVEMENTS';

const RarityBadge = ({ rarity }: { rarity: Rarity }) => {
    const colors = {
        [Rarity.COMMON]: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
        [Rarity.UNCOMMON]: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        [Rarity.RARE]: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        [Rarity.EPIC]: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
        [Rarity.LEGENDARY]: 'bg-amber-500/20 text-amber-400 border-amber-500/30 border-dashed animate-pulse',
    };
    return <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${colors[rarity]}`}>{rarity}</span>;
};

const Profile: React.FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useUser();
  const [activeTab, setActiveTab] = useState<ProfileTab>('OVERVIEW');
  const [filterRarity, setFilterRarity] = useState<Rarity | 'ALL'>('ALL');

  const displayUser = useMemo(() => {
    if (!userId) return currentUser;
    return MOCK_USERS.find(u => u.id === userId) || currentUser;
  }, [userId, currentUser]);

  const isOwnProfile = displayUser.id === currentUser.id;
  
  const achievements = useMemo(() => {
    const list = isOwnProfile ? ALL_ACHIEVEMENTS : ALL_ACHIEVEMENTS.filter(a => a.isUnlocked);
    if (filterRarity === 'ALL') return list;
    return list.filter(a => a.rarity === filterRarity);
  }, [filterRarity, isOwnProfile]);

  const handleTabChange = (t: ProfileTab) => {
    audio.playTab();
    setActiveTab(t);
  };

  const handlePrint = () => {
    audio.playTap();
    window.print();
  };

  return (
    <div className="p-5 space-y-8 pb-24 max-w-4xl mx-auto w-full animate-fade-in">
      {!isOwnProfile && (
        <button 
            onClick={() => { audio.playTap(); navigate(-1); }} 
            className="group no-print flex items-center text-slate-400 hover:text-white transition-all bg-slate-800/50 px-4 py-2 rounded-full w-fit border border-slate-700/50"
        >
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
            <span className="text-[10px] font-black uppercase tracking-widest">Voltar</span>
        </button>
      )}

      <div className="flex flex-col items-center pt-4 relative">
        <div className="relative mb-6">
            <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-primary via-indigo-600 to-purple-600 flex items-center justify-center text-4xl font-black text-white shadow-2xl shadow-primary/30 border-4 border-slate-900 rotate-3 transition-transform duration-500 hover:rotate-0">
                {displayUser.name.charAt(0)}{displayUser.name.split(' ')[1]?.charAt(0)}
            </div>
        </div>

        <div className="text-center">
            <h1 className="text-3xl font-black text-white tracking-tight">{displayUser.name}</h1>
            <div className="flex items-center justify-center space-x-3 text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
                <span>Nível {displayUser.level}</span>
                <span className="w-1.5 h-1.5 bg-slate-700 rounded-full"></span>
                <span className="text-primary">{displayUser.role}</span>
            </div>
        </div>

        <div className="flex gap-3 mt-8 no-print">
            {isOwnProfile ? (
                <button onClick={handlePrint} className="px-10 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest flex items-center shadow-xl shadow-indigo-500/20 hover:scale-105 transition-all">
                    <Share2 size={16} className="mr-2" /> Exportar Currículo PDF
                </button>
            ) : (
                <>
                    <button onClick={() => audio.playTap()} className="px-8 py-3 bg-primary text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl">Seguir</button>
                    <button onClick={() => { audio.playTap(); navigate('/messages'); }} className="px-8 py-3 bg-slate-800 text-slate-200 rounded-2xl text-xs font-black uppercase border border-slate-700 hover:bg-slate-700 transition-all">Mensagem</button>
                </>
            )}
        </div>
      </div>

      <div className="flex p-1.5 bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-inner overflow-x-auto no-scrollbar no-print">
        {[
            { id: 'OVERVIEW', label: 'Resumo', icon: Layout },
            { id: 'FAVORITES', label: 'Desafios', icon: Heart },
            { id: 'ACHIEVEMENTS', label: 'Conquistas', icon: Trophy }
        ].map(tab => (
            <button 
                key={tab.id} onClick={() => handleTabChange(tab.id as ProfileTab)}
                className={`flex-1 flex items-center justify-center px-6 py-3 text-[10px] font-black uppercase tracking-tighter transition-all whitespace-nowrap rounded-xl ${activeTab === tab.id ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
                <tab.icon size={14} className="mr-2" /> {tab.label}
            </button>
        ))}
      </div>

      <div className="mt-8 transition-all duration-500">
        {activeTab === 'OVERVIEW' && (
            <div className="space-y-6 animate-slide-up">
                 <SkillRadar skills={displayUser.skills} />
            </div>
        )}

        {activeTab === 'ACHIEVEMENTS' && (
            <div className="space-y-6 animate-slide-up">
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                    <button onClick={() => { audio.playTap(); setFilterRarity('ALL'); }} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${filterRarity === 'ALL' ? 'bg-primary border-primary text-white' : 'bg-slate-800/40 border-slate-700/50 text-slate-500'}`}>Todos</button>
                    {Object.values(Rarity).map(r => (
                        <button key={r} onClick={() => { audio.playTap(); setFilterRarity(r); }} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${filterRarity === r ? 'bg-slate-700 border-slate-600 text-white' : 'bg-slate-800/20 border-slate-800 text-slate-600'}`}>{r}</button>
                    ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map(ach => (
                        <div key={ach.id} className="flex items-center gap-4 bg-slate-800/30 p-4 rounded-2xl border border-slate-700/50 hover:border-slate-600 transition-colors">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-inner ${ach.isUnlocked ? 'bg-slate-700 text-white' : 'bg-slate-900 text-slate-700'}`}>
                                {/* Aqui poderíamos renderizar ícones dinâmicos baseados no ach.icon */}
                                <Trophy size={20} className={ach.isUnlocked ? 'text-yellow-500' : 'text-slate-700'} />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h4 className={`text-sm font-bold ${ach.isUnlocked ? 'text-white' : 'text-slate-500'}`}>{ach.name}</h4>
                                    <RarityBadge rarity={ach.rarity} />
                                </div>
                                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{ach.description}</p>
                                <div className="mt-2 text-[10px] font-bold text-indigo-400">+{ach.points} XP</div>
                            </div>
                        </div>
                    ))}
                    {achievements.length === 0 && <p className="text-slate-500 text-sm text-center col-span-full py-8">Nenhuma conquista encontrada nesta categoria.</p>}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
