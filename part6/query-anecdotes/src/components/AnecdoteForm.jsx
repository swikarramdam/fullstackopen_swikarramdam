import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../Services/anecdotes";
import { useNotification } from "./NotificationContext";
const AnecdoteForm = () => {
  const { state, dispatch } = useNotification();
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      //this works after data is returned from the backend as return response.data;
      const updated = queryClient
        .getQueryData(["anecdotes"])
        .concat(newAnecdote);
      queryClient.setQueryData(["anecdotes"], updated);
      dispatch({ type: "SET", payload: `${newAnecdote.content} added!` });
    },
    onError: (error) => {
      dispatch({
        type: "SET",
        payload: `Error : ${
          error.response?.data?.error || "Failed to create anecdote"
        }`,
      });
      // ?. -> if then
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    if (!content || content.length < 5) {
      dispatch({
        type: "SET",
        payload: "Anecdote must be at least 5 characters long!",
      });
      return;
    }
    newAnecdoteMutation.mutate(content);
    event.target.anecdote.value = "";
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
