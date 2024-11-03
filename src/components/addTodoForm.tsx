import { useState } from "react";
import http from "./HTTP/http";
import { useMutation } from "@tanstack/react-query";

interface AddTodoFormProps {
  onSubmit: (title: string, userId: string) => void;
}

export default function AddTodoForm({ onSubmit }: AddTodoFormProps) {
  const [input, setInput] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  const addTodoMutation = useMutation({
    mutationFn: (body: { title: string; userId: string }) =>
      http.post<{ title: string; userId: string }>("todo", body),
    onSuccess: (data) => {
    
      onSubmit(input, userId);
      setInput("");
    },
    onError: (error) => {
      console.error("Error adding todo:", error);
 
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input.trim() || !userId) return;
    addTodoMutation.mutateAsync({ title: input, userId });
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
        disabled={addTodoMutation.isLoading} // Disable button while adding
      >
        {addTodoMutation.isLoading ? "Adding..." : "Add"}
      </button>
    </form>
  );
}
