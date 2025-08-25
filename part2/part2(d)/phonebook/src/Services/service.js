import axios from "axios";
// import { response } from "express";
// import { response } from "express";
const baseurl = "http://localhost:3001/api/persons";

const getAll = () => {
  const request = axios.get(baseurl);
  return request.then((response) => {
    return response.data.concat({
      _id: 100,
      name: "Test Bahadur",
      number: 99999,
    });
  });
};

const create = (newObj) => {
  const request = axios.post(baseurl, newObj);
  return request.then((response) => {
    return response.data;
  });
};

const remover = (_id) => {
  const request = axios.delete(`${baseurl}/${_id}`);
  return request.then((response) => response.data); //response has lots of stuff but all we need is data accessed with response.data
};
const update = (newObj, _id) => {
  const request = axios.put(`${baseurl}/${_id}`, newObj);
  return request.then((response) => response.data);
};
export default { getAll, create, remover, update };
