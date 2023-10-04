import express from "express";
import AppRouter from "./routes";

const app = express();
const PORT = 3000;
const router = new AppRouter(app);

router.init();

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
