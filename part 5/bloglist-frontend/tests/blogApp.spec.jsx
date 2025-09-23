// //tests/blogApp.spec.jsx
// import { test, expect } from "@playwright/test";
// import { getByText } from "@testing-library/react";

// test.describe("Blog app", () => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto("http://localhost:5173");
//   });

//   test("Login form is shown by default", async ({ page }) => {
//     await expect(page.getByLabel("username")).toBeVisible();
//     await expect(page.getByLabel("password")).toBeVisible();
//     await expect(page.getByRole("button", { name: /login/i })).toBeVisible();
//   });

//   test.describe("Login", () => {
//     test("succeeds with correct credentials", async ({ page }) => {
//       await page.getByLabel("username").fill("mynewuser");
//       await page.getByLabel("password").fill("mypassword123");
//       await page.getByRole("button", { name: /login/i }).click();

//       await expect(page.getByText(/logged in as mynewuser/i)).toBeVisible();
//     });

//     test("fails with wrong credentials", async ({ page }) => {
//       await page.getByLabel("username").fill("mynewuser");
//       await page.getByLabel("password").fill("wrongpassword");
//       await page.getByRole("button", { name: /login/i }).click();

//       // still shows login button
//       await expect(page.getByRole("button", { name: /login/i })).toBeVisible();
//     });
//   });

//   test.describe("When logged in and blog exists", () => {
//     test.beforeEach(async ({ page }) => {
//       await page.getByLabel("username").fill("mynewuser");
//       await page.getByLabel("password").fill("mypassword123");
//       await page.getByRole("button", { name: /login/i }).click();
//     });

//     test("a new blog can be created", async ({ page }) => {
//       await page.getByRole("button", { name: /create new blog/i }).click();

//       const uniqueTitle = "Create Test Blog " + Date.now();
//       await page.getByLabel("title").fill(uniqueTitle);
//       await page.getByLabel("author").fill("Test Author");
//       await page.getByLabel("url").fill("http://testurl.com");
//       await page.getByRole("button", { name: /^create$/i }).click();

//       // Wait specifically for the blog in the list, not the notification
//       const blogContainer = page.getByTestId(/blog-/).filter({
//         has: page.getByText(uniqueTitle),
//       });

//       await expect(blogContainer).toBeVisible();
//     });

//     test("an existing blog can be liked", async ({ page }) => {
//       // create one blog first
//       const uniqueTitle = "Like Test Blog " + Date.now();
//       await page.getByRole("button", { name: /create new blog/i }).click();
//       await page.getByLabel("title").fill(uniqueTitle);
//       await page.getByLabel("author").fill("Test Author");
//       await page.getByLabel("url").fill("http://testurl.com");
//       await page.getByRole("button", { name: /^create$/i }).click();

//       // find it and expand
//       const blogContainer = page.getByTestId(/blog-/).filter({
//         has: page.getByText(uniqueTitle),
//       });
//       await blogContainer.getByRole("button", { name: /show/i }).click();

//       // like it
//       await expect(blogContainer.getByText(/0 likes/)).toBeVisible();
//       await blogContainer.getByRole("button", { name: /like/i }).click();
//       await expect(blogContainer.getByText(/1 likes/)).toBeVisible();
//     });
//   });

//   test("a blog can be deleted by its creator", async ({ page }) => {
//     test.beforeEach(async ({ page }) => {
//       await page.goto("http://localhost:5173");

//       // Login first
//       await page.getByLabel("username").fill("mynewuser");
//       await page.getByLabel("password").fill("mypassword123");
//       await page.getByRole("button", { name: /login/i }).click();

//       // Wait for the "Create new blog" button to appear
//       await page
//         .getByRole("button", { name: /create new blog/i })
//         .waitFor({ state: "visible", timeout: 10000 });
//     });

//     // create a blog
//     const uniqueTitle = "Delete Test Blog " + Date.now();
//     await page.getByRole("button", { name: /create new blog/i }).click();
//     await page.getByLabel("title").fill(uniqueTitle);
//     await page.getByLabel("author").fill("Delete Author");
//     await page.getByLabel("url").fill("http://deleteurl.com");
//     await page.getByRole("button", { name: /^create$/i }).click();

//     // find the blog
//     const blogContainer = page.getByTestId(/blog-/).filter({
//       has: page.getByText(uniqueTitle),
//     });
//     // expand details
//     await blogContainer.getByRole("button", { name: /show/i }).click();

//     // delete blog
//     await blogContainer.getByRole("button", { name: /remove/i }).click();

//     // confirm it is gone
//     await expect(page.getByText(uniqueTitle)).not.toBeVisible();
//   });
// });
// tests/blogApp.spec.jsx
// tests/blogApp.spec.jsx
// tests/blogApp.spec.jsx
import { test, expect } from "@playwright/test";

