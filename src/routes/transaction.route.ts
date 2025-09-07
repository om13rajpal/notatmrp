import { Router } from "express";
import { createTransactionHandler, listTransactionsHandler } from "../controllers/transaction.controller";
import { authenticateUser } from "../middlewares/auth.middleware";

const transactionRouter = Router()

transactionRouter.get("/", authenticateUser, listTransactionsHandler)
transactionRouter.post("/", authenticateUser, createTransactionHandler)

export default transactionRouter;
