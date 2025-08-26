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

// 3️⃣ Close DB connection after all tests
after(async () => {
  await mongoose.connection.close();
});