test.describe("Blog app", () => {
  // 5.13: Login form is shown by default
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("Login form is shown by default", async ({ page }) => {
    await expect(page.getByLabel("username")).toBeVisible();
    await expect(page.getByLabel("password")).toBeVisible();
    await expect(page.getByRole("button", { name: /login/i })).toBeVisible();
  });

  // 5.14: Login success & failure
  test.describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByLabel("username").fill("mynewuser");
      await page.getByLabel("password").fill("mypassword123");
      await page.getByRole("button", { name: /login/i }).click();
      await expect(page.getByText(/logged in as mynewuser/i)).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByLabel("username").fill("mynewuser");
      await page.getByLabel("password").fill("wrongpassword");
      await page.getByRole("button", { name: /login/i }).click();
      await expect(page.getByRole("button", { name: /login/i })).toBeVisible();
    });
  });

  // 5.19–5.23: Blog operations (create, like, delete)
  test.describe("When logged in", () => {
    test.beforeEach(async ({ page }) => {
      await page.getByLabel("username").fill("mynewuser");
      await page.getByLabel("password").fill("mypassword123");
      await page.getByRole("button", { name: /login/i }).click();
    });

    // helper: create blog and wait for it to appear
    const createBlog = async (page, title) => {
      await page.getByRole("button", { name: /create new blog/i }).click();
      await page.getByLabel("title").fill(title);
      await page.getByLabel("author").fill("Test Author");
      await page.getByLabel("url").fill("http://testurl.com");
      await page.getByRole("button", { name: /^create$/i }).click();

      const blogContainer = page.getByTestId(/blog-/).filter({
        has: page.getByText(title),
      });
      await blogContainer.waitFor({ state: "visible", timeout: 5000 });
      return blogContainer;
    };

    // 5.19: Create a new blog
    test("a new blog can be created", async ({ page }) => {
      const uniqueTitle = "Create Test Blog " + Date.now();
      await createBlog(page, uniqueTitle);
    });

    // 5.20: Like an existing blog
    test("an existing blog can be liked", async ({ page }) => {
      // create one blog first
      const uniqueTitle = "Like Test Blog " + Date.now();
      await page.getByRole("button", { name: /create new blog/i }).click();
      await page.getByLabel("title").fill(uniqueTitle);
      await page.getByLabel("author").fill("Test Author");
      await page.getByLabel("url").fill("http://testurl.com");
      await page.getByRole("button", { name: /^create$/i }).click();

      // find it and expand
      const blogContainer = page.getByTestId(/blog-/).filter({
        has: page.getByText(uniqueTitle),
      });
      await blogContainer.getByRole("button", { name: /show/i }).click();

      // like it
      await expect(blogContainer.getByText(/0 likes/)).toBeVisible();
      await blogContainer.getByRole("button", { name: /like/i }).click();
      await expect(blogContainer.getByText(/1 likes/)).toBeVisible();
    });

    // 5.21: Delete a blog by its creator
    test("a blog can be deleted by its creator", async ({ page }) => {
      const uniqueTitle = "Delete Test Blog " + Date.now();

      // create blog
      await page.getByRole("button", { name: /create new blog/i }).click();
      await page.getByLabel("title").fill(uniqueTitle);
      await page.getByLabel("author").fill("Delete Author");
      await page.getByLabel("url").fill("http://deleteurl.com");
      await page.getByRole("button", { name: /^create$/i }).click();

      // grab the last blog (just created)
      const blog = page.locator("div[data-testid^='blog-']").last();

      // expand and delete
      await blog.getByRole("button", { name: /show/i }).click();
      await blog.getByRole("button", { name: /delete/i }).click();

      // check that the title is gone from page
      await expect(page.getByText(uniqueTitle)).not.toBeVisible();
    });

    //5.22
    test.describe("Blog Remove Button Visibility", () => {
      test("only the creator sees the remove button", async ({ page }) => {
        const uniqueTitle = `Auth Test Blog ${Date.now()}`;

        // Login as creator
        await page.goto("http://localhost:5173/");
        await page.getByLabel("username").fill("mynewuser");
        await page.getByLabel("password").fill("mypassword123");
        await page.getByRole("button", { name: /login/i }).click();

        // Create a blog
        await page.getByRole("button", { name: /create new blog/i }).click();
        await page.getByLabel("title").fill(uniqueTitle);
        await page.getByLabel("author").fill("Swikar Don");
        await page.getByLabel("url").fill("https://creator.com");
        await page.getByRole("button", { name: /^create$/i }).click();

        // Ensure blog is visible for creator
        const blogItem = page
          .getByTestId(/blog-/)
          .filter({ hasText: uniqueTitle })
          .first();
        await blogItem.getByRole("button", { name: /show/i }).click();
        await expect(
          blogItem.getByRole("button", { name: /(delete|remove)/i })
        ).toBeVisible();

        // Logout
        await page.getByRole("button", { name: /logout/i }).click();

        // Login as another user
        await page.getByLabel("username").fill("swikarrr");
        await page.getByLabel("password").fill("swikarrr");
        await page.getByRole("button", { name: /login/i }).click();

        // 🔑 Force reload to fetch blogs for new user
        await page.reload();

        // Wait until the blog shows up in the list
        await expect(page.getByText(uniqueTitle)).toBeVisible({
          timeout: 10000,
        });

        // Expand blog as other user
        const blogItemOther = page
          .getByTestId(/blog-/)
          .filter({ hasText: uniqueTitle })
          .first();
        await blogItemOther.getByRole("button", { name: /show/i }).click();

        // Assert that delete/remove button is NOT visible
        await expect(
          blogItemOther.getByRole("button", { name: /(delete|remove)/i })
        ).not.toBeVisible();
      });
    });

    //5.23
    test.describe("Blog Sorting by Likes", () => {
      test("blogs are displayed in descending order of likes", async ({
        page,
      }) => {
        await page.goto("http://localhost:5173/");
        await page.getByLabel("username").fill("swikarrr");
        await page.getByLabel("password").fill("swikarrr");
        await page.getByRole("button", { name: /login/i }).click();

        const blogs = page.getByTestId(/blog-/);

        // Helper to get likes from a blog
        const getLikes = async (blog) => {
          await blog.getByRole("button", { name: /show/i }).click();
          const likesText = await blog.getByText(/\d+ likes/).textContent();
          return parseInt(likesText);
        };

        const blogCount = await blogs.count();
        let prevLikes = Infinity;

        for (let i = 0; i < blogCount; i++) {
          const blog = blogs.nth(i);
          const likes = await getLikes(blog);
          expect(likes).toBeLessThanOrEqual(prevLikes);
          prevLikes = likes;
        }
      });
    });
  });
});
