import { Application } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { errorHandler, notFoundHandler } from "../middlewares/errorHandler.middleware";
import healthRouter from "./api/health.route";

class AppRouter {
  constructor(private app: Application) {}

  swaggerDefinition = {
    info: {
      title: "Node.js Project API",
      version: "1.0.0",
    },
    host: "localhost:3000",
    basePath: "/",
  };

  swaggerOptions = {
    swaggerDefinition: this.swaggerDefinition,
    apis: ["src/routes/api/*.ts"],
  };

  swaggerSpec = swaggerJSDoc(this.swaggerOptions);

  init() {
    this.app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(this.swaggerSpec)
    );
    this.app.use("/", healthRouter, [notFoundHandler, errorHandler]);
  }
}

export default AppRouter;