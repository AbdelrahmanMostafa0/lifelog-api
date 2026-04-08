import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import routes from "./routes";
import swaggerOptions from "./config/swagger";
import connectDB from "./config/db";

const app: Application = express();

app.use(helmet());
app.use(cors({ origin: ["http://localhost:3000", "https://lifelog-app.netlify.app"], credentials: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use((_req: Request, _res: Response, next: NextFunction) => {
  connectDB().then(() => next()).catch(next);
});

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", routes);
app.get("/", (req, res) => {
  res.send({ message: "ok" });
});

export default app;
