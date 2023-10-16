import { NextFunction, Request, Response } from "express";

import { ResponseMessages, HttpStatusCodes } from "../enums";

export const notFoundHandler = (
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  res
    .status(HttpStatusCodes.NotFound)
    .json({ message: ResponseMessages.NotFound });
};

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  console.error(err.stack);
  res
    .status(HttpStatusCodes.InternalServerError)
    .json({ message: ResponseMessages.InternalServerError });
};
