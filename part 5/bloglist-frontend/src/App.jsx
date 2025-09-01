//App.js

import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login"; // loginService = { login : async (credentials) {...}}
import Notification from "./components/Notifications";
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
      setNewTitle("");
      setNewUrl("");
      setNewAuthor("");
      showNotifications(`Blog ${newTitle} added`);
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

  return (
    <div>
      <Notification message={notification.message} type={notification.type} />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
      <p>
        logged in <button onClick={handleLogout}>logout</button>
      </p>
      <div>
        <h2>Create New Blog</h2>
        <form onSubmit={addBlog}>
          <div>
            <label>title</label>

            <input
              type="text"
              value={newTitle}
              onChange={({ target }) => {
                setNewTitle(target.value);
              }}
            />
          </div>
          <div>
            <label>url</label>

            <input
              type="text"
              value={newUrl}
              onChange={({ target }) => {
                setNewUrl(target.value);
              }}
            />
          </div>
          <div>
            <label>author</label>

            <input
              type="text"
              value={newAuthor}
              onChange={({ target }) => {
                setNewAuthor(target.value);
              }}
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default App;
