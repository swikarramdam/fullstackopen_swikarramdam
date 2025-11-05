const Sequelize = require("sequelize");
const { DATABASE_URL } = require("./config");

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false },
  },
});

const connecttoDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("database connected");
  } catch (error) {
    console.log(`database connection failed, error`);
    return process.exit(1);
  }
  return null;
};
module.exports = { connecttoDatabase, sequelize };
