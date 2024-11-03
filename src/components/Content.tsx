// import { useState } from "react";
import AddTodoForm from "./addTodoForm";
import TodoList from "./TodoList";
// import { dummyData } from "../data/todos";
import TodoSummary from "./TodoSummary";
import { Todo } from "../types/todo";
import { useAuth } from "../AuthProvider";
import { useQuery } from "@tanstack/react-query";
import http from "./HTTP/http";
import { User } from "lucide-react";

function Content() {
  //==
  const auth = useAuth();
  const userId = auth?.User?.id;

  const {
    data: todos = [],
    isLoading,
    isError,
  } = useQuery<Todo[]>({
    queryKey: ["todolist"],
    queryFn: () => {
      return http.get<Todo[]>("todo?User=" + User).then((res) => res.data);
    },
    enabled: !!userId,
  });
  //==
  //   const [todos, setTodos] = useState(() => {
  //     const savedTodos: Todo[] = JSON.parse(
  //       localStorage.getItem("todos") || "[]"
  //     );
  //     return savedTodos.length > 0 ? savedTodos : dummyData;
  //   });

  //   useEffect(() => {
  //     localStorage.setItem("todos", JSON.stringify(todos));
  //   }, [todos]);
  //   function setTodoCompleted(id: number, completed: boolean) {
  //     setTodos((prevTodos) =>
  //       prevTodos.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
  //     );
  //   }
  // function addToDo(title: string) {
  //   setTodos((prevTodos) => [
  //     {
  //       id: prevTodos.length + 1,
  //       title,
  //       completed: false,
  //       userId: "111",
  //     },
  //     ...prevTodos,
  //   ]);
  // }
  //   function deleteTodo(id: number) {
  //     setTodos((prevTodos) => prevTodos.filter((Todo) => Todo.id !== id));
  //   }

  //   function deleteAllCompletedTodos() {
  //     setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  //   }
  return (
    <main className="h-[100vh]">
      <div className="pt-40">
        <h1 className="font-bold text-3xl text-center p-3">
          Your Todos ,{/* {auth?.userId?.id} */}
        </h1>
        <div className="max-w-lg mx-auto bg-slate-100 rounded-md p-5 space-y-6 ">
          <TodoList
            todos={todos}
            oncompletedChange={() => {}}
            onDelete={() => {}}
          />
        </div>
        <AddTodoForm />
        <TodoSummary todos={todos} deleteAllCompleted={() => {}} />
      </div>
    </main>
  );
}

export default Content;
