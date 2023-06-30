import express, { Request, Response } from "express";
import * as citaMedicaModel from "../models/citaMedica";
import * as especialidadModel from "../models/especialidad";
import * as doctorModel from "../models/doctor";
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
citaMedicaRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const citaId = Number(req.params.id);
    citaMedicaModel.findOne(
      citaId,
      (errC: Error, cita: CitaMedicaWithDetails) => {
        if (errC) {
          res.render("detaCit", {
            error: true,
            mensaje: errC,
          });
        } else if (!cita || !cita.fecha) {
          res.render("detaCit", {
            error: true,
            mensaje: errC,
          });
        } else {
          const fechaFormateada = moment(cita.fecha).format("YYYY-MM-DD");
          especialidadModel.findAll(
            (err: Error, especialidades: Especialidad[]) => {
              if (err) {
                return res.status(500).json({ errorMessage: err.message });
              }
              res.render("detaCit", {
                cita: cita,
                especialidades: especialidades,
                fechaFormateada: fechaFormateada,
                error: false,
                mensaje: "",
              });
            }
          );
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.render("detaCit", {
      error: true,
      mensaje: "No se encuentra el documento...",
    });
  }
});
citaMedicaRouter.get(
  "/:id/:especialidadId",
  async (req: Request, res: Response) => {
    try {
      const citaId = Number(req.params.id);
      citaMedicaModel.findOne(
        citaId,
        (errC: Error, cita: CitaMedicaWithDetails) => {
          if (errC) {
            res.render("detaCit", {
              error: true,
              mensaje: errC,
            });
          } else if (!cita || !cita.fecha) {
            res.render("detaCit", {
              error: true,
              mensaje: errC,
            });
          } else {
            const fechaFormateada = moment(cita.fecha).format("YYYY-MM-DD");
            especialidadModel.findAll(
              (err: Error, especialidades: Especialidad[]) => {
                if (err) {
                  return res.status(500).json({ errorMessage: err.message });
                }
                const especialidadId = Number(req.params.especialidadId);
                //Agregar la parte de doctores por especialidad
                res.render("detaCit", {
                  cita: cita,
                  especialidades: especialidades,
                  fechaFormateada: fechaFormateada,
                  error: false,
                  mensaje: "",
                });
              }
            );
          }
        }
      );
    } catch (error) {}
    // Resto del código para la ruta "/:id/:otraVariable"
  }
);
/*
citaMedicaRouter.get(
  "/:id/:especialidadId",
  async (req: Request, res: Response) => {
    try {
      const citaId = Number(req.params.id);
      citaMedicaModel.findOne(
        citaId,
        (errC: Error, cita: CitaMedicaWithDetails) => {
          if (errC) {
            res.render("detaCit", {
              error: true,
              mensaje: errC,
            });
          } else if (!cita || !cita.fecha) {
            res.render("detaCit", {
              error: true,
              mensaje: errC,
            });
          } else {
            const fechaFormateada = moment(cita.fecha).format("YYYY-MM-DD");
            especialidadModel.findAll(
              (err: Error, especialidades: Especialidad[]) => {
                if (err) {
                  return res.status(500).json({ errorMessage: err.message });
                }
                const especialidadId = Number(req.params.especialidadId);
                citaMedicaModel.findAllEspe(
                  especialidadId,
                  (errC: Error, citasEspe: CitaMedicaWithDetails[]) => {
                    if (errC) {
                      return res
                        .status(500)
                        .json({ errorMessage: errC.message });
                    } else {
                      res.render("detaCit", {
                        cita: cita,
                        especialidades: especialidades,
                        fechaFormateada: fechaFormateada,
                        citasEspe: citasEspe,
                        error: false,
                        mensaje: "",
                      });
                    }
                  }
                );
              }
            );
          }
        }
      );
    } catch (error) {}
    // Resto del código para la ruta "/:id/:otraVariable"
  }
);
citaMedicaRouter.get("/crear", async (req: Request, res: Response) => {
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
});*/
/*citaMedicaRouter.post("/", async (req: Request, res: Response) => {
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

citaMedicaRouter.put("/:id", async (req: Request, res: Response) => {
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
*/
export { citaMedicaRouter };
