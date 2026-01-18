import React from 'react';
import { MOCK_COMPANIES } from '../constants';
import { Briefcase, Building, ChevronRight, UserCheck } from 'lucide-react';

const Companies: React.FC = () => {
  return (
    <div className="p-4 space-y-4 pb-20">
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <h2 className="text-white font-bold text-lg mb-2">Oportunidades</h2>
        <p className="text-sm text-slate-400">Empresas buscam talentos baseados em resultados práticos, não apenas diplomas.</p>
      </div>

      <h3 className="font-semibold text-slate-300 mt-4">Empresas Parceiras</h3>
      <div className="space-y-3">
        {MOCK_COMPANIES.map(company => (
            <div key={company.id} className="bg-card p-4 rounded-xl border border-slate-700 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <img src={company.logoUrl} alt={company.name} className="w-12 h-12 rounded-lg bg-slate-700 object-cover" />
                    <div>
                        <h4 className="font-bold text-white text-sm">{company.name}</h4>
                        <span className="text-xs text-slate-500 block">{company.industry}</span>
                        <div className="flex items-center mt-1 text-xs text-secondary">
                            <Briefcase size={12} className="mr-1" />
                            {company.openPositions} Vagas abertas
                        </div>
                    </div>
                </div>
                <ChevronRight size={20} className="text-slate-600" />
            </div>
        ))}
      </div>

      <div className="mt-8 bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-5 border border-slate-700 relative overflow-hidden">
        <div className="relative z-10">
            <h3 className="font-bold text-white text-lg mb-2">Caça-Talentos</h3>
            <p className="text-sm text-slate-400 mb-4">
                Complete 5 desafios de nível "Difícil" para aparecer no radar das empresas parceiras.
            </p>
            <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                <div className="bg-secondary h-2 rounded-full" style={{ width: '20%' }}></div>
            </div>
            <p className="text-xs text-right text-slate-500">1/5 Concluídos</p>
        </div>
        <UserCheck size={80} className="absolute right-[-10px] bottom-[-10px] text-slate-700/50" />
      </div>
    </div>
  );
};

export default Companies;
