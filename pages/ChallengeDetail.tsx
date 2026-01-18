
import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { MOCK_CHALLENGES, MOCK_COMMENTS, MOCK_SOLUTIONS, CURRENT_USER } from '../constants';
import { ArrowLeft, MessageCircle, CheckCircle, UploadCloud, ThumbsUp, Send, User, ShieldCheck, Lock, Lightbulb, Code, Sparkles } from 'lucide-react';
import AIMentorModal from '../components/AIMentorModal';
import CodeEditor from '../components/CodeEditor';
import { Challenge, Hint } from '../types';

type Tab = 'INSTRUCTIONS' | 'FORUM' | 'VALIDATION';

const ChallengeDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const challenge = (MOCK_CHALLENGES.find(c => c.id === id) || location.state?.challenge) as Challenge | undefined;

  const [activeTab, setActiveTab] = useState<Tab>('INSTRUCTIONS');
  const [showMentor, setShowMentor] = useState(false);
  const [submission, setSubmission] = useState('');
  const [progress, setProgress] = useState(0);
  const [unlockedHints, setUnlockedHints] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!challenge) return (
    <div className="p-8 text-center text-white">
      Desafio não encontrado. 
      <button onClick={() => navigate('/')} className="text-primary underline ml-2">Voltar para Home</button>
    </div>
  );

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleFinish = () => {
    setIsCompleted(true);
    // Em uma app real, aqui atualizaríamos o contexto global de pontos
    alert(`Parabéns! Você ganhou ${challenge.pointsReward} pontos!`);
    handleBack();
  };

  const toggleHint = (hint: Hint) => {
    if (unlockedHints.includes(hint.id)) return;
    if (progress < hint.minProgress) return;
    
    if (window.confirm(`Desbloquear dica por ${hint.cost} moedas?`)) {
        setUnlockedHints([...unlockedHints, hint.id]);
        // Lógica de débito de pontos aqui
    }
  };

  const isForumLocked = progress < 90;

  return (
    <div className="flex flex-col min-h-screen bg-dark pb-20 md:pb-0">
      <div className="bg-card px-4 py-3 sticky top-0 border-b border-slate-700 z-30 flex items-center justify-between">
        <button onClick={handleBack} className="text-slate-300 p-1 hover:text-white transition-colors">
          <ArrowLeft size={24} />
        </button>
        <span className="font-bold text-sm text-slate-200 truncate px-2">{challenge.title}</span>
        <div className="flex items-center space-x-2">
            <div className="bg-yellow-500/20 text-yellow-500 text-[10px] font-bold px-2 py-1 rounded border border-yellow-500/30">
                +{challenge.pointsReward} XP
            </div>
        </div> 
      </div>

      <div className="flex flex-col md:flex-row md:h-[calc(100vh-60px)] md:overflow-hidden">
        <div className="md:w-1/3 md:overflow-y-auto md:border-r md:border-slate-800 scrollbar-hide">
            <div className="p-5 bg-gradient-to-b from-card to-dark border-b border-slate-800">
                <h1 className="text-xl font-bold text-white mb-2">{challenge.title}</h1>
                <div className="bg-slate-800/50 p-3 rounded-lg border border-indigo-500/30 mb-2">
                    <div className="flex justify-between text-xs text-indigo-300 mb-1 font-bold">
                        <span>Progresso na Solução</span>
                        <span>{progress}%</span>
                    </div>
                    <input 
                        type="range" min="0" max="100" value={progress} 
                        onChange={(e) => setProgress(Number(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                </div>
            </div>

            <div className="flex border-b border-slate-700 bg-card/50">
                {['INSTRUCTIONS', 'FORUM', 'VALIDATION'].map((t) => (
                    <button 
                        key={t} onClick={() => setActiveTab(t as Tab)}
                        className={`flex-1 py-3 text-xs font-bold border-b-2 transition-all ${activeTab === t ? 'border-primary text-primary' : 'border-transparent text-muted'}`}
                    >
                        {t === 'INSTRUCTIONS' ? 'Instruções' : t === 'FORUM' ? 'Fórum' : 'Validação'}
                    </button>
                ))}
            </div>

            <div className="p-5 space-y-6">
                {activeTab === 'INSTRUCTIONS' && (
                    <div className="space-y-4">
                        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 text-sm text-slate-300">
                            <p>{challenge.description}</p>
                        </div>
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Dicas Progressivas</h3>
                        {challenge.hints?.map(h => (
                             <div key={h.id} className={`p-3 rounded-lg border transition-all ${unlockedHints.includes(h.id) ? 'bg-indigo-950/30 border-primary/50' : 'bg-slate-900 border-slate-700'}`}>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-[10px] font-bold text-slate-400">{h.title}</span>
                                    {!unlockedHints.includes(h.id) && (
                                        <button 
                                            onClick={() => toggleHint(h)}
                                            disabled={progress < h.minProgress}
                                            className="text-[10px] bg-yellow-600 text-white px-2 py-0.5 rounded disabled:opacity-30"
                                        >
                                            -{h.cost} pts
                                        </button>
                                    )}
                                </div>
                                {unlockedHints.includes(h.id) ? <p className="text-xs text-slate-300">{h.content}</p> : <div className="text-[10px] text-slate-600">Requer {h.minProgress}% de progresso</div>}
                             </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

        <div className="md:w-2/3 md:overflow-y-auto bg-dark p-5 md:p-8">
            {activeTab === 'INSTRUCTIONS' && (
                <div className="space-y-4 max-w-3xl">
                    <CodeEditor 
                        value={submission} onChange={setSubmission}
                        placeholder="// Digite sua solução técnica..."
                        className="h-64 md:h-96 w-full shadow-2xl"
                    />
                    <div className="flex gap-3 pt-4">
                        <button onClick={() => setShowMentor(true)} className="flex-1 py-3 bg-slate-800 text-indigo-300 rounded-lg font-bold border border-slate-700 hover:bg-slate-700 transition-colors">
                            <Sparkles size={18} className="inline mr-2" /> IA Mentor
                        </button>
                        <button onClick={handleFinish} className="flex-[2] py-3 bg-secondary text-white rounded-lg font-bold shadow-lg hover:bg-emerald-600 transition-colors">
                            <CheckCircle size={18} className="inline mr-2" /> Enviar e Ganhar XP
                        </button>
                    </div>
                </div>
            )}
        </div>
      </div>

      <AIMentorModal 
        isOpen={showMentor} onClose={() => setShowMentor(false)}
        challengeTitle={challenge.title} challengeDesc={challenge.description}
      />
    </div>
  );
};

export default ChallengeDetail;
