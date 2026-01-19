
import React from 'react';
import { Gamepad2, LayoutGrid, Gift, MessageSquare } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { audio } from '../utils/audio';

const BottomNav: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { to: '/', icon: Gamepad2, label: 'Desafios' },
    { to: '/logic', icon: LayoutGrid, label: 'Lógica' },
    { to: '/companies', icon: Gift, label: 'Vagas' },
    { to: '/messages', icon: MessageSquare, label: 'Conversas' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-dark/95 backdrop-blur-md border-t border-slate-800 px-2 h-16 flex items-center justify-around z-[100]">
      {navItems.map((item) => {
        const isActive = location.pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={() => audio.playTab()}
            className="flex flex-col items-center justify-center flex-1 space-y-1 group"
          >
            <div className={`
              px-5 py-1 rounded-full transition-all duration-300
              ${isActive ? 'bg-primary/20 text-primary' : 'text-slate-500 group-hover:text-slate-300'}
            `}>
              <item.icon size={20} className={isActive ? 'fill-current' : ''} />
            </div>
            <span className={`text-[10px] font-bold ${isActive ? 'text-white' : 'text-slate-500'}`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
