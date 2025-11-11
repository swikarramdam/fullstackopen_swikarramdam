const express = require("express");
const app = express();
const { sequelize } = require("./util/db");
const { PORT } = require("./util/config");
const { connecttoDatabase } = require("./util/db");
const errorHandler = require("./middleware/errorhandler");
app.use(express.json());

const blogsRouter = require("./controller/blogs");
const usersRouter = require("./controller/users");
const loginRouter = require("./controller/login");
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use(errorHandler);
const start = async () => {
  await connecttoDatabase();
  await sequelize.sync({ alter: true });
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
