
import React, { useState } from 'react';
import { MOCK_USERS } from '../constants';
import { Send, Search, MoreVertical, Phone, Video } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Messages: React.FC = () => {
  const { user } = useUser();
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');

  // Mock initial chats based on other users in the system
  const chats = MOCK_USERS.filter(u => u.id !== user.id).map(u => ({
    id: u.id,
    name: u.name,
    avatar: u.name.charAt(0),
    lastMessage: "Olá! Vi que você completou o desafio de Redes.",
    time: "10:30",
    unread: 2,
    online: true,
    role: u.role
  }));

  const handleSend = () => {
    if (!inputText.trim()) return;
    setInputText('');
    // Mock send logic would go here
  };

  return (
    <div className="flex h-[calc(100vh-64px)] md:h-[calc(100vh-64px)] bg-dark animate-fade-in overflow-hidden">
      {/* Sidebar List */}
      <div className={`
        w-full md:w-80 bg-card border-r border-slate-700 flex flex-col
        ${activeChat ? 'hidden md:flex' : 'flex'}
      `}>
        <div className="p-4 border-b border-slate-700">
          <h1 className="text-xl font-bold text-white mb-4">Conversas</h1>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Buscar conversas..." 
              className="w-full bg-slate-800 text-sm text-white pl-10 pr-4 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-slate-500"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {chats.map(chat => (
            <div 
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={`p-3 rounded-xl cursor-pointer flex items-center gap-3 transition-colors ${activeChat === chat.id ? 'bg-primary/10 border border-primary/20' : 'hover:bg-slate-800'}`}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                  {chat.avatar}
                </div>
                {chat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-slate-200 truncate">{chat.name}</h3>
                  <span className="text-[10px] text-slate-500">{chat.time}</span>
                </div>
                <p className="text-xs text-slate-400 truncate mt-0.5">{chat.lastMessage}</p>
              </div>
              {chat.unread > 0 && (
                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                  {chat.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`
        flex-1 flex-col bg-slate-900/50 relative
        ${activeChat ? 'flex' : 'hidden md:flex'}
      `}>
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="h-16 border-b border-slate-700 flex items-center justify-between px-4 bg-card/50 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <button onClick={() => setActiveChat(null)} className="md:hidden text-slate-400">
                  ←
                </button>
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                  {chats.find(c => c.id === activeChat)?.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">{chats.find(c => c.id === activeChat)?.name}</h3>
                  <span className="text-[10px] text-green-400 flex items-center gap-1">● Online</span>
                </div>
              </div>
              <div className="flex gap-4 text-slate-400">
                <Phone size={20} className="hover:text-white cursor-pointer" />
                <Video size={20} className="hover:text-white cursor-pointer" />
                <MoreVertical size={20} className="hover:text-white cursor-pointer" />
              </div>
            </div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="text-center text-xs text-slate-600 my-4">Hoje</div>
              
              <div className="flex justify-start">
                <div className="bg-slate-800 text-slate-200 p-3 rounded-2xl rounded-bl-none max-w-[80%] text-sm">
                  Olá! Vi que você completou o desafio de Redes. Pode me dar uma dica sobre a VLAN?
                </div>
              </div>
              
              <div className="flex justify-end">
                <div className="bg-primary text-white p-3 rounded-2xl rounded-br-none max-w-[80%] text-sm shadow-lg shadow-primary/10">
                  Claro! O segredo é configurar o Trunk corretamente no switch principal.
                </div>
              </div>

               <div className="flex justify-start">
                <div className="bg-slate-800 text-slate-200 p-3 rounded-2xl rounded-bl-none max-w-[80%] text-sm">
                  Entendi! Vou tentar aqui. Obrigado!
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-card border-t border-slate-700">
              <div className="flex items-center gap-2 bg-slate-800 rounded-full px-4 py-2 border border-slate-700 focus-within:border-primary transition-colors">
                <input 
                  type="text" 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Digite sua mensagem..." 
                  className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder:text-slate-500"
                />
                <button onClick={handleSend} className="p-2 bg-primary text-white rounded-full hover:bg-indigo-500 transition-colors">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-4">
              <Send size={32} className="ml-1" />
            </div>
            <p>Selecione uma conversa para começar</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
