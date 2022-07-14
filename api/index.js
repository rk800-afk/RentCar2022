import { authRouter, carRouter, imageRouter } from "./routes/index.js";

const API = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/cars", carRouter);
  app.use("/api/image", imageRouter);
};

export default API
