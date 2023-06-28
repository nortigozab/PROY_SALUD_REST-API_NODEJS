import * as dotenv from "dotenv";
import express from "express";
import * as bodyParser from "body-parser";
import { doctorRouter } from "./routes/doctorRouter";
import { pacienteRouter } from "./routes/pacienteRouter";
import { index } from "./routes/index";
import { db } from "./db";

const app = express();
dotenv.config();

app.use(bodyParser.json());

// motor de plantillas
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

app.use("/", index);
app.use("/doctores", doctorRouter);
app.use("/pacientes", pacienteRouter);
app.use((req, res, next) => {
  res.status(404).render("404", {
    titulo: "404",
    descripcion: "Page Not Found...",
  });
});
db.connect((err) => {
  if (err) {
    console.log("Database connection error");
  } else {
    console.log("Database Connected");
  }
});

app.listen(process.env.PORT, () => {
  console.log("Node server started running");
  console.log(`Go to http://${process.env.HOST}:${process.env.PORT}`);
});
