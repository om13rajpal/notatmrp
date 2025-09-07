import { Router } from "express";
import {
  adjustStockHandler,
  createProductHandler,
  deleteProductHandler,
  listProductsHandler,
  updateProductHandler,
} from "../controllers/product.controller";
import { authenticateUser } from "../middlewares/auth.middleware";

const productRouter = Router();

productRouter.get("/", authenticateUser, listProductsHandler);
productRouter.post("/", authenticateUser, createProductHandler);
productRouter.put("/:id", authenticateUser, updateProductHandler);
productRouter.delete("/:id", authenticateUser, deleteProductHandler);
productRouter.put("/:id/:quantity", authenticateUser, adjustStockHandler);

export default productRouter;
