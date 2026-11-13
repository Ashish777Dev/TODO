const express = require("express");

const AppError = require("./utils/AppError.js");
const morgan = require("morgan");

const cors = require("cors");
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

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/users", userRouter);

app.use((req, res, next) => {
  let error = new AppError(`Can't find ${req.originalUrl}`, 404);
  next(error);
});

//Global Error MiddleWare
app.use(globalErrorMiddlware);

module.exports = app;
