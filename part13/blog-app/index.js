const express = require("express");
const app = express();
const { sequelize } = require("./util/db");
const { PORT } = require("./util/config");
const { connecttoDatabase } = require("./util/db");

app.use(express.json());

const blogsRouter = require("./controller/blogs");
app.use("/api/blogs", blogsRouter);

const start = async () => {
  await connecttoDatabase();
  await sequelize.sync();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
