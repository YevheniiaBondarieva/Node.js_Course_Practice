import express from "express";
import AppRouter from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const app = express();
const PORT = 3000;
const router = new AppRouter(app);

const swaggerDefinition = {
  info: {
    title: "Node.js Project API",
    version: "1.0.0",
  },
  host: "localhost:3000",
  basePath: "/",
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ["src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

router.init();

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));