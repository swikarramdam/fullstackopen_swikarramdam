// utils/middleware.js
const logger = require("./logger");

const requestLogger = (req, res, next) => {
  logger.info(`${req.method} ${req.path}`, req.body);
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  if (err.name === "ValidationError") {
    return res.status(400).send({ error: err.message });
  }

  next(err);
};

module.exports = { requestLogger, unknownEndpoint, errorHandler };
