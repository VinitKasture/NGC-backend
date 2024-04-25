const errorMiddleware = (error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";

  console.error(
    `[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`
  );
  console.error({ requestPath: req.path, error });

  // Send JSON response for errors
  res.status(status).json({ error: message });
};

module.exports = errorMiddleware;
