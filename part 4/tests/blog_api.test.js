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

describe("Post /api/blogs", () => {
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "Swikar's new blog",
      author: "Swikar",
      url: "http://swikarramdam.com.np",
      likes: 5,
    };
    // POST request
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const Blogs = await Blog.find({});
    assert.strictEqual(Blogs.length, initialBlogs.length + 1);

    const titles = Blogs.map((b) => b.title);
    assert.ok(titles.includes("Swikar's new blog"));
  });
});
describe("POST /api/blogs without likes", () => {
  test("default likes to 0 if missing", async () => {
    const newBlog = {
      title: "Swikar's new blog",
      author: "Swikar",
      url: "http://swikarramdam.com.np",
    };
    const res = await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    assert.strictEqual(res.body.likes, 0);
  });
});
after(async () => {
  await mongoose.connection.close();
});
