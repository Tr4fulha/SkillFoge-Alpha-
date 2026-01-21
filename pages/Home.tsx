
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { MOCK_CHALLENGES, MOCK_USERS } from '../constants';
import { Star, ArrowRight, TrendingUp, Zap, Award, Crown, Database, Code, Globe, Lock, Bot } from 'lucide-react';
import ChallengeCard from '../components/ChallengeCard';
import AIMentorModal from '../components/AIMentorModal';
import { audio } from '../utils/audio';
import { useNavigate } from 'react-router-dom';
import { Category, Difficulty } from '../types';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Para você');
  const [showGlobalMentor, setShowGlobalMentor] = useState(false);

  // Estados do Carrossel Infinito
  // Índice 1 é o primeiro slide REAL (0 é o clone do último)
  const [currentHeroIndex, setCurrentHeroIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // Refs para controle de gestos (Touch/Drag)
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const isDragging = useRef(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Filtros da UI
  const filters = ['Para você', 'Tabelas de classificação', 'Crianças', 'Premium', 'Categorias'];

  // Seleção segura de desafios
  const featuredChallenges = useMemo(() => {
    const list = MOCK_CHALLENGES.filter(c => c.pointsReward >= 100 || c.isDaily).slice(0, 3);
    return list.length > 0 ? list : MOCK_CHALLENGES.slice(0, 3);
  }, []);

  // Criação da lista estendida para loop infinito: [Clone Last, ...Originals, Clone First]
  const extendedHeroes = useMemo(() => {
    if (featuredChallenges.length === 0) return [];
    return [
      featuredChallenges[featuredChallenges.length - 1],
      ...featuredChallenges,
      featuredChallenges[0]
    ];
  }, [featuredChallenges]);

  const suggestedChallenges = useMemo(() => MOCK_CHALLENGES.slice(1, 4), []);
  const marqueeChallenges = useMemo(() => [...MOCK_CHALLENGES, ...MOCK_CHALLENGES], []);

  // Auto-play seguro
  useEffect(() => {
    if (isPaused || featuredChallenges.length <= 1) return;

    const timer = setInterval(() => {
      handleNextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentHeroIndex, isPaused, featuredChallenges.length]);

  const handleHeroClick = (id: string) => {
    if (!isDragging.current) {
        audio.playTap();
        navigate(`/challenge/${id}`);
    }
  };

  // --- NAVEGAÇÃO DO CARROSSEL ---

  const handleNextSlide = () => {
    if (extendedHeroes.length === 0) return;
    setIsTransitioning(true);
    setCurrentHeroIndex(prev => prev + 1);
  };

  const handlePrevSlide = () => {
    if (extendedHeroes.length === 0) return;
    setIsTransitioning(true);
    setCurrentHeroIndex(prev => prev - 1);
  };

  // Ajuste silencioso do índice ao final da transição
  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (e.target !== sliderRef.current) return;

    setIsTransitioning(false);

    // Se chegou no clone do primeiro (fim visual) -> Pula para o primeiro real
    if (currentHeroIndex >= extendedHeroes.length - 1) {
      setCurrentHeroIndex(1);
    }
    // Se chegou no clone do último (início visual) -> Pula para o último real
    if (currentHeroIndex <= 0) {
      setCurrentHeroIndex(extendedHeroes.length - 2);
    }
  };

  // --- GESTOS ---

  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsPaused(true);
    isDragging.current = false;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    touchStartX.current = clientX;
  };

  const handleDragMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (touchStartX.current === null) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    touchEndX.current = clientX;
    
    if (Math.abs(clientX - touchStartX.current) > 10) {
        isDragging.current = true;
    }
  };

  const handleDragEnd = () => {
    setIsPaused(false);
    
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const distance = touchStartX.current - touchEndX.current;
      if (distance > 50) handleNextSlide();
      else if (distance < -50) handlePrevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
    setTimeout(() => { isDragging.current = false; }, 100);
  };

  const getRealIndex = () => {
    if (extendedHeroes.length === 0) return 0;
    if (currentHeroIndex === 0) return featuredChallenges.length - 1;
    if (currentHeroIndex === extendedHeroes.length - 1) return 0;
    return currentHeroIndex - 1;
  };

  // --- RENDER ---

  const renderForYou = () => {
    if (featuredChallenges.length === 0) return null;

    return (
      <>
        <section 
          className="relative overflow-hidden group mb-8 animate-fade-in select-none rounded-3xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            ref={sliderRef}
            className="flex touch-pan-y"
            style={{ 
              transform: `translateX(-${currentHeroIndex * 100}%)`,
              transition: isTransitioning ? 'transform 500ms cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
              cursor: isDragging.current ? 'grabbing' : 'grab'
            }}
            onTransitionEnd={handleTransitionEnd}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            {extendedHeroes.map((challenge, idx) => (
              <div key={`${challenge.id}-${idx}`} className="min-w-full px-1 relative" onClick={() => handleHeroClick(challenge.id)}>
                <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src={idx % 3 === 0 ? "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000" : idx % 3 === 1 ? "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=1000" : "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000"} 
                    alt={challenge.title} 
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent p-6 flex flex-col justify-end pointer-events-none">
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="bg-primary/90 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg flex items-center"><Zap size={10} className="mr-1 fill-white" /> Em Alta</span>
                        {challenge.pointsReward > 150 && <span className="bg-amber-500/90 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg flex items-center"><Award size={10} className="mr-1 fill-white" /> Épico</span>}
                    </div>
                    <h2 className="text-xl md:text-2xl font-black text-white mb-2 leading-tight drop-shadow-md">{challenge.title}</h2>
                    <p className="text-xs text-slate-200 mb-4 line-clamp-2 max-w-[85%] font-medium opacity-90">{challenge.description}</p>
                    <div className="flex items-center justify-between mt-2 pointer-events-auto">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-primary font-black shadow-inner">{challenge.title.charAt(0)}</div>
                        <div className="flex flex-col"><span className="text-[10px] text-white font-bold block">SkillForge Premium</span><span className="text-[8px] text-slate-300 font-medium flex items-center">4,9 ★ • {challenge.participants}+ Resolvido</span></div>
                      </div>
                      <button className="bg-primary hover:bg-indigo-500 text-white px-8 py-2.5 rounded-full text-xs font-black uppercase tracking-tighter transition-all shadow-xl shadow-primary/30 active:scale-95">Resolver</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-20 md:bottom-6 left-0 right-0 flex justify-center gap-1.5 pointer-events-none z-10">
            {featuredChallenges.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${getRealIndex() === i ? 'w-6 bg-white' : 'w-1.5 bg-white/40'}`} />
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-lg font-black text-white tracking-tight">Sugerido para você</h3>
            <ArrowRight size={20} className="text-slate-500 cursor-pointer hover:text-white transition-colors" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {suggestedChallenges.map((challenge, idx) => (
              <div key={challenge.id} className="flex items-center gap-4 group cursor-pointer active:scale-95 transition-all p-2 rounded-2xl hover:bg-slate-800/30" onClick={() => { audio.playTap(); navigate(`/challenge/${challenge.id}`); }}>
                <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 overflow-hidden shrink-0 group-hover:scale-105 transition-transform shadow-md">
                  <div className="w-full h-full bg-gradient-to-br from-indigo-500/20 to-purple-600/20 flex items-center justify-center text-primary font-black text-xl">{challenge.title.charAt(0)}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-white truncate">{challenge.title}</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">{challenge.category} • {challenge.difficulty}</p>
                  <div className="flex items-center mt-1"><span className="text-[10px] text-slate-300 mr-1 font-bold">4,6</span><Star size={10} className="text-slate-400 fill-current" /><span className="text-[10px] text-slate-500 ml-2">48 MB</span></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4 mt-8 overflow-hidden">
          <div className="flex items-center gap-2 mb-4 px-1">
            <h3 className="text-lg font-black text-white tracking-tight">Laboratórios em alta</h3>
            <TrendingUp size={18} className="text-primary" />
          </div>
          <div className="relative w-full">
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none"></div>
              <div className="flex gap-5 w-max animate-marquee hover-pause">
              {marqueeChallenges.map((c, index) => (
                  <div key={`${c.id}-${index}`} className="min-w-[130px] max-w-[130px] group cursor-pointer transform transition-transform hover:scale-105" onClick={() => { audio.playTap(); navigate(`/challenge/${c.id}`); }}>
                  <div className="aspect-square bg-slate-800 rounded-[28px] border border-slate-700 mb-3 flex items-center justify-center text-primary/40 text-4xl font-black shadow-lg overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
                      <span className="relative z-10">{c.title.charAt(0)}</span>
                  </div>
                  <h5 className="text-[11px] font-bold text-slate-200 truncate px-1">{c.title}</h5>
                  <p className="text-[9px] text-slate-500 mt-0.5 px-1">{c.category}</p>
                  <div className="flex items-center px-1 mt-1"><span className="text-[9px] text-slate-400 font-bold">4,9</span><Star size={8} className="text-slate-500 ml-0.5 fill-current" /></div>
                  </div>
              ))}
              </div>
          </div>
        </section>
      </>
    );
  };

  const renderLeaderboard = () => {
    const sortedUsers = [...MOCK_USERS].sort((a, b) => b.points - a.points);
    return (
      <div className="space-y-4 animate-fade-in">
        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 mb-6">
          <h3 className="text-white font-bold text-lg flex items-center gap-2"><Crown className="text-yellow-500" /> Melhores Forjadores</h3>
          <p className="text-slate-400 text-xs mt-1">Classificação global baseada em XP total.</p>
        </div>
        <div className="space-y-3">
          {sortedUsers.map((user, index) => {
            let rankIcon; let rankClass = "text-slate-400 font-bold w-6 text-center";
            if (index === 0) { rankIcon = <Crown size={20} className="text-yellow-500 fill-yellow-500/20" />; rankClass = ""; } 
            else if (index === 1) { rankIcon = <Award size={20} className="text-slate-300 fill-slate-300/20" />; rankClass = ""; } 
            else if (index === 2) { rankIcon = <Award size={20} className="text-amber-700 fill-amber-700/20" />; rankClass = ""; }
            return (
              <div key={user.id} className="flex items-center bg-card p-4 rounded-xl border border-slate-700/50 hover:border-slate-500 transition-colors">
                <div className="flex items-center justify-center w-8 mr-2">{rankIcon || <span className={rankClass}>{index + 1}</span>}</div>
                <div className="relative mr-4"><div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white border border-slate-600">{user.name.charAt(0)}</div>{index < 3 && <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-dark"></div>}</div>
                <div className="flex-1"><h4 className="text-white font-bold text-sm">{user.name}</h4><span className="text-xs text-slate-500">{user.role === 'Teacher' ? 'Instrutor Mestre' : `Nível ${user.level}`}</span></div>
                <div className="text-right"><span className="block text-primary font-black text-sm">{user.points} XP</span></div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderKids = () => {
    const easyChallenges = MOCK_CHALLENGES.filter(c => c.difficulty === Difficulty.EASY);
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 rounded-3xl text-white shadow-lg relative overflow-hidden">
           <div className="relative z-10"><h3 className="text-xl font-black mb-2">Modo Iniciante</h3><p className="text-sm opacity-90 mb-4">Comece sua jornada aqui! Desafios simplificados para aprender a lógica sem complicação.</p></div>
           <Zap className="absolute -right-4 -bottom-4 text-white/20 w-32 h-32 rotate-12" />
        </div>
        <div className="grid grid-cols-1 gap-4">{easyChallenges.map(c => <ChallengeCard key={c.id} challenge={c} />)}{easyChallenges.length === 0 && <p className="text-slate-500 text-center py-10">Nenhum desafio para iniciantes disponível.</p>}</div>
      </div>
    );
  };

  const renderPremium = () => {
    const premiumChallenges = MOCK_CHALLENGES.filter(c => c.pointsReward > 150 || c.costToUnlock > 0);
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-6 rounded-3xl text-white shadow-lg relative overflow-hidden">
           <div className="relative z-10"><h3 className="text-xl font-black mb-2 flex items-center gap-2"><Crown size={24} fill="white" /> SkillForge Premium</h3><p className="text-sm opacity-90 mb-4">Acesse desafios profissionais criados por empresas parceiras e ganhe certificações.</p><button className="bg-white text-orange-600 px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-orange-50 transition-colors">Assinar Agora</button></div>
        </div>
        <div><h4 className="text-white font-bold mb-4">Desafios Exclusivos</h4><div className="space-y-4">{premiumChallenges.map(c => (<div key={c.id} className="relative group"><ChallengeCard challenge={c} />{c.isLocked && (<div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur text-amber-500 px-2 py-1 rounded text-[10px] font-bold flex items-center border border-amber-500/30"><Lock size={10} className="mr-1" /> PREMIUM</div>)}</div>))}</div></div>
      </div>
    );
  };

  const renderCategories = () => {
    const categories = [
      { id: Category.DEV, label: 'Programação', icon: Code, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30' },
      { id: Category.NET, label: 'Redes', icon: Globe, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' },
      { id: Category.DB, label: 'Dados', icon: Database, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/30' },
      { id: Category.LOGIC, label: 'Lógica', icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/30' },
    ];
    return (
      <div className="animate-fade-in">
        <div className="grid grid-cols-2 gap-4">
          {categories.map((cat) => (
            <div key={cat.id} className={`p-6 rounded-2xl border ${cat.bg} flex flex-col items-center justify-center text-center cursor-pointer hover:scale-105 transition-transform`} onClick={() => { audio.playTap(); }}>
              <cat.icon size={40} className={`mb-3 ${cat.color}`} />
              <span className="text-white font-bold text-sm">{cat.label}</span>
              <span className="text-slate-500 text-xs mt-1">Explorar</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen pb-24 md:pb-8 relative">
      <div className="sticky top-0 z-40 bg-dark/95 backdrop-blur-md border-b border-slate-800/50 pt-2 no-print overflow-hidden">
        <div className="flex gap-6 px-4 overflow-x-auto no-scrollbar">
          {filters.map((filter) => (
            <button key={filter} onClick={() => { audio.playTap(); setActiveFilter(filter); }} className={`pb-3 text-sm font-bold whitespace-nowrap transition-all relative ${activeFilter === filter ? 'text-primary' : 'text-slate-400 hover:text-slate-200'}`}>
              {filter}
              {activeFilter === filter && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full animate-slide-up"></span>}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-6 space-y-8 max-w-5xl mx-auto w-full">
        {activeFilter === 'Para você' && renderForYou()}
        {activeFilter === 'Tabelas de classificação' && renderLeaderboard()}
        {activeFilter === 'Crianças' && renderKids()}
        {activeFilter === 'Premium' && renderPremium()}
        {activeFilter === 'Categorias' && renderCategories()}
      </div>

      <button onClick={() => { audio.playTap(); setShowGlobalMentor(true); }} className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-40 w-14 h-14 bg-gradient-to-tr from-primary to-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/30 border border-white/10 hover:scale-110 active:scale-95 transition-all group">
        <Bot size={28} className="group-hover:rotate-12 transition-transform" />
      </button>

      <AIMentorModal isOpen={showGlobalMentor} onClose={() => setShowGlobalMentor(false)} challengeTitle="Mentor Global SkillForge" challengeDesc="Estou aqui para ajudar com qualquer dúvida sobre tecnologia, carreira ou estudos." />
    </div>
  );
};

export default Home;
