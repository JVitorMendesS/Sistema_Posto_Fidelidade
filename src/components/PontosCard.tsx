import React from 'react';
import { Award } from 'lucide-react';

interface PontosCardProps {
  pontos: number;
}

export function PontosCard({ pontos }: PontosCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
      <div className="flex justify-center mb-4">
        <Award size={48} className="text-blue-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Seus Pontos</h2>
      <p className="text-4xl font-bold text-blue-600">{pontos}</p>
      <p className="text-gray-600 mt-2">pontos disponíveis</p>
    </div>
  );
}