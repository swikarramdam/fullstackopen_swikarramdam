// import { test, expect } from "@playwright/test";

// test.describe("Blog app", () => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto("http://localhost:5173");
//   });

//   test("Login form is shown by default", async ({ page }) => {
//     await expect(page.getByText("username")).toBeVisible();
//     await expect(page.getByText("password")).toBeVisible();
//     await expect(page.getByRole("button", { name: /login/i })).toBeVisible();
//   });
//   test.describe("Login", () => {
//     test("succeeds with correct credentials", async ({ page }) => {
//       //fill the login
//       await page.getByLabel("username").fill("mynewuser");
//       await page.getByLabel("password").fill("mypassword123");
//       await page.getByRole("button", { name: /login/i }).click();

//       //check
//       await expect(page.getByText("logged in as mynewuser")).toBeVisible();
//     });

//     test("fails with wrong credentials", async ({ page }) => {
//       //fill the login
//       await page.getByLabel("username").fill("mynewuser");
//       await page.getByLabel("password").fill("mypassword123");
//       await page.getByRole("button", { name: /login/i }).click();

//       //check
//       await expect(page.getByRole("button", { name: /login/i })).toBeVisible();
//     });
//   });

//   // test.describe("When logged in", () => {
//   //   test.beforeEach(async ({ page }) => {
//   //     await page.goto("http://localhost:5173");
//   //   });

//   //   test("a new blog can be created", async ({ page }) => {
//   //     //login
//   //     await page.getByLabel("username").fill("mynewuser");
//   //     await page.getByLabel("password").fill("mypassword123");
//   //     await page.getByRole("button", { name: /login/i }).click();

//   //     //expand
//   //     await page.getByRole("button", { name: /Create new blog/i }).click();

//   //     //after login
//   //     await page.getByLabel("title").fill("My input title");
//   //     await page.getByLabel("author").fill("My input author");
//   //     await page.getByLabel("url").fill("My input url");
//   //     await page.getByRole("button", { name: /create/i }).click();

//   //     //check
//   //     await expect(page.getByText("My input title").first()).toBeVisible();
//   //   });
//   // });

//   test.describe("When logged in and blog exists", () => {
//     test.beforeEach(async ({ page }) => {
//       await page.goto("http://localhost:5173");
//     });

//     test("a new blog can be created", async ({ page }) => {
//       // login
//       await page.getByLabel("username").fill("mynewuser");
//       await page.getByLabel("password").fill("mypassword123");
//       await page.getByRole("button", { name: /login/i }).click();

//       // open blog form
//       await page.getByRole("button", { name: /Create new blog/i }).click();

//       // create a blog
//       await page.getByLabel("title").fill("Like My input title");
//       await page.getByLabel("author").fill("Like My input author");
//       await page.getByLabel("url").fill("Like My input url");
//       await page.getByRole("button", { name: /create/i }).click();

//       // wait for the blog to show up anywhere
//       const blogTitle = page.getByText("Like My input title");
//       await expect(blogTitle).toBeVisible();

//       // grab the parent container of that title
//       const blogContainer = blogTitle.locator("..");

//       // show button
//       await blogContainer.getByRole("button", { name: /show/i }).click();

//       // like check
//       await expect(blogContainer.getByText("0 likes")).toBeVisible();
//       await blogContainer.getByRole("button", { name: /like/i }).click();
//       await expect(blogContainer.getByText("1 likes")).toBeVisible();
//     });
//   });
// });

import { test, expect } from "@playwright/test";

test.describe("Blog app", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("Login form is shown by default", async ({ page }) => {
    await expect(page.getByLabel("username")).toBeVisible();
    await expect(page.getByLabel("password")).toBeVisible();
    await expect(page.getByRole("button", { name: /login/i })).toBeVisible();
  });

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

      // still shows login button
      await expect(page.getByRole("button", { name: /login/i })).toBeVisible();
    });
  });

  test.describe("When logged in and blog exists", () => {
    test.beforeEach(async ({ page }) => {
      await page.getByLabel("username").fill("mynewuser");
      await page.getByLabel("password").fill("mypassword123");
      await page.getByRole("button", { name: /login/i }).click();
    });

    test("a new blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: /create new blog/i }).click();

      const uniqueTitle = "Create Test Blog " + Date.now();
      await page.getByLabel("title").fill(uniqueTitle);
      await page.getByLabel("author").fill("Test Author");
      await page.getByLabel("url").fill("http://testurl.com");
      await page.getByRole("button", { name: /^create$/i }).click();

      // Wait specifically for the blog in the list, not the notification
      const blogContainer = page.getByTestId(/blog-/).filter({
        has: page.getByText(uniqueTitle),
      });

      await expect(blogContainer).toBeVisible();
    });

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
  });
});
