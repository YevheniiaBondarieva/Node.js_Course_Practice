import { Request, Response, NextFunction } from "express";
import { MockProxy, mock } from "jest-mock-extended";

import {
  notFoundHandler,
  errorHandler,
  errorHandlerController,
} from "./errorHandler.middleware";

describe("Error handler middlewares", () => {
  let req: MockProxy<Request>;
  let res: MockProxy<Response>;
  let next: MockProxy<NextFunction>;

  beforeEach(() => {
    req = mock<Request>();
    res = mock<Response>();
    res.status.mockReturnValue(res);
    res.json.mockReturnValue(res);
    next = mock<NextFunction>();
  });

  it("should handle NotFound errors", () => {
    notFoundHandler(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("should handle InternalServerError", () => {
    const error = new Error("Test error");
    jest.spyOn(console, "error").mockImplementation();

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
  });

  it("should handle errorHandlerController with success", async () => {
    const testController = jest.fn().mockResolvedValue("testResult");
    const wrappedController = errorHandlerController(testController);

    await wrappedController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should handle errorHandlerController with error", async () => {
    const testController = jest
      .fn()
      .mockRejectedValue(new Error("Test failure"));
    const wrappedController = errorHandlerController(testController);
    jest.spyOn(console, "log").mockImplementation();

    await wrappedController(req, res);

    expect(res.json).toHaveBeenCalledWith({
      status: "fail",
      message: new Error("Test failure"),
    });
  });
});
