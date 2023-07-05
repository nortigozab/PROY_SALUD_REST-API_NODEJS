//file models/paciente.ts
import { BasicPaciente, Paciente } from "../types/paciente";
import { db } from "../db";
import { OkPacket, RowDataPacket } from "mysql2";
export const create = (paciente: Paciente, callback: Function) => {
  const queryString =
    "INSERT INTO Pacientes(NumeroCedula,FechaNacimiento,Nombre,Apellido,Telefono) VALUES(?,?,?,?,?)";
  db.query(
    queryString,
    [
      paciente.numeroCedula,
      paciente.fechaNacimiento,
      paciente.nombre,
      paciente.apellido,
      paciente.telefono,
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
export const findOne = (pacienteId: number, callback: Function) => {
  const queryString = "SELECT * FROM Pacientes WHERE IdPaciente=?";

  db.query(queryString, pacienteId, (err, result) => {
    if (err) {
      callback(err);
    } else {
      const row = (<RowDataPacket[]>result)[0];
      if (!row) {
        callback(
          new Error("No se encontró ningún paciente con el ID proporcionado.")
        );
      } else {
        const paciente: Paciente = {
          pacienteId: row.IdPaciente,
          nombre: row.Nombre,
          apellido: row.Apellido,
          numeroCedula: row.NumeroCedula,
          fechaNacimiento: row.FechaNacimiento,
          telefono: row.Telefono,
        };
        callback(null, paciente);
      }
    }
  });
};
export const findOneCel = (numeroCedula: string, callback: Function) => {
  const queryString = "SELECT * FROM Pacientes WHERE NumeroCedula=?";

  db.query(queryString, numeroCedula, (err, result) => {
    if (err) {
      callback(err);
    } else {
      const row = (<RowDataPacket[]>result)[0];
      if (!row) {
        callback(
          new Error(
            "Error, No se encontró ningún paciente con el ID proporcionado."
          )
        );
      } else {
        const paciente: Paciente = {
          pacienteId: row.IdPaciente,
          nombre: row.Nombre,
          apellido: row.Apellido,
          numeroCedula: row.NumeroCedula,
          fechaNacimiento: row.FechaNacimiento,
          telefono: row.Telefono,
        };
        callback(null, paciente);
      }
    }
  });
};
export const findAll = (callback: Function) => {
  const queryString = "SELECT * FROM Pacientes ORDER BY IdPaciente ASC";

  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    }

    const rows = <RowDataPacket[]>result;
    const pacientes: Paciente[] = [];

    rows.forEach((row) => {
      const paciente: Paciente = {
        pacienteId: row.IdPaciente,
        nombre: row.Nombre,
        apellido: row.Apellido,
        numeroCedula: row.NumeroCedula,
        fechaNacimiento: row.FechaNacimiento,
        telefono: row.Telefono,
      };
      pacientes.push(paciente);
    });
    callback(null, pacientes);
  });
};
export const update = (paciente: Paciente, callback: Function) => {
  const queryString =
    "UPDATE Pacientes SET Nombre=?, NumeroCedula=?, Apellido=?, FechaNacimiento=?, Telefono=? WHERE IdPaciente=?";

  db.query(
    queryString,
    [
      paciente.nombre,
      paciente.numeroCedula,
      paciente.apellido,
      paciente.fechaNacimiento,
      paciente.telefono,
      paciente.pacienteId,
    ],
    (err, result) => {
      if (err) {
        callback(err);
      }
      const numUpdate = (<OkPacket>result).affectedRows;
      const responseJSON = {
        estado: true,
        id: paciente.pacienteId,
        mensaje: "Operación exitosa",
      };
      callback(null, { numUpdate, responseJSON });
    }
  );
};
