// * file types/doctor.ts
import { BasicEspecialidad, Especialidad } from "./especialidad";
import { BasicConsultorio, Consultorio } from "./consultorio";

export interface BasicDoctor {
  doctorId: string;
}
export interface Doctor extends BasicDoctor {
  especialidad: BasicEspecialidad;
  nombre: string;
  apellido: string;
  consultorio?: BasicConsultorio;
  correoContacto: string;
}

export interface DoctorWithDetails extends Doctor {
  especialidad: Especialidad;
  consultorio: Consultorio;
}
