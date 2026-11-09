const sendDevError = (res, err) => {
  res.status(err.statusCode).json({
    message: err.message,
    status: err.status,
    err: err,
    stack: err.stack,
  });
};

const sendProdError = (res, err) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      message: err.message,
      status: err.status,
    });
  } else {
    console.error(`error : ${err}`);
    res.status(500).json({
      message: "Something went wrong!",
      status: "error",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendDevError(res, err);
  } else {
    sendProdError(res, err);
  }
};
