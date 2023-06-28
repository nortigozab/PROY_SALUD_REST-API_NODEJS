//file models/consultorio.ts
import { BasicConsultorio, Consultorio } from "../types/consultorio";
import { db } from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

export const create = (consultorio: Consultorio, callback: Function) => {
  const queryString =
    "INSERT INTO Consultorios (Piso, NumeroConsultorio, Disponibilidad)VALUES(?,?, 1)";
  db.query(
    queryString,
    [consultorio.divisionPiso, consultorio.numeroConsultorio],
    (err, result) => {
      if (err) {
        callback(err);
      }
      const insertId = (<OkPacket>result).insertId;
      callback(null, insertId);
    }
  );
};
export const findOne = (consultorioId: number, callback: Function) => {
  const queryString = ` SELECT IdConsultorio, Piso, NumeroConsultorio, Disponibilidad FROM Consultorios WHERE IdConsultorio=?`;

  db.query(queryString, consultorioId, (err, result) => {
    if (err) {
      callback(err);
    }
    const row = (<RowDataPacket>result)[0];
    const consultorio: Consultorio = {
      consultorioId: row.IdConsultorio,
      divisionPiso: row.Piso,
      numeroConsultorio: row.NumeroConsultorio,
      disponibilidad: row.Disponibilidad,
    };
    callback(null, consultorio);
  });
};
export const findAll = (callback: Function) => {
  const queryString = ` SELECT IdConsultorio, Piso, NumeroConsultorio, Disponibilidad FROM Consultorios`;

  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    }

    const rows = <RowDataPacket[]>result;
    const consultorios: Consultorio[] = [];

    rows.forEach((row) => {
      const consultorio: Consultorio = {
        consultorioId: row.IdConsultorio,
        divisionPiso: row.Piso,
        numeroConsultorio: row.NumeroConsultorio,
        disponibilidad: row.Disponibilidad,
      };
      consultorios.push(consultorio);
    });
    callback(null, consultorios);
  });
};

export const findOneTrue = ( callback: Function) => {
  const queryString = "SELECT IdConsultorio, Piso, NumeroConsultorio, Disponibilidad FROM salud.Consultorios where Disponibilidad = TRUE ";

  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    }
    const row = (<RowDataPacket>result)[0];
    const consultorio: Consultorio = {
      consultorioId: row.IdConsultorio,
      divisionPiso: row.Piso,
      numeroConsultorio: row.NumeroConsultorio,
      disponibilidad: row.Disponibilidad,
    };
    callback(null, consultorio);
  });
};

"SELECT IdConsultorio, Piso, NumeroConsultorio, Disponibilidad FROM salud.Consultorios where Disponibilidad = TRUE "
export const update = (consultorio: Consultorio, callback: Function) => {
  const queryString =
    "UPDATE Consultorios SET Piso=?, NumeroConsultorio=?, Disponibilidad=? WHERE IdConsultorio=?";

  db.query(
    queryString,
    [
      consultorio.divisionPiso,
      consultorio.numeroConsultorio,
      consultorio.disponibilidad,
      consultorio.consultorioId,
    ],
    (err, result) => {
      if (err) {
        callback(err);
      }

      const numUpdate = (<OkPacket>result).affectedRows;
      callback(null, numUpdate);
    }
  );
};
