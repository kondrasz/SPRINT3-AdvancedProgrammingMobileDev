import { DeteccaoEpi } from '../types';

export const mockDeteccoes: DeteccaoEpi[] = [
  {
    id: 1,
    equipamento: "Capacete",
    emUso: true,
    setor: "Setor de Carga Sul",
    dataHora: "28/05/2026, 10:30"
  },
  {
    id: 2,
    equipamento: "Luvas de Raspa",
    emUso: false,
    setor: "Linha de Montagem 02",
    dataHora: "28/05/2026, 11:15"
  },
  {
    id: 3,
    equipamento: "Óculos de Proteção",
    emUso: false,
    setor: "Oficina Central",
    dataHora: "28/05/2026, 12:00"
  }
];