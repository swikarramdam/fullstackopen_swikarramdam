//services/blogs.js
import axios from "axios";
const baseUrl = "/api/blogs";
let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
const create = async ({ title, author, url }) => {
  const response = await axios.post(
    // syntax = axios.post(url, data, config)
    `${baseUrl}`,
    { title, author, url },
    { headers: { Authorization: token } }
  );
  return response.data;
};

const update = async (id, updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, {
    headers: { Authorization: token },
  });
  return response.data;
};

const remove = async (id) => {
  console.log("blog service remove here");
  const response = await axios.delete(`${baseUrl}/${id}`, {
    //axios.delete (url,config)
    headers: { Authorization: token },
  });
  return response.data;
};

export default { getAll, setToken, create, update, remove };
