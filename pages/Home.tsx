
import React, { useState, useEffect, useMemo } from 'react';
import { MOCK_CHALLENGES } from '../constants';
import { Star, ArrowRight, TrendingUp, Zap, Award } from 'lucide-react';
import ChallengeCard from '../components/ChallengeCard';
import { audio } from '../utils/audio';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Para você');
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  const filters = ['Para você', 'Tabelas de classificação', 'Crianças', 'Premium', 'Categorias'];

  // Seleciona desafios para o carrossel (Destaques, XP alto ou diários)
  const featuredChallenges = useMemo(() => {
    return MOCK_CHALLENGES.filter(c => c.pointsReward >= 100 || c.isDaily).slice(0, 3);
  }, []);

  const suggestedChallenges = MOCK_CHALLENGES.slice(1, 4);

  // Auto-play para o carrossel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % featuredChallenges.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredChallenges.length]);

  const handleHeroClick = (id: string) => {
    audio.playTap();
    navigate(`/challenge/${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen pb-24 md:pb-8">
      
      {/* Filters Bar (Pills style) */}
      <div className="sticky top-0 z-40 bg-dark/95 backdrop-blur-md border-b border-slate-800/50 py-2 no-print overflow-hidden">
        <div className="flex gap-4 px-4 overflow-x-auto no-scrollbar">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => { audio.playTap(); setActiveFilter(filter); }}
              className={`
                px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all
                ${activeFilter === filter ? 'text-primary border-b-2 border-primary' : 'text-slate-400 hover:text-slate-200'}
              `}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-6 space-y-8 max-w-5xl mx-auto w-full">
        
        {/* Animated Hero Carousel Section */}
        <section className="relative overflow-hidden group">
          <div 
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.16, 1, 0.3, 1)]"
            style={{ transform: `translateX(-${currentHeroIndex * 100}%)` }}
          >
            {featuredChallenges.map((challenge, idx) => (
              <div 
                key={challenge.id} 
                className="min-w-full px-1"
                onClick={() => handleHeroClick(challenge.id)}
              >
                <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-2xl cursor-pointer">
                  {/* Background Image with Overlay */}
                  <img 
                    src={idx === 0 
                      ? "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000" 
                      : idx === 1 
                      ? "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=1000"
                      : "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000"
                    } 
                    alt={challenge.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent p-6 flex flex-col justify-end">
                    
                    {/* Floating Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="bg-primary/90 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg flex items-center">
                            <Zap size={10} className="mr-1 fill-white" /> Em Alta
                        </span>
                        {challenge.pointsReward > 150 && (
                            <span className="bg-amber-500/90 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg flex items-center">
                                <Award size={10} className="mr-1 fill-white" /> Recompensa Épica
                            </span>
                        )}
                    </div>

                    <h2 className="text-xl md:text-2xl font-black text-white mb-2 leading-tight drop-shadow-md">
                      {challenge.title}
                    </h2>
                    <p className="text-xs text-slate-200 mb-4 line-clamp-2 max-w-[85%] font-medium opacity-90">
                      {challenge.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-primary font-black shadow-inner">
                          {challenge.title.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-white font-bold block">SkillForge Premium</span>
                          <span className="text-[8px] text-slate-300 font-medium flex items-center">
                            4,9 ★ • {challenge.participants}+ Resolvido
                          </span>
                        </div>
                      </div>
                      <button 
                        className="bg-primary hover:bg-indigo-500 text-white px-8 py-2.5 rounded-full text-xs font-black uppercase tracking-tighter transition-all shadow-xl shadow-primary/30 active:scale-95"
                      >
                        Resolver
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Indicators */}
          <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-1.5 pointer-events-none">
            {featuredChallenges.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-300 ${currentHeroIndex === i ? 'w-6 bg-white' : 'w-1.5 bg-white/40'}`}
              />
            ))}
          </div>
        </section>

        {/* Suggested Section */}
        <section className="space-y-5">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-lg font-black text-white tracking-tight">Sugerido para você</h3>
            <ArrowRight size={20} className="text-slate-500 cursor-pointer hover:text-white transition-colors" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {suggestedChallenges.map((challenge, idx) => (
              <div 
                key={challenge.id}
                className="flex items-center gap-4 group cursor-pointer active:scale-95 transition-all p-2 rounded-2xl hover:bg-slate-800/30"
                style={{ animation: `slideLeft 0.5s ease-out forwards ${idx * 100}ms` }}
                onClick={() => { audio.playTap(); navigate(`/challenge/${challenge.id}`); }}
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 overflow-hidden shrink-0 group-hover:scale-105 transition-transform shadow-md">
                  <div className="w-full h-full bg-gradient-to-br from-indigo-500/20 to-purple-600/20 flex items-center justify-center text-primary font-black text-xl">
                    {challenge.title.charAt(0)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-white truncate">{challenge.title}</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">{challenge.category} • {challenge.difficulty}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-[10px] text-slate-300 mr-1 font-bold">4,6</span>
                    <Star size={10} className="text-slate-400 fill-current" />
                    <span className="text-[10px] text-slate-500 ml-2">48 MB</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-4 px-1">
            <h3 className="text-lg font-black text-white tracking-tight">Laboratórios em alta</h3>
            <TrendingUp size={18} className="text-primary" />
          </div>
          <div className="flex gap-5 overflow-x-auto no-scrollbar pb-6 -mx-4 px-4">
            {MOCK_CHALLENGES.map((c) => (
              <div 
                key={c.id} 
                className="min-w-[130px] max-w-[130px] group cursor-pointer"
                onClick={() => { audio.playTap(); navigate(`/challenge/${c.id}`); }}
              >
                <div className="aspect-square bg-slate-800 rounded-[28px] border border-slate-700 mb-3 flex items-center justify-center text-primary/40 text-4xl font-black shadow-lg group-hover:scale-105 transition-transform group-hover:border-primary/50 overflow-hidden relative">
                   <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
                   {c.title.charAt(0)}
                </div>
                <h5 className="text-[11px] font-bold text-slate-200 truncate px-1">{c.title}</h5>
                <p className="text-[9px] text-slate-500 mt-0.5 px-1">{c.category}</p>
                <div className="flex items-center px-1 mt-1">
                   <span className="text-[9px] text-slate-400 font-bold">4,9</span>
                   <Star size={8} className="text-slate-500 ml-0.5 fill-current" />
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;
