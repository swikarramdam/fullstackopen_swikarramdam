const express = require("express");
const app = express();
const { sequelize } = require("./util/db");
const { PORT } = require("./util/config");
const { connecttoDatabase } = require("./util/db");
const errorHandler = require("./middleware/errorhandler");
const { Blog } = require("./models");
app.use(express.json());

const blogsRouter = require("./controller/blogs");
const usersRouter = require("./controller/users");
const loginRouter = require("./controller/login");
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

// Authors route
app.get("/api/authors", async (req, res, next) => {
  try {
    const authors = await Blog.findAll({
      attributes: [
        "author",
        [sequelize.fn("COUNT", sequelize.col("id")), "blogs"],
        [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
      ],
      group: ["author"],
      order: [[sequelize.fn("SUM", sequelize.col("likes")), "DESC"]],
      raw: true,
    });

    // Format the response to match the required structure
    const formattedAuthors = authors.map((author) => ({
      author: author.author,
      blogs: String(author.blogs),
      likes: String(author.likes || "0"),
    }));

    res.json(formattedAuthors);
  } catch (err) {
    next(err);
  }
});

app.use(errorHandler);
const start = async () => {
  await connecttoDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
