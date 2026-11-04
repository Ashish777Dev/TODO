const express = require("express");
const dotenv = require("dotenv");
const AppError = require("./utils/AppError.js");

const cors = require("cors");
dotenv.config({ path: "./config.env" });
const app = express();
const taskRouter = require("./routes/taskRoute.js");
app.use(
    cors({
        origin: "http://localhost:5173"
    })
);
app.use(express.json());
app.use("/api/v1/tasks", taskRouter);

app.use("/*splat", (req, res, next) => {
    let error = new AppError(`Can't find ${req.orginalUrl}`, 404);
    next(error);
});

//Global Error MiddleWare
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    res.status(err.statusCode).json({
        message: err.message,
        status: err.status
    });
});
module.exports = app;
