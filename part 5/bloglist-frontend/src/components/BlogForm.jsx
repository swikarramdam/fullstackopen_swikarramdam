//Components/BlogForm.jsx
// import Togglable from "./Togglable";
// const BlogForm = ({
//   addBlog,
//   newTitle,
//   newUrl,
//   newAuthor,
//   setNewTitle,
//   setNewAuthor,
//   setNewUrl,
// }) => {
//   return (
//     <div>
//       <Togglable buttonLabel="Create new blog">
//         <form onSubmit={addBlog}>
//           <div>
//             <label htmlFor="title">title</label>
//             <input
//               id="title"
//               type="text"
//               value={newTitle}
//               onChange={({ target }) => setNewTitle(target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="url">url</label>
//             <input
//               id="url"
//               type="text"
//               value={newUrl}
//               onChange={({ target }) => setNewUrl(target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="author">author</label>
//             <input
//               id="author"
//               type="text"
//               value={newAuthor}
//               onChange={({ target }) => setNewAuthor(target.value)}
//             />
//           </div>
//           <button type="submit">Create</button>
//         </form>
//       </Togglable>
//     </div>
//   );
// };

// export default BlogForm;
// import { useState } from "react";
// import Togglable from "./Togglable";

// const BlogForm = ({ addBlog }) => {
//   const [title, setTitle] = useState("");
//   const [author, setAuthor] = useState("");
//   const [url, setUrl] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     addBlog({
//       title,
//       author,
//       url,
//     });
//     setTitle("");
//     setAuthor("");
//     setUrl("");
//   };

//   return (
//     <div>
//       <Togglable buttonLabel="Create new blog">
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="title">title</label>
//             <input
//               id="title"
//               type="text"
//               value={title}
//               onChange={({ target }) => setTitle(target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="author">author</label>
//             <input
//               id="author"
//               type="text"
//               value={author}
//               onChange={({ target }) => setAuthor(target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="url">url</label>
//             <input
//               id="url"
//               type="text"
//               value={url}
//               onChange={({ target }) => setUrl(target.value)}
//             />
//           </div>
//           <button type="submit">Create</button>
//         </form>
//       </Togglable>
//     </div>
//   );
// };

// export default BlogForm;

import Togglable from "./Togglable";

const BlogForm = ({
  addBlog,
  newTitle,
  newAuthor,
  newUrl,
  setNewTitle,
  setNewAuthor,
  setNewUrl,
}) => {
  return (
    <div>
      <Togglable buttonLabel="Create new blog">
        <form onSubmit={addBlog} role="form">
          <div>
            <label htmlFor="title">title</label>
            <input
              id="title"
              type="text"
              value={newTitle}
              onChange={({ target }) => setNewTitle(target.value)}
            />
          </div>
          <div>
            <label htmlFor="author">author</label>
            <input
              id="author"
              type="text"
              value={newAuthor}
              onChange={({ target }) => setNewAuthor(target.value)}
            />
          </div>
          <div>
            <label htmlFor="url">url</label>
            <input
              id="url"
              type="text"
              value={newUrl}
              onChange={({ target }) => setNewUrl(target.value)}
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </Togglable>
    </div>
  );
};

export default BlogForm;
