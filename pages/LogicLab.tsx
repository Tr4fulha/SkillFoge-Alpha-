
import React, { useState } from 'react';
import { Puzzle, Brain, Cpu, Layers, ArrowRight, RotateCcw, Check, X, ChevronLeft } from 'lucide-react';
import { audio } from '../utils/audio';

const FLASHCARDS = [
  { id: 1, question: "Qual camada do modelo OSI trata do roteamento de pacotes?", answer: "Camada 3 (Rede)" },
  { id: 2, question: "O que significa DNS?", answer: "Domain Name System (Sistema de Nomes de Domínio)" },
  { id: 3, question: "Em SQL, qual comando remove todos os registros mas mantém a estrutura da tabela?", answer: "TRUNCATE TABLE" },
  { id: 4, question: "Qual a complexidade de tempo de busca em uma Árvore Binária balanceada?", answer: "O(log n)" },
];

const LogicLab: React.FC = () => {
  const [view, setView] = useState<'MENU' | 'FLASHCARDS'>('MENU');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionStats, setSessionStats] = useState({ correct: 0, wrong: 0 });

  const handleFlip = () => {
    audio.playFlip();
    setIsFlipped(!isFlipped);
  };

  const handleFlashcardResult = (correct: boolean) => {
    if (correct) {
      audio.playTap();
    } else {
      audio.playError();
    }

    setSessionStats(prev => ({
      correct: correct ? prev.correct + 1 : prev.correct,
      wrong: !correct ? prev.wrong + 1 : prev.wrong
    }));
    
    if (currentCardIndex < FLASHCARDS.length - 1) {
      setTimeout(() => {
        setIsFlipped(false);
        setCurrentCardIndex(prev => prev + 1);
      }, 300);
    } else {
      audio.playSuccess();
      alert(`Sessão finalizada! Acertos: ${correct ? sessionStats.correct + 1 : sessionStats.correct}`);
      setView('MENU');
      setCurrentCardIndex(0);
      setSessionStats({ correct: 0, wrong: 0 });
      setIsFlipped(false);
    }
  };

  const changeView = (v: 'MENU' | 'FLASHCARDS') => {
    audio.playTab();
    setView(v);
  };

  return (
    <div className="p-4 space-y-6 pb-20">
        {view === 'MENU' ? (
          <>
            <div className="text-center py-4">
                <h1 className="text-2xl font-bold text-white mb-2">Laboratório de Lógica</h1>
                <p className="text-sm text-slate-400">Treine seu cérebro com puzzles rápidos. Ganhe pontos sem escrever código.</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
                <div 
                  onClick={() => changeView('FLASHCARDS')}
                  className="bg-gradient-to-br from-indigo-900/50 to-slate-900 p-5 rounded-2xl border border-indigo-500/30 relative overflow-hidden group cursor-pointer hover:border-indigo-500 transition-all"
                >
                    <div className="flex items-start justify-between relative z-10">
                        <div>
                            <div className="p-2 bg-indigo-500 rounded-lg w-min text-white mb-3">
                                <Layers size={24} />
                            </div>
                            <h3 className="font-bold text-lg text-white">Flashcards de Revisão</h3>
                            <p className="text-xs text-slate-300 mt-1">Memorização rápida de conceitos teóricos.</p>
                        </div>
                    </div>
                </div>
                {/* Outros itens... */}
            </div>
          </>
        ) : (
          <div className="flex flex-col h-[calc(100vh-140px)]">
             <div className="flex items-center mb-4">
                <button onClick={() => changeView('MENU')} className="p-2 hover:bg-slate-800 rounded-full text-slate-400">
                   <ChevronLeft size={24} />
                </button>
                <div className="flex-1 text-center">
                   <span className="text-sm font-bold text-slate-300">Cartão {currentCardIndex + 1} de {FLASHCARDS.length}</span>
                </div>
             </div>

             <div className="flex-1 flex flex-col items-center justify-center relative perspective-1000">
                <div 
                  className={`w-full max-w-sm h-80 bg-slate-800 rounded-2xl border border-slate-600 p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-500 transform-style-3d shadow-2xl ${isFlipped ? 'rotate-y-180' : ''}`}
                  onClick={handleFlip}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                   <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-6">
                      <span className="text-indigo-400 font-bold mb-4 text-sm uppercase tracking-widest">Pergunta</span>
                      <p className="text-xl text-white font-medium">{FLASHCARDS[currentCardIndex].question}</p>
                   </div>
                   <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-6 bg-slate-900 rounded-2xl border border-indigo-500/50" style={{ transform: 'rotateY(180deg)' }}>
                      <span className="text-emerald-400 font-bold mb-4 text-sm uppercase tracking-widest">Resposta</span>
                      <p className="text-lg text-white">{FLASHCARDS[currentCardIndex].answer}</p>
                   </div>
                </div>
             </div>

             {isFlipped && (
               <div className="mt-8 flex justify-center gap-6 animate-in slide-in-from-bottom duration-300">
                  <button onClick={() => handleFlashcardResult(false)} className="flex flex-col items-center gap-2 group">
                     <div className="w-14 h-14 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all">
                        <X size={28} />
                     </div>
                  </button>
                  <button onClick={() => handleFlashcardResult(true)} className="flex flex-col items-center gap-2 group">
                     <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all">
                        <Check size={28} />
                     </div>
                  </button>
               </div>
             )}
          </div>
        )}
    </div>
  );
};

export default LogicLab;
