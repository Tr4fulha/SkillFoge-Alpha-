
import React from 'react';
import { Bell, Search, Mic } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { audio } from '../utils/audio';
import { useNavigate } from 'react-router-dom';

const TopBar: React.FC = () => {
  const { user, isMuted, toggleMute } = useUser();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-dark/95 backdrop-blur-md px-4 py-3 flex items-center gap-4">
      {/* Search Style Input (Estilo Play Store) */}
      <div className="flex-1 flex items-center play-search px-4 py-2.5 space-x-3 cursor-text">
        <Search size={18} className="text-slate-400" />
        <input 
          type="text" 
          placeholder="Pesquisar desafios e apps" 
          className="bg-transparent border-none focus:ring-0 text-sm w-full text-slate-200 placeholder:text-slate-500"
          onFocus={() => audio.playTap()}
        />
        <Mic size={18} className="text-slate-400 cursor-pointer hover:text-white" />
      </div>

      <div className="flex items-center space-x-4 shrink-0">
        <button 
          onClick={() => { audio.playTap(); }}
          className="relative text-slate-400 hover:text-white p-1"
        >
          <Bell size={22} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div 
          onClick={() => { audio.playTab(); navigate('/profile'); }}
          className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-purple-600 border border-slate-700 flex items-center justify-center text-[10px] font-black cursor-pointer shadow-lg active:scale-90 transition-transform"
        >
          {user.name.charAt(0)}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
