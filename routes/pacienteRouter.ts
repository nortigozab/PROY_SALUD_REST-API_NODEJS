import express, { Request, Response } from "express";
import * as pacienteModel from "../models/paciente";
import { BasicPaciente, Paciente } from "../types/paciente";
import moment from "moment";
const pacienteRouter = express.Router();

pacienteRouter.get("/crear", async (req: Request, res: Response) => {
  try {
    pacienteModel.findAll((err: Error, paciente: Paciente[]) => {
      if (err) {
        return res.status(500).json({ errorMessage: err.message });
      }
      res.render("crearPac", {});
    });
  } catch (error) {
    console.log(error);
  }
});
pacienteRouter.get("/", async (req: Request, res: Response) => {
  pacienteModel.findAll((err: Error, pacientes: Paciente[]) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }
    const pacientesConEdad = pacientes.map((paciente) => {
      const fechaNacimiento = moment(paciente.fechaNacimiento);
      const fechaActual = moment();

      const duracion = moment.duration(fechaActual.diff(fechaNacimiento));

      const edadAnios = duracion.years();
      const edadMeses = duracion.months();
      const edadDias = duracion.days();

      return {
        ...paciente,
        edad: { anios: edadAnios, meses: edadMeses, dias: edadDias },
      };
    });
    res.render("pacientes", {
      pacientes: pacientesConEdad,
      error: {
        mensaje: "",
        r: false,
      },
    });
  });
});
pacienteRouter.post("/", async (req: Request, res: Response) => {
  const newPaciente: Paciente = req.body;
  pacienteModel.create(newPaciente, (errP: Error, pacienteId: number) => {
    if (errP) {
      pacienteModel.findAll((err: Error, pacientes: Paciente[]) => {
        if (err) {
          return res.status(500).json({ errorMessage: err.message });
        }
        const pacientesConEdad = pacientes.map((paciente) => {
          const fechaNacimiento = moment(paciente.fechaNacimiento);
          const fechaActual = moment();

          const duracion = moment.duration(fechaActual.diff(fechaNacimiento));

          const edadAnios = duracion.years();
          const edadMeses = duracion.months();
          const edadDias = duracion.days();

          return {
            ...paciente,
            edad: { anios: edadAnios, meses: edadMeses, dias: edadDias },
          };
        });
        res.render("pacientes", {
          pacientes: pacientesConEdad,
          error: {
            mensaje: errP.message,
            r: true,
          },
        });
      });
    }
    pacienteModel.findAll((err: Error, pacientes: Paciente[]) => {
      if (err) {
        return res.status(500).json({ errorMessage: err.message });
      }
      const pacientesConEdad = pacientes.map((paciente) => {
        const fechaNacimiento = moment(paciente.fechaNacimiento);
        const fechaActual = moment();

        const duracion = moment.duration(fechaActual.diff(fechaNacimiento));

        const edadAnios = duracion.years();
        const edadMeses = duracion.months();
        const edadDias = duracion.days();

        return {
          ...paciente,
          edad: { anios: edadAnios, meses: edadMeses, dias: edadDias },
        };
      });
      res.render("pacientes", {
        pacientes: pacientesConEdad,
        error: {
          mensaje: pacienteId + " Creado con exito",
          r: false,
        },
      });
    });
  });
});
pacienteRouter.get("/:id", async (req: Request, res: Response) => {
  const pacienteId = req.params.id;
  pacienteModel.findOne(pacienteId, (err: Error, paciente: Paciente) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    const fechaNacimientoFormateada = moment(paciente.fechaNacimiento).format(
      "YYYY-MM-DD"
    );
    res.render("detaPac", {
      paciente: paciente,
      fechaNacimientoFormateada: fechaNacimientoFormateada,
      error: false,
    });
  });
});
pacienteRouter.put("/:id", async (req: Request, res: Response) => {
  const paciente: Paciente = req.body;
  pacienteModel.update(paciente, (err: Error, numUpdate: number) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.status(200).json({ "Record(s) updated": numUpdate });
  });
});
export { pacienteRouter };
