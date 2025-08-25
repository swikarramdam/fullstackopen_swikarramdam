const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
// const dotenv = require("dotenv");
// dotenv(); means the same as line 3

const config = require("./utils/config");
const blogsRouter = require("./controllers/blogs");

const app = express();

mongoose
  .connect(config.MONGO_URL)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("MongoDB connection error:", err));

const cors = require("cors");
app.use(express.json());

app.use("/api/blogs", blogsRouter); //for this path, use this middleware

module.exports = app;
