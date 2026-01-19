
import React from 'react';
import { Home, User, Briefcase, Puzzle, X, MessageSquare } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useScrollLock } from '../utils/hooks';

const NavItem = ({ to, icon: Icon, label, active, onClick }: { to: string; icon: any; label: string; active: boolean; onClick?: () => void }) => (
  <Link 
    to={to} 
    onClick={onClick}
    className={`
      flex items-center 
      w-full py-3 px-6 
      space-x-4
      transition-colors duration-200
      ${active 
        ? 'text-primary bg-primary/10 border-r-2 border-primary' 
        : 'text-muted hover:text-slate-200 hover:bg-slate-800/50'}
    `}
  >
    <Icon size={20} />
    <span className="text-sm font-medium">{label}</span>
  </Link>
);

interface NavigationProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  // Usando o hook customizado para gerenciar o scroll
  useScrollLock(!!isOpen);

  return (
    <>
        {/* Mobile Overlay */}
        {isOpen && (
            <div 
                className="fixed inset-0 bg-black/60 z-[60] md:hidden backdrop-blur-sm" 
                onClick={onClose}
            />
        )}
        
        <nav className={`
            fixed top-0 left-0 bottom-0 w-64 bg-dark border-r border-slate-700 
            flex flex-col z-[70] transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0 md:top-14 md:bottom-0 md:z-30 md:pt-6
            shadow-2xl md:shadow-none
        `}>
            {/* Mobile Header with Close Button */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-700 mb-2">
                <span className="font-bold text-lg text-white">Menu</span>
                <button onClick={onClose} className="text-slate-400 hover:text-white">
                    <X size={24} />
                </button>
            </div>

            <div className="flex flex-col space-y-1">
                <NavItem to="/" icon={Home} label="Desafios" active={location.pathname === '/'} onClick={onClose} />
                <NavItem to="/logic" icon={Puzzle} label="Lógica" active={location.pathname === '/logic'} onClick={onClose} />
                <NavItem to="/companies" icon={Briefcase} label="Vagas" active={location.pathname === '/companies'} onClick={onClose} />
                <NavItem to="/messages" icon={MessageSquare} label="Conversas" active={location.pathname === '/messages'} onClick={onClose} />
                <NavItem to="/profile" icon={User} label="Perfil" active={location.pathname === '/profile'} onClick={onClose} />
            </div>
        </nav>
    </>
  );
};

export default Navigation;
