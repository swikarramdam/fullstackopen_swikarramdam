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
});
