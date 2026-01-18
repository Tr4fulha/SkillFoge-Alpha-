import React, { useState } from 'react';
import { X, Send, Bot } from 'lucide-react';
import { getMentorHelp } from '../services/geminiService';
import { useScrollLock } from '../utils/hooks';

interface AIMentorModalProps {
  isOpen: boolean;
  onClose: () => void;
  challengeTitle: string;
  challengeDesc: string;
}

const AIMentorModal: React.FC<AIMentorModalProps> = ({ isOpen, onClose, challengeTitle, challengeDesc }) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: `Olá! Sou seu mentor virtual. Estou aqui para te guiar no desafio "${challengeTitle}". Qual é sua dúvida?` }
  ]);
  const [loading, setLoading] = useState(false);

  // Usando o hook customizado
  useScrollLock(isOpen);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!query.trim()) return;

    const newMessages = [...messages, { role: 'user' as const, text: query }];
    setMessages(newMessages);
    setQuery('');
    setLoading(true);

    const response = await getMentorHelp(challengeTitle, challengeDesc, query);
    
    setMessages([...newMessages, { role: 'ai', text: response }]);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-card w-full max-w-md h-[80vh] rounded-2xl flex flex-col border border-slate-700 shadow-2xl animate-in zoom-in duration-300">
        {/* Header */}
        <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-primary/10 rounded-t-2xl">
          <div className="flex items-center text-primary">
            <Bot size={24} className="mr-2" />
            <h3 className="font-bold">Mentor IA</h3>
          </div>
          <button onClick={onClose} className="text-muted hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-primary text-white rounded-br-none shadow-md' 
                  : 'bg-slate-700 text-slate-200 rounded-bl-none border border-slate-600'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
             <div className="flex justify-start">
               <div className="bg-slate-700 px-4 py-2 rounded-2xl rounded-bl-none">
                 <div className="flex space-x-1">
                   <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                   <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                   <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                 </div>
               </div>
             </div>
          )}
        </div>

        {/* Input */}
        <div className="p-3 border-t border-slate-700 flex items-center space-x-2 bg-card rounded-b-2xl">
          <input
            type="text"
            className="flex-1 bg-dark border border-slate-600 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-primary placeholder:text-slate-500"
            placeholder="Digite sua dúvida..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={loading}
            className="p-2 bg-primary text-white rounded-full hover:bg-indigo-600 disabled:opacity-50 transition-all shadow-lg shadow-primary/30"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIMentorModal;