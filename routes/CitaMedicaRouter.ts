import express, { Request, Response } from "express";
import * as citaMedicaModel from "../models/citaMedica";
import * as consultorioModel from "../models/consultorio";
import * as especialidadModel from "../models/especialidad";
import moment from "moment";
import { BasicEspecialidad, Especialidad } from "../types/especialidad";
import {
  BasicCitaMedica,
  CitaMedica,
  CitaMedicaWithDetails,
} from "../types/citaMedica";

const citaMedicaRouter = express.Router();

citaMedicaRouter.get("/", async (req: Request, res: Response) => {
  try {
    citaMedicaModel.findAll((err: Error, citas: CitaMedica[]) => {
      if (err) {
        return res.status(500).json({ errorMessage: err.message });
      }
      const citasFormateadas = citas.map((cita) => {
        const fecha = moment(cita.fecha).format("ddd, DD  MMM  YYYY");
        return {
          ...cita,
          fecha: fecha,
        };
      });
      res.render("citasmedicas", {
        citas: citasFormateadas,
        error: {
          mensaje: "",
          r: false,
        },
      });
      //res.status(200).json({ data: citasFormateadas });
    });
  } catch (error) {
    console.log(error);
  }
});
export { citaMedicaRouter };
