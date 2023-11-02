import { getAnecdotes, updateAnecdote } from "../request";
import AnecdoteForm from "./components/AnecdoteForm";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useContext } from "react";
import NotificationContext from "./components/NotificationContext";
import Notification from "./components/Notification";

const App = () => {
  const { notification, setNotification } = useContext(NotificationContext);

  const queryClient = useQueryClient();
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    setNotification(`Anecdote "${anecdote.content}" was voted`);
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
  });

  console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>{result.error.message}</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <AnecdoteForm />
      <Notification />

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
