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

export const errorHandlerController = <T>(
  controller: (req: Request, res: Response) => Promise<T | T[] | undefined>,
) => {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      const results = await controller(req, res);
      if (results !== undefined) {
        res.status(200).json({ results });
      }
    } catch (err) {
      res.status(400).json({ status: "fail", message: err });
      console.log(err);
    }
  };
};
