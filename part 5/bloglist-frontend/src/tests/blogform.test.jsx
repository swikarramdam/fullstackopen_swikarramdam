//tests/blogform.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import BlogForm from "../components/BlogForm";
import "@testing-library/jest-dom";

describe("<BlogForm />", () => {
  test("calls addBlog with correct details when a new blog is created", () => {
    const addBlog = vi.fn((event) => event.preventDefault());
    const setNewTitle = vi.fn();
    const setNewAuthor = vi.fn();
    const setNewUrl = vi.fn();

    render(
      <BlogForm
        addBlog={addBlog}
        newTitle="My input title"
        newAuthor="My input author"
        newUrl="My input url"
        setNewTitle={setNewTitle}
        setNewAuthor={setNewAuthor}
        setNewUrl={setNewUrl}
      />
    );

    // open form
    fireEvent.click(screen.getByText("Create new blog"));

    // instead of typing, just submit the form
    const form = screen.getByRole("form"); // add role="form" to <form> in BlogForm
    fireEvent.submit(form);

    // assertions
    expect(addBlog).toHaveBeenCalledTimes(1);
  });
});
