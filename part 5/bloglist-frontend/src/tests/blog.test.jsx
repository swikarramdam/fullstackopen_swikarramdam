//tests/blog.test.jsx
import { getByText, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Blog from "../components/Blog";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

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

  test("shows blog URL and likes when the show button is clicked", async () => {
    const toggleExpanded = vi.fn(); // We'll track clicks
    const expanded = false; // Initially collapsed

    render(
      <Blog blog={blog} expanded={expanded} toggleExpanded={toggleExpanded} />
    );

    // URL and likes should NOT be visible by default
    expect(screen.queryByText(blog.url)).toBeNull();
    expect(screen.queryByText(`${blog.likes} likes`)).toBeNull();

    // Click the 'show' button
    const showButton = screen.getByText("show");
    await userEvent.click(showButton);

    // After clicking, toggleExpanded should have been called once
    expect(toggleExpanded).toHaveBeenCalledTimes(1);

    // To test actual rendering after state change, you'd need to render with expanded=true
    render(
      <Blog blog={blog} expanded={true} toggleExpanded={toggleExpanded} />
    );

    expect(screen.getByText(blog.url)).toBeDefined();
    expect(screen.getByText(`${blog.likes} likes`)).toBeDefined();
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
