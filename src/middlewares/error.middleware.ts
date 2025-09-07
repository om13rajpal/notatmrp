import { NextFunction, Request, Response } from "express";

export function pageNotFound(req: Request, res: Response, next: NextFunction) {
  res.status(404).json({ success: false, message: "Endpoint not found" });
  return;
}

export function internalServerError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message || err,
  });
  return;
}
