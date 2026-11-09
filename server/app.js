const express = require("express");
const dotenv = require("dotenv");
const AppError = require("./utils/AppError.js");

const cors = require("cors");
dotenv.config({ path: "./config.env" });
const app = express();
const taskRouter = require("./routes/taskRoute.js");
const userRouter = require("./routes/userRoute.js");
const globalErrorMiddlware = require("./controllers/errorController.js");
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/users", userRouter);

app.use((req, res, next) => {
  let error = new AppError(`Can't find ${req.originalUrl}`, 404);
  next(error);
});

//Global Error MiddleWare
app.use(globalErrorMiddlware);

module.exports = app;
