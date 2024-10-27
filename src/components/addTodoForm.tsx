import { useState } from "react";
import http from "./HTTP/http";

interface AddTodoFormProbs {
  onSubmit: (title: string) => void;
}

export default function AddTodoForm({ onSubmit }: AddTodoFormProbs) {
  const [input, setInput] = useState("");

  function handlSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input.trim()) return;
    //to link with db
    const res = http.post<{ title: string }>("todo", { title: input });
    console.log(res);
    onSubmit(input);
    // setInput("");
  }

  return (
    <form className="flex" onSubmit={handlSubmit}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="What needs to be done ?"
        className="rounded-s-md grow border border-gray-400 p-2"
      />
      <button
        type="submit"
        className="w-16 rounded-e-md bg-slate-900 text-white hover:bg-slate-900"
      >
        Add
      </button>
    </form>
  );
}
