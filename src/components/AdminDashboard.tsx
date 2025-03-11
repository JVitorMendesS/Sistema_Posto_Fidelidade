import React, { useState } from 'react';
import { Users, Plus, Minus, Search } from 'lucide-react';
import { Cliente } from '../types';

interface AdminDashboardProps {
  clientes: Cliente[];
  onCreditarPontos: (clienteId: string, pontos: number) => void;
  onDebitarPontos: (clienteId: string, pontos: number) => void;
}

export function AdminDashboard({ clientes, onCreditarPontos, onDebitarPontos }: AdminDashboardProps) {
  const [selectedClienteId, setSelectedClienteId] = useState('');
  const [pontos, setPontos] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleCreditarPontos = () => {
    if (selectedClienteId && pontos) {
      onCreditarPontos(selectedClienteId, Number(pontos));
      setPontos('');
    }
  };

  const handleDebitarPontos = () => {
    if (selectedClienteId && pontos) {
      onDebitarPontos(selectedClienteId, Number(pontos));
      setPontos('');
    }
  };

  const filteredClientes = clientes.filter(cliente => 
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.cpf.includes(searchTerm) ||
    cliente.telefone.includes(searchTerm)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-8">
        <Users className="text-blue-600" size={32} />
        <h1 className="text-2xl font-bold text-gray-800">Painel Administrativo</h1>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Gerenciar Pontos</h2>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
          <div className="lg:col-span-2">
            <label htmlFor="search" className="block text-gray-700 font-medium mb-2">
              Pesquisar Cliente
            </label>
            <div className="relative">
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nome, email, CPF ou telefone"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>

          <div>
            <label htmlFor="cliente" className="block text-gray-700 font-medium mb-2">
              Selecionar Cliente
            </label>
            <select
              id="cliente"
              value={selectedClienteId}
              onChange={(e) => setSelectedClienteId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione um cliente</option>
              {filteredClientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nome} - {cliente.cpf}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="pontos" className="block text-gray-700 font-medium mb-2">
              Quantidade de Pontos
            </label>
            <input
              type="number"
              id="pontos"
              value={pontos}
              onChange={(e) => setPontos(e.target.value)}
              min="1"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="lg:col-span-4 flex gap-4 justify-end">
            <button
              onClick={handleCreditarPontos}
              disabled={!selectedClienteId || !pontos}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300"
            >
              <Plus size={20} />
              Creditar
            </button>
            
            <button
              onClick={handleDebitarPontos}
              disabled={!selectedClienteId || !pontos}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-300"
            >
              <Minus size={20} />
              Debitar
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
        <h2 className="text-xl font-bold text-gray-800 p-6 border-b">Lista de Clientes</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CPF
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Telefone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pontos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Último Abastecimento
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {cliente.nome}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {cliente.cpf}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {cliente.telefone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {cliente.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {cliente.pontos}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {cliente.historicoAbastecimentos[0]?.data.toLocaleDateString() || 'Nenhum'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}