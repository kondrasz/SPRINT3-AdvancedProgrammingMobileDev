export type DeteccaoEpi = {
  id: number;
  equipamento: string; // Ex: "Capacete", "Luvas", "Colete"
  emUso: boolean;      // true = Uso Seguro, false = Ausente/Infração
  setor: string;       // Ex: "Canteiro de Obras A", "Almoxarifado"
  dataHora: string;    // Data e hora retornadas pela detecção
};