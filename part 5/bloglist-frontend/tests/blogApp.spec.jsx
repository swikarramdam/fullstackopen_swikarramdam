import { test, expect } from "@playwright/test";

test.describe("Blog app", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("Login form is shown by default", async ({ page }) => {
    await expect(page.getByText("username")).toBeVisible();
    await expect(page.getByText("password")).toBeVisible();
    await expect(page.getByRole("button", { name: /login/i })).toBeVisible();
  });
  test.describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      //fill the login
      await page.getByLabel("username").fill("mynewuser");
      await page.getByLabel("password").fill("mypassword123");
      await page.getByRole("button", { name: /login/i }).click();

      //check
      await expect(page.getByText("logged in as mynewuser")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      //fill the login
      await page.getByLabel("username").fill("mynewuser");
      await page.getByLabel("password").fill("mypassword123");
      await page.getByRole("button", { name: /login/i }).click();

      //check
      await expect(page.getByRole("button", { name: /login/i })).toBeVisible();
    });
  });

  test.describe("When logged in", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("http://localhost:5173");
    });

    test("a new blog can be created", async ({ page }) => {
      //login
      await page.getByLabel("username").fill("mynewuser");
      await page.getByLabel("password").fill("mypassword123");
      await page.getByRole("button", { name: /login/i }).click();

      //expand
      await page.getByRole("button", { name: /Create new blog/i }).click();

      //after login
      await page.getByLabel("title").fill("My input title");
      await page.getByLabel("author").fill("My input author");
      await page.getByLabel("url").fill("My input url");
      await page.getByRole("button", { name: /create/i }).click();

      //check
      await expect(
        page.getByText("My input title", { exact: true })
      ).toBeVisible();
    });
  });
});
