import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdotes } from "./Services/anecdotes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; //useQuery is a React Query hook used to fetch and cache server data.
import { updateAnecdote } from "./Services/anecdotes";
import { useNotification } from "./components/NotificationContext";
const App = () => {
  const { state, dispatch } = useNotification();
  const queryClient = useQueryClient();

  const voteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const updated = queryClient
        .getQueryData(["anecdotes"])
        .map((a) => (a.id === updatedAnecdote.id ? updatedAnecdote : a));
      queryClient.setQueryData(["anecdotes"], updated);
      dispatch({
        type: "SET",
        payload: `You voted ${updatedAnecdote.content}`,
      });
    },
  });

  const {
    data: anecdotes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: false,
  });
  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote);
  };
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching anecdotes</div>;
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
