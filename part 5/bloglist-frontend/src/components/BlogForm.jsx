//Components/BlogForm.jsx
import Togglable from "./Togglable";
const BlogForm = ({
  addBlog,
  newTitle,
  newUrl,
  newAuthor,
  setNewTitle,
  setNewAuthor,
  setNewUrl,
}) => {
  return (
    <div>
      <Togglable buttonLabel="Create new blog">
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
      </Togglable>
    </div>
  );
};

export default BlogForm;
