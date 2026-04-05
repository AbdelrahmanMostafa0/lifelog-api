import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes";
const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", routes);
app.get("/", (req, res) => {
  res.send({ message: "ok" });
});

export default app;
