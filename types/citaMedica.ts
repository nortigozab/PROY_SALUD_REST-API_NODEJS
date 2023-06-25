// * file types/citaMedica.ts
import { BasicEspecialidad, Especialidad } from "./especialidad";
import { BasicDoctor, DoctorWithDetails } from "./doctor";
import { BasicPaciente, Paciente } from "./paciente";

export interface BasicCitaMedica {
  especialidad: BasicEspecialidad;
  doctor: BasicDoctor;
  paciente?: BasicPaciente;
  fecha: Date;
  disponibilidad: boolean;
}

export interface CitaMedica extends BasicCitaMedica {
  id: number;
}

export interface CitaMedicaWithDetails extends CitaMedica {
  especialidad: Especialidad;
  doctor: DoctorWithDetails;
  paciente?: Paciente;
}
