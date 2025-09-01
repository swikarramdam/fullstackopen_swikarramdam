//services/login.js
import axios from "axios";
const baseUrl = "/api/login";

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login }; //exporting an object containing a function i.e. login
