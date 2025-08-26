// tests/blogs_api.test.js
const { test, describe, before, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config();

const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

const initialBlogs = [
  {
    title: "First blog",
    author: "Alice",
    url: "http://example.com/1",
    likes: 1,
  },
  {
    title: "Second blog",
    author: "Bob",
    url: "http://example.com/2",
    likes: 2,
  },
];

// 1️⃣ Connect to test DB before all tests
before(async () => {
  await mongoose.connect(process.env.TEST_MONGO_URL);
});

// 2️⃣ Seed DB before each test
beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

describe("GET /api/blogs returns blogs with id property", () => {
  test("blogs are returned as json and each blog has id (not _id)", async () => {
    const res = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogs = res.body;
    assert.strictEqual(blogs.length, initialBlogs.length);

    blogs.forEach((b) => {
      assert.ok(b.id, "blog missing id property");
      assert.strictEqual(b._id, undefined, "blog still has _id property");
    });
  });
});

describe("POST /api/blogs", () => {
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "My New Blog",
      author: "Swikar",
      url: "http://example.com/new",
      likes: 5,
    };

    // POST request
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201) // Created
      .expect("Content-Type", /application\/json/);

    // Check DB
    const blogsAtEnd = await Blog.find({});
    assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1);

    const titles = blogsAtEnd.map((b) => b.title);
    assert.ok(titles.includes("My New Blog"));
  });
});

after(async () => {
  await mongoose.connection.close();
});
