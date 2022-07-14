const { authRouter, carRouter, imageRouter } = require("./routes");

module.exports = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/cars", carRouter);
  app.use("/api/image", imageRouter);
};
