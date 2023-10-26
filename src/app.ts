import bodyParser from "body-parser";
import express, { Express } from "express";

import connectDB from "./../config/database";
import { PORT } from "./constants";
import AppRouter from "./routes";

const app: Express = express();
const router: AppRouter = new AppRouter(app);

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.init();

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
