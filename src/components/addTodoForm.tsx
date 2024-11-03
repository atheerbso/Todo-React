import { useState } from "react";
import http from "./HTTP/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../AuthProvider";

// interface AddTodoFormProps {
//   onSubmit: (title: string, userId: string) => void;
// }

export default function AddTodoForm() {
  const [input, setInput] = useState("");
  const auth = useAuth();
  const userId = auth?.User?.id;

  const queryClient = useQueryClient();

  const addToDoFormMutation = useMutation({
    mutationFn: (body: { title: string; userId: string }) =>
      http
        .post<{ title: string; userId: string }>("todo", body)
        .then((res) => res.data),
    onSuccess: (data) => {
      setInput("");
    },
    onError: (error) => {
      console.error("Error adding todo:", error);
      // Display an error message to the user or handle the error appropriately
      alert("Failed to add todo. Please try again.");
    },
  });
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input.trim() || !userId) return;
    addToDoFormMutation.mutateAsync({ title: input, userId });
    // onSuccess: () => {
    //   setInput("");
    // };
  }
  return (
    <form className="flex" onSubmit={handleSubmit}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="What needs to be done ?"
        className="rounded-s-md grow border border-gray-400 p-2"
      />

      <button
        type="submit"
        className="w-16 rounded-e-md bg-slate-900 text-white hover:bg-slate-900"
        disabled={addToDoFormMutation.isLoading}
      >
        {addToDoFormMutation.isLoading ? "Adding..." : "Add"}
      </button>
      {addToDoFormMutation.isError && (
        <p className="text-red-500">
          Error adding todo: {addToDoFormMutation.error?.message}
        </p>
      )}
    </form>
  );
}
