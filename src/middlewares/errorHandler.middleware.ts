import { NextFunction, Request, Response } from "express";

export const notFoundHandler = (
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  res.status(404).json({ message: "Resource not found" });
};

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
};
