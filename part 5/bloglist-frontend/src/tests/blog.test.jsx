//tests/blog.test.jsx
import { getByText, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Blog from "../components/Blog";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import BlogForm from "../components/BlogForm";

describe("<Blog />", () => {
  const blog = {
    title: "Test Title",
    author: "Test Author",
    url: "testurl.com",
    likes: 10,
    user: { id: "123", name: "testName" },
  };

  test("Blogs render with title and author only and not likes or url by default", () => {
    render(<Blog blog={blog} />);
    expect(screen.getByText(/Test Title/i)).toBeDefined();
    expect(screen.getByText("Test Author")).toBeDefined();
    expect(screen.queryByText("testurl.com")).toBeNull();
    expect(screen.queryByText("10 likes")).toBeNull();
  });

  test("if like button is clicked twice, event handler is called twice", async () => {
    const mockHandler = vi.fn();
    render(<Blog blog={blog} handleLike={mockHandler} expanded={true} />);

    const user = userEvent.setup();
    const likeButton = screen.getByText("Like");

    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandler).toHaveBeenCalledTimes(2);
  });
});
