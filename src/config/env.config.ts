import dotenv from "dotenv";
import path from "path";

const envPath = path.join(__dirname, "../../.env");

dotenv.config({ path: envPath });

export const PORT = process.env.PORT || 3000;
export const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/notatmrp";
export const JWT_SECRET = process.env.JWT_SECRET || "not@mrp";
export const NODE_ENV = process.env.NODE_ENV || "development";
