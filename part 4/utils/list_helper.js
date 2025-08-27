// utils/list_helper.js
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
  const blogCount = _.countBy(blogs, "author"); //gives author lists with their respective blogs
  //_.map(obj, (value,key))
  const authorCounts = _.map(blogCount, (count, author) => ({
    author: author,
    blogs: count,
  }));
  return _.maxBy(authorCounts, "blogs");
};
const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  // group blogs by author
  // const grouped = _.groupBy(blogs, "author");
  const grouped = _.groupBy(blogs, "author");

  const likesByAuthor = _.map(grouped, (authorCounts, author) => ({
    author: author,
    likes: _.sumBy(authorCounts, "likes"),
  }));

  return _.maxBy(likesByAuthor, "likes");
};
module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
