import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.config";

export function generateToken(payload: object) {
  return sign(payload, JWT_SECRET, { expiresIn: "24h" });
}
