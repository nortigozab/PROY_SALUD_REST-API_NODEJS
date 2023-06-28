import express, { Request, Response } from "express";
import * as doctorModel from "../models/doctor";
import * as consultorioModel from "../models/consultorio";
import { BasicConsultorio, Consultorio } from "../types/consultorio";
import { BasicDoctor, Doctor, DoctorWithDetails } from "../types/doctor";
const doctorRouter = express.Router();

doctorRouter.get("/", async (req: Request, res: Response) => {
  try {
    doctorModel.findAll((err: Error, doctores: Doctor[]) => {
      if (err) {
        return res.status(500).json({ errorMessage: err.message });
      }
      res.render("doctores", { doctores: doctores, error: false, doctor: [] });
      //res.status(200).json({ data: doctores });
    });
  } catch (error) {
    console.log(error);
  }
});
doctorRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newDoctor: Doctor = req.body;
    doctorModel.create(newDoctor, (err: Error, doctorId: number) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      res.status(200).json({ orderId: doctorId });
    });
  } catch (error) {}
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
