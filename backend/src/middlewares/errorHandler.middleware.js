const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let errorMessage = err.message;
  if (err.name === "CastError" && err.kind === "ObjectId") {
    errorMessage = "Resource not found";
    statusCode = 404;
  }
  res.status(statusCode);
  res.json({
    message: errorMessage,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};

const pathNotFound = (req, res, next) => {
  const error = new Error(`Path not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};
export { errorHandler, pathNotFound };
