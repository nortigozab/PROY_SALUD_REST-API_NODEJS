//file models/especialidad.ts
import { BasicEspecialidad, Especialidad } from "../types/especialidad";
import { db } from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

export const create = (especialidad: Especialidad, callback: Function) => {
  const queryString =
    "INSERT INTO `Especialidades`(`NombreEspecialidad`) VALUES(?)";
  db.query(queryString, [especialidad.nombreEspecialidad], (err, result) => {
    if (err) {
      callback(err);
    }
    const insertId = (<OkPacket>result).insertId;
    callback(null, insertId);
  });
};
export const findOne = (especialidadId: number, callback: Function) => {
  const queryString = `
  SELECT * FROM Especialidades WHERE IdEspecialidad=?`;

  db.query(queryString, especialidadId, (err, result) => {
    if (err) {
      callback(err);
    }
    const row = (<RowDataPacket>result)[0];
    const especialidad: Especialidad = {
      especialidadId: row.IdEspecialidad,
      nombreEspecialidad: row.NombreEspecialidad,
    };
    callback(null, especialidad);
  });
};
export const findAll = (callback: Function) => {
  const queryString = `
  SELECT * FROM Especialidades`;

  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    }

    const rows = <RowDataPacket[]>result;
    const especialidades: Especialidad[] = [];

    rows.forEach((row) => {
      const especialidad: Especialidad = {
        especialidadId: row.IdEspecialidad,
        nombreEspecialidad: row.NombreEspecialidad,
      };
      especialidades.push(especialidad);
    });
    callback(null, especialidades);
  });
};
export const update = (especialidad: Especialidad, callback: Function) => {
  const queryString =
    "UPDATE Especialidades set NombreEspecialidad=? where IdEspecialidad=?";

  db.query(
    queryString,
    [especialidad.nombreEspecialidad, especialidad.especialidadId],
    (err, result) => {
      if (err) {
        callback(err);
      }

      const numUpdate = (<OkPacket>result).affectedRows;
      callback(null, numUpdate);
    }
  );
};
