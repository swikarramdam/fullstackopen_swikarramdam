// reducers/anecdoteReducer.js
import { createSlice } from "@reduxjs/toolkit";
import * as anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    voteAnecdoteLocal(state, action) {
      const id = action.payload;
      return state.map((anecdote) =>
        anecdote.id === id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      );
    },
    createAnecdoteLocal(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setAnecdotes, voteAnecdoteLocal, createAnecdoteLocal } =
  anecdoteSlice.actions;

// --- Async thunks for backend communication ---
//6.16
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updated = { ...anecdote, votes: anecdote.votes + 1 };
    await anecdoteService.updateAnecdote(anecdote.id, updated);
    dispatch(voteAnecdoteLocal(anecdote.id));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(createAnecdoteLocal(newAnecdote));
  };
};

export default anecdoteSlice.reducer;
