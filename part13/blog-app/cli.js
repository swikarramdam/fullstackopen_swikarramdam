require("dotenv").config();
const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false },
  },
});

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
  },
  {
    sequelize,
    timestamps: false,
    modelName: "blog",
  }
);

const main = async () => {
  try {
    await sequelize.authenticate();
    await Blog.sync(); // <= THIS CREATES THE TABLE IF IT'S MISSING

    const blogs = await Blog.findAll();
    blogs.forEach((blog) => {
      console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`);
    });

    await sequelize.close();
  } catch (err) {
    console.log("Error:", err);
  }
};

main();
