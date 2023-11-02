import { useMutation, useQueryClient } from "react-query";
import { createAnecdotes } from "../../request";
import { useContext } from "react";
import NotificationContext from "./NotificationContext";

const AnecdoteForm = () => {
  const { notification, setNotification } = useContext(NotificationContext);
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation(createAnecdotes, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
    onError: (error) => {
      setNotification("Anecdootin on oltava vähentään 5 merkkiä");
    },
  });
  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    console.log("new anecdote");
    newAnecdoteMutation.mutate({ content, votes: 0 });
    setNotification(`Anecdote "${content}" was added`);
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
