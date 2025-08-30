// tests/blogs_api.test.js
const { test, describe, before, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcrypt");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
let token;

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
  await User.deleteMany({});

  // create a test user
  const passwordHash = await bcrypt.hash("secret", 10);
  const user = new User({ username: "testuser", passwordHash });
  await user.save();

  // login test

  const loginRes = await api.post("/api/login").send({
    username: "testuser",
    password: "secret",
  });
  token = loginRes.body.token;

  // initial blogs with user field attached
  const blogObjects = initialBlogs.map((b) => ({ ...b, user: user._id }));
  await Blog.insertMany(blogObjects);
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
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const Blogs = await Blog.find({});
    assert.strictEqual(Blogs.length, initialBlogs.length + 1);

    const titles = Blogs.map((b) => b.title);
    assert.ok(titles.includes("Swikar's new blog"));
  });
});

describe("POST /api/blogs security", () => {
  test("fails with 401 if unauthorised", async () => {
    const testBlog = {
      title: "Unauthorised blog",
      author: "swhacker",
      url: "swhacker.com",
    };
    await api.post("/api/blogs").send(testBlog).expect(401);
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
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    assert.strictEqual(res.body.likes, 0);
  });
});

describe("POST /api/blogs validation", () => {
  test("Fails with 400 if title is missing", async () => {
    const newBlog = {
      author: "Hero",
      url: "hero.url.com",
    };
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(400);
  });
  test("Fails with 400 if url is missing", async () => {
    const newBlog = {
      title: "Title",
      author: "Author",
    };
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(400);
  });
});

// delete test
describe("DELETE /api/blogs", () => {
  let deleteThisBlog;
  beforeEach(async () => {
    const newBlog = {
      title: "Blog to delete",
      author: "TestAuthor",
      url: "http://delete.com",
      likes: 0,
    };
    const res = await api
      .post("/api/blogs/")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201);
    deleteThisBlog = res.body;
  });

  test("succeeds with 204 if authorised", async () => {
    await api
      .delete(`/api/blogs/${deleteThisBlog.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const blogsAfter = await Blog.find({});
    const ids = blogsAfter.map((b) => b.id);
    assert.ok(!ids.includes(deleteThisBlog.id), "blog was not deleted");
  });
  test("fails with 401 if unauthorised", async () => {
    await api.delete(`/api/blogs/${deleteThisBlog.id}`).expect(401);

    const blogsAfter = await Blog.find({});
    const ids = blogsAfter.map((b) => b.id);
    assert.ok(ids.includes(deleteThisBlog.id), "blog should not be deleted");
  });
});

after(async () => {
  await mongoose.connection.close();
});
