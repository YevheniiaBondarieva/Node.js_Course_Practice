import swaggerJSDoc, { Options, SwaggerDefinition } from "swagger-jsdoc";
import { JsonObject } from "swagger-ui-express";

const swaggerDefinition: SwaggerDefinition = {
  info: {
    title: "Node.js Project API",
    version: "1.0.0",
  },
  host: "localhost:3000",
  basePath: "/",
};

const swaggerOptions: Options = {
  swaggerDefinition,
  apis: ["src/routes/api/*.ts"],
};

export const swaggerSpec: JsonObject = swaggerJSDoc(swaggerOptions);
