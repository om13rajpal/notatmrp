import express from "express";
import morgan from "morgan";
import { NODE_ENV } from "./config/env.config";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import swaggerUI from 'swagger-ui-express'
import swaggerDocument from "../swagger.json";

import {
  internalServerError,
  pageNotFound,
} from "./middlewares/error.middleware";
import authRouter from "./routes/auth.route";
import productRouter from "./routes/product.route";
import reportsRouter from "./routes/reports.route";
import transactionRouter from "./routes/transaction.route";
import userRouter from "./routes/users.route";

const app = express();

if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(compression());
app.use(cors());
app.use(helmet());

app.use(express.json());

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use("/", authRouter);
app.use("/products", productRouter);
app.use("/reports", reportsRouter);
app.use("/transactions", transactionRouter);
app.use("/contacts", userRouter);

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
  });
});

app.use(pageNotFound);
app.use(internalServerError);

export default app;
