const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};
const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return (sum += blog.likes);
  }, 0);
};
const favoriteBlog = (blogs) => {
  return blogs.reduce(
    (prev, curr) => {
      return curr.likes > prev.likes ? curr : prev;
    },
    { likes: -Infinity }
  );
};
const mostBlogs = (blogs) => {
  //   const blogsByAuthor = _.groupBy(blogs, "author");
  const blogCount = _.countBy(blogs, "author");
  //_.map(obj, (value,key))
  const authorCounts = _.map(blogCount, (count, author) => ({
    author: author,
    blogs: count,
  }));
  return _.maxBy(authorCounts, "blogs");
};
//   let result = blogCount.reduce(
//     (prev, curr) => {
//       return curr[1] > prev[1] ? curr : prev;
//     },

//   );
//   return { Author: result[0], blogs: Number(result[1]) };
module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
