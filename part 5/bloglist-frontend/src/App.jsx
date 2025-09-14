// App.jsx
import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notifications";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });
  const [expandedBlogId, setExpandedBlogId] = useState(null);

  // ✅ Restore user and fetch blogs once
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const savedUser = JSON.parse(loggedUserJSON);
      setUser(savedUser);
      blogService.setToken(savedUser.token);

      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, []);

  const showNotifications = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: null, type: null }), 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loggedUser = await loginService.login({ username, password });
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(loggedUser));
      setUsername("");
      setPassword("");
      showNotifications(`Welcome ${loggedUser.username}`);
      // Fetch blogs after login
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    } catch {
      showNotifications("Login Failed", "error");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogUser");
    setUser(null);
    blogService.setToken(null);
  };

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = { title: newTitle, author: newAuthor, url: newUrl };
      const returnedBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(returnedBlog));
      showNotifications(`Blog "${newTitle}" added`);
      setNewTitle("");
      setNewAuthor("");
      setNewUrl("");
    } catch {
      showNotifications("Failed to add blog", "error");
    }
  };

  const handleLike = async (blog) => {
    try {
      const updatedBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1, // only changing likes
      };
      const returnedBlog = await blogService.update(blog.id, updatedBlog);
      setBlogs(blogs.map((b) => (b.id === blog.id ? returnedBlog : b)));
      setExpandedBlogId(blog.id);
    } catch (error) {
      console.log("Error updating likes", error);
      showNotifications("Failed to update likes", "error");
    }
  };

  const handleDelete = async (id) => {
    const blogToDelete = blogs.find((b) => b.id === id);
    if (
      !window.confirm(`Delete ${blogToDelete.title} by ${blogToDelete.author}?`)
    )
      return;

    try {
      await blogService.remove(id);
      setBlogs(blogs.filter((b) => b.id !== id));
      showNotifications(`Deleted "${blogToDelete.title}"`);
    } catch {
      showNotifications("Failed to delete", "error");
    }
  };

  if (!user) {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">username</label>
            <input
              id="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <Notification message={notification.message} type={notification.type} />

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            expanded={blog.id === expandedBlogId}
            toggleExpanded={() =>
              setExpandedBlogId(blog.id === expandedBlogId ? null : blog.id)
            }
            handleLike={handleLike}
            handleDelete={handleDelete}
            user={user}
          />
        ))}

      <p>
        logged in as {user.username}{" "}
        <button onClick={handleLogout}>logout</button>
      </p>

      <h2>Create New Blog</h2>
      <BlogForm
        addBlog={addBlog}
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        newAuthor={newAuthor}
        setNewAuthor={setNewAuthor}
        newUrl={newUrl}
        setNewUrl={setNewUrl}
      />
    </div>
  );
};

export default App;
