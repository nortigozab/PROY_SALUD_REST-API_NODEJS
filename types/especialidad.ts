// * file types/especialidad.ts

export interface BasicEspecialidad {
  especialidadId: number;
}
export interface Especialidad extends BasicEspecialidad {
  nombreEspecialidad: string;
}
