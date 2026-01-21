
import React, { useState, useEffect } from 'react';
import { Sparkles, Bug, Rocket, ChevronRight, X, Bot } from 'lucide-react';
import { audio } from '../utils/audio';
import { useScrollLock } from '../utils/hooks';

interface Step {
  title: string;
  content: string;
  icon: React.ReactNode;
  color: string;
}

const STEPS: Step[] = [
  {
    title: "Bem-vindo à SkillForge!",
    content: "Eu sou o Forge-Bot, seu guia nesta jornada técnica. Estamos muito felizes em ter você aqui para forjar suas habilidades!",
    icon: <Sparkles className="text-yellow-400" />,
    color: "bg-indigo-600"
  },
  {
    title: "Projeto em Versão Alpha",
    content: "Atenção, forjador! Este é um projeto em fase inicial (Alfa). Você poderá encontrar bugs ou instabilidades, mas faz parte da construção!",
    icon: <Bug className="text-red-400" />,
    color: "bg-slate-800"
  },
  {
    title: "Como funciona?",
    content: "Resolva desafios práticos de Programação, Redes e Banco de Dados para ganhar XP e subir de nível. Sem enrolação, só prática!",
    icon: <Rocket className="text-emerald-400" />,
    color: "bg-indigo-600"
  },
  {
    title: "No Radar das Empresas",
    content: "Seu desempenho aqui cria seu currículo técnico real. As melhores empresas parceiras estão de olho no seu progresso.",
    icon: <Bot className="text-primary" />,
    color: "bg-slate-800"
  }
];

const Onboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Trava o scroll do fundo se o onboarding estiver visível
  useScrollLock(isVisible);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('skillforge_onboarding_seen');
    if (!hasSeenOnboarding) {
      setIsVisible(true);
    }
  }, []);

  const handleNext = () => {
    audio.playTab();
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      finishOnboarding();
    }
  };

  const finishOnboarding = () => {
    audio.playSuccess();
    setIsVisible(false);
    localStorage.setItem('skillforge_onboarding_seen', 'true');
  };

  if (!isVisible) return null;

  const step = STEPS[currentStep];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-dark/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm flex flex-col items-center">
        
        {/* Personagem Mascot */}
        <div className="mb-6 animate-bounce duration-[2000ms]">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center border-4 border-slate-900 shadow-2xl relative">
             <Bot size={48} className="text-white drop-shadow-lg" />
             <div className="absolute -top-1 -right-1 bg-secondary p-1.5 rounded-full border-2 border-slate-900">
               <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
             </div>
          </div>
        </div>

        {/* Speech Bubble */}
        <div className={`relative w-full ${step.color} rounded-[32px] p-8 shadow-2xl border border-white/10 animate-slide-up`}>
          {/* Arrow Pointer */}
          <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 ${step.color} rotate-45 border-l border-t border-white/10`}></div>
          
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-3 bg-white/10 rounded-2xl">
              {step.icon}
            </div>
            <h2 className="text-xl font-black text-white tracking-tight">
              {step.title}
            </h2>
            <p className="text-sm text-indigo-100 font-medium leading-relaxed">
              {step.content}
            </p>

            <div className="flex items-center justify-center gap-2 w-full pt-4">
              {STEPS.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${currentStep === i ? 'w-6 bg-white' : 'w-1.5 bg-white/30'}`} />
              ))}
            </div>

            <button 
              onClick={handleNext}
              className="w-full mt-4 bg-white text-dark py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center group active:scale-95 transition-all shadow-xl"
            >
              {currentStep === STEPS.length - 1 ? 'Começar Jornada' : 'Próximo'}
              <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>

            {currentStep === 0 && (
              <button 
                onClick={finishOnboarding}
                className="text-[10px] text-white/50 font-bold uppercase tracking-widest hover:text-white transition-colors"
              >
                Pular Introdução
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
