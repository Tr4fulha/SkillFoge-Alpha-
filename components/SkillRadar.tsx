import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Category } from '../types';

interface SkillRadarProps {
  skills: { [key in Category]: number };
}

const SkillRadar: React.FC<SkillRadarProps> = ({ skills }) => {
  const data = Object.entries(skills).map(([key, value]) => ({
    subject: key,
    A: value,
    fullMark: 100,
  }));

  return (
    <div className="h-64 w-full bg-card rounded-xl border border-slate-700 p-2 shadow-sm">
      <h3 className="text-center text-sm font-medium text-muted mb-2">Radar de Competências</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#475569" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
          <Radar
            name="Skills"
            dataKey="A"
            stroke="#6366f1"
            strokeWidth={2}
            fill="#6366f1"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillRadar;
