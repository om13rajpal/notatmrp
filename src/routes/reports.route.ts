import { Router } from "express";
import { inventoryReport, transactionsReport } from "../controllers/reports.controller";
import { authenticateUser } from "../middlewares/auth.middleware";

const reportsRouter = Router();

reportsRouter.get('/inventory/:id', authenticateUser, inventoryReport);
reportsRouter.get('/transactions', authenticateUser, transactionsReport);

export default reportsRouter;