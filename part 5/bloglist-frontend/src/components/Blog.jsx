//Components/blog.jsx
const Blog = ({
  blog,
  handleLike,
  expanded,
  toggleExpanded,
  user,
  handleDelete,
}) => (
  <div
    style={{ border: "1px solid #ca3d3dff", padding: "10px", marginTop: "8px" }}
  >
    {blog.title} {blog.author}
    <button onClick={toggleExpanded}>{expanded ? "hide" : "show"}</button>
    {expanded && (
      <div>
        <div>{blog.url}</div>
        <div>
          {blog.likes} likes{" "}
          <button onClick={() => handleLike(blog)}>Like</button>
        </div>
        {user &&
          (blog.user?.id === user.id ||
            blog.user?._id?.toString() === user.id ||
            blog.user?.toString() === user.id) && (
            <button onClick={() => handleDelete(blog.id)}>Delete</button>
          )}
      </div>
    )}
  </div>
);

export default Blog;
