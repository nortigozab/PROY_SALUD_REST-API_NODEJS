//file models/doctor.ts
import { BasicDoctor, Doctor, DoctorWithDetails } from "../types/doctor";
import { db } from "../db";
import { OkPacket, RowDataPacket } from "mysql2";
export const create = (doctor: Doctor, callback: Function) => {
  const queryString =
    "INSERT INTO Doctores (Nombre, Apellido, Especialidad, Consultorio, CorreoContacto) VALUES(?, ?, ?, ?, ?)";
  db.query(
    queryString,
    [
      doctor.nombre,
      doctor.apellido,
      doctor.especialidad.especialidadId,
      doctor.consultorio?.consultorioId,
      doctor.correoContacto,
    ],
    (err, result) => {
      if (err) {
        callback(err);
      }
      const insertId = (<OkPacket>result).insertId;
      callback(null, insertId);
    }
  );
};
export const findOne = (doctorId: number, callback: Function) => {
  const queryString = `
  SELECT D.IdDoctor,D.Nombre,D.Apellido,E.IdEspecialidad,E.NombreEspecialidad,C.IdConsultorio, C.Piso, C.NumeroConsultorio,C.Disponibilidad,D.CorreoContacto
  FROM Doctores D JOIN Consultorios C ON D.Consultorio = C.IdConsultorio 
  JOIN Especialidades E ON D.Especialidad = E.IdEspecialidad WHERE D.IdDoctor =?`;

  db.query(queryString, doctorId, (err, result) => {
    if (err) {
      callback(err);
    }
    const row = (<RowDataPacket>result)[0];
    const doctor: DoctorWithDetails = {
      doctorId: row.IdDoctor,
      especialidad: {
        especialidadId: row.IdEspecialidad,
        nombreEspecialidad: row.NombreEspecialidad,
      },
      nombre: row.Nombre,
      apellido: row.Apellido,
      consultorio: {
        consultorioId: row.IdConsultorio,
        divisionPiso: row.Piso,
        numeroConsultorio: row.NumeroConsultorio,
        disponibilidad: row.Disponibilidad,
      },
      correoContacto: row.CorreoContacto,
    };
    callback(null, doctor);
  });
};
export const findAll = (callback: Function) => {
  const queryString = `
  SELECT D.IdDoctor,D.Nombre,D.Apellido,E.IdEspecialidad,E.NombreEspecialidad,C.IdConsultorio, C.Piso, C.NumeroConsultorio,C.Disponibilidad,D.CorreoContacto
  FROM Doctores D JOIN Consultorios C ON D.Consultorio = C.IdConsultorio 
  JOIN Especialidades E ON D.Especialidad = E.IdEspecialidad`;

  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    }

    const rows = <RowDataPacket[]>result;
    const doctores: Doctor[] = [];

    rows.forEach((row) => {
      const doctor: DoctorWithDetails = {
        doctorId: row.IdDoctor,
        especialidad: {
          especialidadId: row.IdEspecialidad,
          nombreEspecialidad: row.NombreEspecialidad,
        },
        nombre: row.Nombre,
        apellido: row.Apellido,
        consultorio: {
          consultorioId: row.IdConsultorio,
          divisionPiso: row.Piso,
          numeroConsultorio: row.NumeroConsultorio,
          disponibilidad: row.Disponibilidad,
        },
        correoContacto: row.CorreoContacto,
      };
      doctores.push(doctor);
    });
    callback(null, doctores);
  });
};
export const update = (doctor: Doctor, callback: Function) => {
  const queryString =
    "UPDATE Doctores SET Nombre = ?, Apellido = ?, Especialidad = ?, Consultorio = ?, CorreoContacto = ?WHERE IdDoctor = ?";

  db.query(
    queryString,
    [
      doctor.nombre,
      doctor.apellido,
      doctor.especialidad.especialidadId,
      doctor.consultorio?.consultorioId,
      doctor.correoContacto,
      doctor.doctorId,
    ],
    (err, result) => {
      if (err) {
        const responseJSON = {
          estado: false,
          id: doctor.doctorId,
          mensaje: "Operación sin Exitosa",
        };
        callback(err, responseJSON);
      }
      const numUpdate = (<OkPacket>result).affectedRows;
      const responseJSON = {
        estado: true,
        id: doctor.doctorId,
        mensaje: "Operación exitosa",
      };
      callback(null, { numUpdate, responseJSON });
    }
  );
};
