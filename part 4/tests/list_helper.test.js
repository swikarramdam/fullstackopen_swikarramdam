const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });
});

describe("favorite Blog", () => {
  const listWithSomeBlogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d1",
      title: "2 Go To Statement Considered Harmful",
      author: "2 Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 2,
      __v: 0,
    },
    {
      _id: "5a422aa71b546234d1",
      title: "3 Go To Statement Considered Harmful",
      author: "3 Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 3,
      __v: 0,
    },
  ];
  test("When the blog with the maximum likes is found", () => {
    const max = listHelper.favoriteBlog(listWithSomeBlogs);
    assert.strictEqual(max, listWithSomeBlogs[0]);
  });
});

describe("most Blog", () => {
  const authorListWithSomeBlogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d1",
      title: "2 Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 2,
      __v: 0,
    },
    {
      _id: "5a422aa71b546234d1",
      title: "3 Go To Statement Considered Harmful",
      author: "W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 3,
      __v: 0,
    },
    {
      _id: "5a422aa71b546234d1",
      title: "3 Go To Statement Considered Harmful",
      author: "Hawa Man",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 3,
      __v: 0,
    },
  ];
  test("When the author with the maximum blogs is found", () => {
    const result = listHelper.mostBlogs(authorListWithSomeBlogs);
    assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", blogs: 2 });
  });
});

describe("most Likes", () => {
  const likesListWithSomeBlogs = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d1",
      title: "2 Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 2,
      __v: 0,
    },
    {
      _id: "5a422aa71b546234d1",
      title: "3 Go To Statement Considered Harmful",
      author: "W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 3,
      __v: 0,
    },
    {
      _id: "5a422aa71b546234d1",
      title: "3 Go To Statement Considered Harmful",
      author: "Hawa Man",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 3,
      __v: 0,
    },
  ];
  test("When the author with the maximum likes is found", () => {
    const result = listHelper.mostLikes(likesListWithSomeBlogs);
    assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", likes: 7 });
  });
});
