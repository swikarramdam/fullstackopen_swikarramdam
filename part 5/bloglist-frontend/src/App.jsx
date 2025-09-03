//App.js

import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login"; // loginService = { login : async (credentials) {...}}
import Notification from "./components/Notifications";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  // const [errorMessage, setErrorMessage] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });
  const [expandedBlogId, setExpandedBlogId] = useState(null);

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  const showNotifications = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: null, type: null });
    }, 5000);
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    // console.log("logging in with", username, password);
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUsername("");
      setPassword("");
      showNotifications(`Welcome ${username}`);
    } catch {
      // setErrorMessage("Wrong Credentials");
      // setTimeout(() => {
      //   setErrorMessage(null);
      // }, 5000);
      showNotifications(`Login Failed`, "error");
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
      const newBlog = {
        title: newTitle,
        url: newUrl,
        author: newAuthor,
      };
      const returnedBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(returnedBlog));
      showNotifications(`Blog ${newTitle} added`);
      setNewTitle("");
      setNewUrl("");
      setNewAuthor("");
    } catch (error) {
      console.log("error creating blog", error);
      showNotifications(`Failed to add blog`, "error");
    }
  };

  if (!user) {
    return (
      <div>
        <h2>blogs</h2>
        {/* <h2>Login</h2> */}
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>username</label>
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <label>password</label>
            <input
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

  const handleLike = async (blog) => {
    console.log("Blog before update:", blog);
    try {
      const updatedBlog = { ...blog, likes: blog.likes + 1 };
      const returnedBlog = await blogService.update(blog.id, updatedBlog);
      console.log("Returned from backend:", returnedBlog); // Step 2: see what we got back

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
      !window.confirm(`Delete ${blogToDelete.title} by ${blogToDelete.author}`)
    )
      return;
    try {
      await blogService.remove(id);
      setBlogs(blogs.filter((b) => b.id !== id));
      showNotifications(`Deleted "${blogToDelete.title}"`);
    } catch (error) {
      console.log("Error deleting blog", error);
      showNotifications("Failed to delete", "error");
    }
  };

  return (
    <div>
      <Notification message={notification.message} type={notification.type} />

      {blogs
        .sort((a, b) => b.likes - a.likes) //works for arrays b-a (descending order), a-b (ascending order)
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
        logged in <button onClick={handleLogout}>logout</button>
      </p>
      <div>
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
    </div>
  );
};

export default App;
