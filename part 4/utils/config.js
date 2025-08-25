require("dotenv").config();
const PORT = process.env.PORT || 3003;
const MONGO_URL = process.env.mongoURL;
module.exports = { PORT, MONGO_URL };
