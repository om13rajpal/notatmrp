import mongoose from "mongoose";
import { MONGO_URI } from "./env.config";

export function connectDB() {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((err) => {
      console.log("Error connecting to Database", err);
    });
}