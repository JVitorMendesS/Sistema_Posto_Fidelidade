export interface Cliente {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  pontos: number;
  historicoAbastecimentos: Abastecimento[];
}

export interface Admin {
  id: string;
  nome: string;
  email: string;
}

export interface User {
  id: string;
  nome: string;
  email: string;
  tipo: 'cliente' | 'admin';
}

export interface Abastecimento {
  id: string;
  data: Date;
  litros: number;
  valor: number;
  pontosGanhos: number;
}

export interface Premio {
  id: string;
  nome: string;
  descricao: string;
  pontosNecessarios: number;
  imagem: string;
}