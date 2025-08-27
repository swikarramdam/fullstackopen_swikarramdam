// index.js
const app = require("./app");
const mongoose = require("mongoose");
const config = require("./utils/config");

mongoose
  .connect(config.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected!");
    app.listen(config.PORT, () => {
      console.log(`Server running on port ${config.PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
