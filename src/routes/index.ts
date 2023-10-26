import { Application } from "express";
import swaggerUi from "swagger-ui-express";

import {
  errorHandler,
  notFoundHandler,
} from "../middlewares/errorHandler.middleware";
import swaggerSpec from "../swagger.config";

import genresRouter from "./api/genres.route";
import healthRouter from "./api/health.route";
import moviesRouter from "./api/movies.route";

class AppRouter {
  constructor(private app: Application) {}

  init(): void {
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    this.app.use("/", healthRouter);
    this.app.use("/api/movies", moviesRouter);
    this.app.use("/api/genres", genresRouter);
    this.app.use([notFoundHandler, errorHandler]);
  }
}

export default AppRouter;
