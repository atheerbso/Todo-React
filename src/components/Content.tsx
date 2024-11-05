import AddTodoForm from "./addTodoForm";
import TodoList from "./TodoList";
import TodoSummary from "./TodoSummary";
import { Todo } from "../types/todo";
import { useAuth } from "../AuthProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import http from "./HTTP/http";

function Content() {
  const auth = useAuth();
  const userId = auth?.User?.id;
  const queryClient = useQueryClient();

  // Fetch todos
  const {
    data: todos = [],
    isLoading,
    isError,
  } = useQuery<Todo[]>({
    queryKey: ["todolist"],
    queryFn: () =>
      http.get<Todo[]>(`todo?userId=${userId}`).then((res) => res.data),
    enabled: !!userId,
  });

  // Delete a single todo by ID
  const deleteTodo = useMutation({
    mutationFn: (id: number) => http.delete(`todo/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todolist"],
      });
    },
  });

  // Delete all completed todos for the current user
  const deleteAllCompleted = useMutation({
    mutationFn: () => http.delete(`todo/completed?userId=${userId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todolist"],
      });
    },
  });

  // Toggle completion status of a todo
  const toggleCompleted = useMutation({
    mutationFn: (todo: Todo) =>
      http.put(`todo/${todo.id}`, { ...todo, completed: !todo.completed }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todolist"],
      });
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to get todos</p>;

  const handleDelete = (id: number) => {
    deleteTodo.mutate(id);
  };

  const handleDeleteAllCompleted = () => {
    deleteAllCompleted.mutate();
  };

  const handleCompletedChange = (id: number) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (todoToUpdate) {
      toggleCompleted.mutate(todoToUpdate);
    }
  };

  return (
    <main className="h-[100vh]">
      <div className="pt-40">
        <h1 className="font-bold text-3xl text-center p-3">
          Your Todos, {auth?.User?.name}
        </h1>
        <div className="max-w-lg mx-auto bg-slate-100 rounded-md p-5 space-y-6 ">
          <AddTodoForm />
          <TodoList
            todos={todos}
            oncompletedChange={handleCompletedChange}
            onDelete={handleDelete}
          />
        </div>
        <TodoSummary
          todos={todos}
          deleteAllCompleted={handleDeleteAllCompleted}
        />
      </div>
    </main>
  );
}

export default Content;
