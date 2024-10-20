import { useEffect, useState } from "react";
import AddTodoForm from "./components/addTodoForm";
import TodoList from "./components/TodoList";
import { dummyData } from "./data/todos";
// import TodoItem from "./todoitem";
import TodoSummary from "./components/TodoSummary";
import { Todo } from "./types/todo";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos: Todo[] = JSON.parse(
      localStorage.getItem("todos") || "[]"
    );
    return savedTodos.length > 0 ? savedTodos : dummyData;
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  function setTodoCompleted(id: number, completed: boolean) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
    );
  }
  function addToDo(title: string) {
    setTodos((prevTodos) => [
      {
        id: prevTodos.length + 1,
        title,
        completed: false,
      },
      ...prevTodos,
    ]);
  }
  function deleteTodo(id: number) {
    setTodos((prevTodos) => prevTodos.filter((Todo) => Todo.id !== id));
  }

  function deleteAllCompletedTodos() {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  }
  return (
    <main className="py-10 h-screen space-y-5 overflow-y-auto">
      <h1 className="font-bold text-3xl text-center">Your Todos</h1>

      <div className="max-w-lg mx-auto bg-slate-100 rounded-md p-5 space-y-6">
        <AddTodoForm onSubmit={addToDo} />
        <TodoList
          todos={todos}
          oncompletedChange={setTodoCompleted}
          onDelete={deleteTodo}
        />
      </div>
      <TodoSummary todos={todos} deleteAllCompleted={deleteAllCompletedTodos} />
    </main>
  );
}

export default App;

// <div className="space-y-2">
// {todos.map((todo) => (
//   <TodoItem
//     key={todo.id}
//     todo={todo}
//     oncompletedChange={setTodoCompleted}
//     onDelete={deleteTodo}
//   />
// ))}
// </div>
