// app.js
const express = require("express");
const app = express();
const blogsRouter = require("./controllers/blogs");
const middleware = require("./utils/middleware");

app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", blogsRouter);

// middleware for handling unknown routes + errors
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
