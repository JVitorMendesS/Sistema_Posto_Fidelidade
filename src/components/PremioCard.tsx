import React from 'react';
import { Premio } from '../types';

interface PremioCardProps {
  premio: Premio;
  onResgatar: (premio: Premio) => void;
  pontosDisponiveis: number;
}

export function PremioCard({ premio, onResgatar, pontosDisponiveis }: PremioCardProps) {
  const podeResgatar = pontosDisponiveis >= premio.pontosNecessarios;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img 
        src={premio.imagem} 
        alt={premio.nome} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{premio.nome}</h3>
        <p className="text-gray-600 mb-4">{premio.descricao}</p>
        <div className="flex justify-between items-center">
          <span className="text-blue-600 font-bold">
            {premio.pontosNecessarios} pontos
          </span>
          <button
            onClick={() => onResgatar(premio)}
            disabled={!podeResgatar}
            className={`px-4 py-2 rounded-lg ${
              podeResgatar
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Resgatar
          </button>
        </div>
      </div>
    </div>
  );
}