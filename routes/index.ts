import express, { Request, Response } from "express";

const index = express.Router();

index.get("/", (req: Request, res: Response) => {
  res.render("index", { titulo: "PROY_SALUD_REST-API" });
});
export { index };
