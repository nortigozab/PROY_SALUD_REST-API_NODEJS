import express, { Request, Response } from "express";
import * as doctorModel from "../models/doctor";
import { BasicDoctor, Doctor, DoctorWithDetails } from "../types/doctor";
const doctorRouter = express.Router();

doctorRouter.get("/", async (req: Request, res: Response) => {
  doctorModel.findAll((err: Error, doctores: Doctor[]) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }
    res.status(200).json({ data: doctores });
  });
});
doctorRouter.post("/", async (req: Request, res: Response) => {
  const newDoctor: Doctor = req.body;
  doctorModel.create(newDoctor, (err: Error, doctorId: number) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.status(200).json({ orderId: doctorId });
  });
});
doctorRouter.get("/:id", async (req: Request, res: Response) => {
  const doctorId = Number(req.params.id);
  doctorModel.findOne(doctorId, (err: Error, order: Doctor) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(200).json({ data: order });
  });
});
doctorRouter.put("/:id", async (req: Request, res: Response) => {
  const doctor: Doctor = req.body;
  doctorModel.update(doctor, (err: Error, numUpdate: number) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.status(200).json({ "Record(s) updated": numUpdate });
  });
});
export { doctorRouter };
