const { ValidationError } = require("sequelize");
const errorHandler = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    const messages = error.errors.map((e) => e.message);
    return res.status(400).json({ error: messages });
  }

  res.status(500).json({ error: error.message });
};
module.exports = errorHandler;
