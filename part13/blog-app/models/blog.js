const { sequelize } = require("../util/db");

const { Model, DataTypes } = require("sequelize");

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: DataTypes.STRING,
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isValidYear(value) {
          if (value !== null && value !== undefined) {
            const currentYear = new Date().getFullYear();
            if (!Number.isInteger(value)) {
              throw new Error("Year must be an integer");
            }
            if (value < 1991) {
              throw new Error("Year must be at least 1991");
            }
            if (value > currentYear) {
              throw new Error(`Year must not be greater than ${currentYear}`);
            }
          }
        },
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "blog",
  }
);
module.exports = Blog;
