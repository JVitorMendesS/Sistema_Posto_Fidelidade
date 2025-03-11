import React, { useState } from 'react';
import { Header } from './components/Header';
import { PontosCard } from './components/PontosCard';
import { PremioCard } from './components/PremioCard';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { AdminDashboard } from './components/AdminDashboard';
import { premiosDisponiveis } from './data';
import { Premio, User, Cliente, Abastecimento } from './types';
import { History, Phone } from 'lucide-react';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<'login' | 'register'>('login');
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [historicoAbastecimentos, setHistoricoAbastecimentos] = useState<Abastecimento[]>([]);

  const handleLogin = (email: string, senha: string) => {
    if (email === 'admin@autopremium.com' && senha === 'admin') {
      setUser({ id: '1', nome: 'Administrador', email, tipo: 'admin' });
    } else {
      const cliente = clientes.find(c => c.email === email);
      if (cliente) {
        setUser({ id: cliente.id, nome: cliente.nome, email, tipo: 'cliente' });
        setHistoricoAbastecimentos(cliente.historicoAbastecimentos);
      } else {
        alert('Email ou senha inválidos');
      }
    }
  };

  const handleRegister = (nome: string, email: string, senha: string, cpf: string, telefone: string) => {
    if (clientes.some(c => c.email === email)) {
      alert('Este email já está cadastrado');
      return;
    }

    if (clientes.some(c => c.cpf === cpf)) {
      alert('Este CPF já está cadastrado');
      return;
    }

    const novoCliente: Cliente = {
      id: String(clientes.length + 1),
      nome,
      email,
      cpf,
      telefone,
      pontos: 0,
      historicoAbastecimentos: []
    };
    setClientes([...clientes, novoCliente]);
    setUser({ id: novoCliente.id, nome, email, tipo: 'cliente' });
    setHistoricoAbastecimentos([]);
  };

  const handleCreditarPontos = (clienteId: string, pontos: number) => {
    setClientes(clientes.map(cliente => {
      if (cliente.id === clienteId) {
        return { ...cliente, pontos: cliente.pontos + pontos };
      }
      return cliente;
    }));
  };

  const handleDebitarPontos = (clienteId: string, pontos: number) => {
    setClientes(clientes.map(cliente => {
      if (cliente.id === clienteId) {
        const novosPontos = Math.max(0, cliente.pontos - pontos);
        return { ...cliente, pontos: novosPontos };
      }
      return cliente;
    }));
  };

  if (!user) {
    if (currentPage === 'register') {
      return (
        <RegisterForm
          onRegister={handleRegister}
          onBackToLogin={() => setCurrentPage('login')}
        />
      );
    }
    return (
      <LoginForm
        onLogin={handleLogin}
        onRegisterClick={() => setCurrentPage('register')}
      />
    );
  }

  if (user.tipo === 'admin') {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header onLogout={() => setUser(null)} />
        <AdminDashboard
          clientes={clientes}
          onCreditarPontos={handleCreditarPontos}
          onDebitarPontos={handleDebitarPontos}
        />
      </div>
    );
  }

  const cliente = clientes.find(c => c.id === user.id)!;

  const handleWhatsAppClick = () => {
    const phoneNumber = '5511999999999'; // Substitua pelo número real da empresa
    const message = `Olá! Sou cliente AutoPremium (${cliente.nome}) e gostaria de mais informações.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const resgatarPremio = (premio: Premio) => {
    if (cliente.pontos >= premio.pontosNecessarios) {
      handleDebitarPontos(cliente.id, premio.pontosNecessarios);
      alert(`Parabéns! Você resgatou ${premio.nome}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onLogout={() => setUser(null)} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <PontosCard pontos={cliente.pontos} />
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Phone className="text-blue-600" size={24} />
              <h2 className="text-xl font-bold text-gray-800">Fale Conosco</h2>
            </div>
            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Contato via WhatsApp
            </button>
          </div>
        </div>

        <section id="premios" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Prêmios Disponíveis</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiosDisponiveis.map(premio => (
              <PremioCard
                key={premio.id}
                premio={premio}
                onResgatar={resgatarPremio}
                pontosDisponiveis={cliente.pontos}
              />
            ))}
          </div>
        </section>

        <section id="historico">
          <div className="flex items-center gap-2 mb-6">
            <History className="text-blue-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-800">Histórico de Abastecimentos</h2>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Litros</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pontos</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {historicoAbastecimentos.map((abastecimento, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {abastecimento.data.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {abastecimento.litros.toFixed(2)}L
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      R$ {abastecimento.valor.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      +{abastecimento.pontosGanhos}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;