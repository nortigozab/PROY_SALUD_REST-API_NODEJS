// * file types/consultorio.ts

export interface BasicConsultorio {
  consultorioId: number;
}
export interface Consultorio extends BasicConsultorio {
  divisionPiso: string;
  numeroConsultorio: string;
  disponibilidad: boolean;
}
