import { Router } from "express";
import {
  createUserHandler,
  deleteUserHandler,
  getUserHandler,
  listUsersHandler,
  updateUserHandler,
} from "../controllers/users.controller";
import { authenticateUser } from "../middlewares/auth.middleware";

const userRouter = Router();

userRouter.post("/", authenticateUser, createUserHandler);
userRouter.get("/:id", authenticateUser, getUserHandler);
userRouter.get("/", authenticateUser, listUsersHandler);
userRouter.put("/:id", authenticateUser, updateUserHandler);
userRouter.delete("/:id", authenticateUser, deleteUserHandler);

export default userRouter;
