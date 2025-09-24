import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";
export const getAnecdotes = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
export const createAnecdote = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data; //we're doing this in order to update the frontend
};

export const updateAnecdote = async (anecdote) => {
  const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
  const response = await axios.put(
    `${baseUrl}/${anecdote.id}`,
    updatedAnecdote
  );
  return response.data;
};
