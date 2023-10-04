import { Application } from "express";
import swaggerUi from "swagger-ui-express";

import {
  errorHandler,
  notFoundHandler,
} from "../middlewares/errorHandler.middleware";
import { swaggerSpec } from "../swagger.config";

import healthRouter from "./api/health.route";

class AppRouter {
  constructor(private app: Application) {}

  init(): void {
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    this.app.use("/", healthRouter);
    this.app.use([notFoundHandler, errorHandler]);
  }
}

export default AppRouter;
