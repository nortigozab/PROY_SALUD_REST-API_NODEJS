import express, { Request, Response } from "express";
import * as pacienteModel from "../models/paciente";
import { BasicPaciente, Paciente } from "../types/paciente";
const pacienteRouter = express.Router();

pacienteRouter.get("/", async (req: Request, res: Response) => {
  pacienteModel.findAll((err: Error, pacientes: Paciente[]) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }
    res.status(200).json({ data: pacientes });
  });
});
pacienteRouter.post("/", async (req: Request, res: Response) => {
  const newPaciente: Paciente = req.body;
  pacienteModel.create(newPaciente, (err: Error, pacienteId: number) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.status(200).json({ orderId: pacienteId });
  });
});
pacienteRouter.get("/:id", async (req: Request, res: Response) => {
  const pacienteId = Number(req.params.id);
  pacienteModel.findOne(pacienteId, (err: Error, paciente: Paciente) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(200).json({ data: paciente });
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
