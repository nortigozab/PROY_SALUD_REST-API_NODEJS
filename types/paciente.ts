// * file types/paciente.ts

export interface BasicPaciente {
  id: number;
}
export interface Paciente extends BasicPaciente {
  nombre: string;
  numeroCedula: string;
  apellido: string;
  fechaNacimiento: Date;
  telefono: string;
}
