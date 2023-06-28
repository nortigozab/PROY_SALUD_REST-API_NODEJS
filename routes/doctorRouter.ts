import express, { Request, Response } from "express";
import * as doctorModel from "../models/doctor";
import * as consultorioModel from "../models/consultorio";
import * as especialidadModel from "../models/especialidad";
import { BasicConsultorio, Consultorio } from "../types/consultorio";
import { BasicEspecialidad, Especialidad } from "../types/especialidad";
import { BasicDoctor, Doctor, DoctorWithDetails } from "../types/doctor";

const doctorRouter = express.Router();

doctorRouter.get("/crear", async (req: Request, res: Response) => {
  try {
    especialidadModel.findAll((err: Error, especialidades: Especialidad[]) => {
      if (err) {
        return res.status(500).json({ errorMessage: err.message });
      }
      consultorioModel.findOneTrue((err: Error, consultorio: Consultorio[]) => {
        if (err) {
          return res.status(500).json({ errorMessage: err.message });
        }
        res.render("crearDoc", {
          especialidades: especialidades,
          consultorio: consultorio,
        });
        //res.status(200).json({ data: doctores });
      });
      //res.status(200).json({ data: doctores });
    });
  } catch (error) {
    console.log(error);
  }
});
doctorRouter.get("/", async (req: Request, res: Response) => {
  try {
    doctorModel.findAll((err: Error, doctores: Doctor[]) => {
      if (err) {
        return res.status(500).json({ errorMessage: err.message });
      }
      res.render("doctores", {
        doctores: doctores,
        error: {
          mensaje: "",
          r: false,
        },
      });
      //res.status(200).json({ data: doctores });
    });
  } catch (error) {
    console.log(error);
  }
});
doctorRouter.post("/", async (req: Request, res: Response) => {
  try {
    const data = {
      doctorId: 0,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      especialidad: {
        especialidadId: req.body.especialidadId,
      },
      consultorio: {
        consultorioId: req.body.consultorioId,
      },
      correoContacto: req.body.correoContacto,
    };
    const newDoctor: Doctor = data;
    doctorModel.create(newDoctor, (errP: Error, doctorId: number) => {
      if (errP) {
        doctorModel.findAll((err: Error, doctores: Doctor[]) => {
          if (err) {
            return res.status(500).json({ errorMessage: err.message });
          }
          res.render("doctores", {
            doctores: doctores,
            error: {
              mensaje: errP.message,
              r: true,
            },
          });
          //res.status(200).json({ data: doctores });
        });
        //return res.status(500).json({ message: "Error al crear el doctor" });
      }
      consultorioModel.findOne(
        data.consultorio.consultorioId,
        (err: Error, consultorio: Consultorio) => {
          if (err) {
            return res.status(500).json({ message: err.message });
          }
          consultorio.disponibilidad = false;
          consultorioModel.update(
            consultorio,
            (err: Error, numUpdate: number) => {
              if (err) {
                return res.status(500).json({ message: err.message });
              }
              doctorModel.findAll((err: Error, doctores: Doctor[]) => {
                if (err) {
                  return res.status(500).json({ errorMessage: err.message });
                }
                res.render("doctores", {
                  doctores: doctores,
                  error: {
                    mensaje: doctorId + " Creado con exito",
                    r: false,
                  },
                });
                //res.status(200).json({ data: doctores });
              });
            }
          );
        }
      );
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});
doctorRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const doctorId = Number(req.params.id);
    doctorModel.findOne(doctorId, (err: Error, doctor: Doctor) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.render("detaDoc", {
        doctor: doctor,
        error: false,
      });
      //res.status(200).json({ data: doctor });
    });
  } catch (error) {
    console.log(error);
    res.render("detaDoc", {
      error: true,
      mensaje: "No se encuentra el documento...",
    });
  }
});
doctorRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const doctor: Doctor = req.body;
    doctorModel.update(doctor, (err: Error, numUpdate: number) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      res.status(200).json({ "Record(s) updated": numUpdate });
    });
  } catch (error) {
    console.log(error);
  }
});

export { doctorRouter };
