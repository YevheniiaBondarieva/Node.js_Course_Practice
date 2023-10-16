import express, { Express } from "express";

import { PORT } from "./constants";
import AppRouter from "./routes";

const app: Express = express();
const router: AppRouter = new AppRouter(app);

router.init();

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
