const Blog = require("./blog");
const User = require("./user");

// One-to-Many: User has many Blogs (user creates blogs)
Blog.belongsTo(User);
User.hasMany(Blog);

// Many-to-Many: Users can have many Blogs in reading list, Blogs can be in many Users' reading lists
User.belongsToMany(Blog, {
  through: "reading_lists",
  as: "reading_list",
  foreignKey: "user_id",
});
Blog.belongsToMany(User, {
  through: "reading_lists",
  as: "users_reading",
  foreignKey: "blog_id",
});

module.exports = {
  Blog,
  User,
};
