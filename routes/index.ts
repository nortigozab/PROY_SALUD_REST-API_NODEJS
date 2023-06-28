import express, { Request, Response } from "express";

const index = express.Router();

index.get("/", (req: Request, res: Response) => {
  res.render("index", { titulo: "PROY_SALUD_REST-API" });
});
index.get("/servicios", (req, res) => {
  res.render("servicios", {
    tituloServicios: "Este es un mensaje dinámico de servicios",
  });
});

export { index };
