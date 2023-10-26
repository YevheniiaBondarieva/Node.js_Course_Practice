import swaggerJSDoc, { Options, SwaggerDefinition } from "swagger-jsdoc";
import { JsonObject } from "swagger-ui-express";

import { swaggerComponents } from "./swaggerComponents";

const swaggerDefinition: SwaggerDefinition = {
  info: {
    title: "Node.js Project API",
    version: "1.0.0",
  },
  openapi: "3.0.0",
  host: "localhost:3000",
  components: {
    schemas: swaggerComponents.schemas,
  },
  basePath: "/",
};

const swaggerOptions: Options = {
  swaggerDefinition,
  apis: ["src/routes/api/*.ts"],
};

const swaggerSpec: JsonObject = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
