import React from 'react';
import { Fuel, LogOut } from 'lucide-react';

interface HeaderProps {
  onLogout?: () => void;
}

export function Header({ onLogout }: HeaderProps) {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Fuel size={32} />
          <h1 className="text-2xl font-bold">AutoPremium</h1>
        </div>
        <nav className="flex items-center gap-6">
          <ul className="flex gap-6">
            <li>
              <a href="#pontos" className="hover:text-blue-200">Meus Pontos</a>
            </li>
            <li>
              <a href="#premios" className="hover:text-blue-200">Prêmios</a>
            </li>
            <li>
              <a href="#historico" className="hover:text-blue-200">Histórico</a>
            </li>
          </ul>
          {onLogout && (
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors"
            >
              <LogOut size={20} />
              Sair
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}