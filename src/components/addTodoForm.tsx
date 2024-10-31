//with react query
import { useEffect, useState } from "react";
import http from "./HTTP/http";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface AddTodoFormProbs {
  onSubmit: (title: string, userId: string) => void;
}

//add to do func an
export default function AddTodoForm({ onSubmit }: AddTodoFormProbs) {
  const [input, setInput] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const addTodoMutation = useMutation({
    mutationFn: (body: { title: string; userId: string }) =>
      http
        .post<{ title: string; userId: string }>("todo", body)
        .then((res) => res.data),
  });
  useEffect(() => {}, []);
  function handlSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input.trim() || !userId) return;
    try {
      addTodoMutation.mutateAsync({ title: input, userId }).then((res) => {
        onSubmit(input, userId);
        setInput("");
      });
    } catch (error) {
      console.error("There is error in adding proccess", error);
      setError("can't add todo");
    }
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

// import { useState } from "react";
// import http from "./HTTP/http";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// interface AddTodoFormProbs {
//   onSubmit: (title: string) => void;
// }

// //add to do func an
// export default function AddTodoForm({ onSubmit }: AddTodoFormProbs) {
//   const [input, setInput] = useState("");

//   const  addTodoMutation  = useMutation({
//     mutationFn: (body:{title:string , userId:string})=>{
// http.post<(title:string , userId:string)>("todo" , body)
//     }});
//   function handlSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     if (!input.trim()) return;
//     try{
//         addTodoMutation.mutateAsync({title:input , userId:string}).then(())=> {
//             onSubmit(input , userId );
//             setInput("");
//         }
//     }
//     // //to link with db and add to todo list
//     // const res = http.post<{ title: string }>("todo", { title: input });
//     // console.log(res);
//     // onSubmit(input);
//     // // setInput("");
//   }

//   return (
//     <form className="flex" onSubmit={handlSubmit}>
//       <input
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="What needs to be done ?"
//         className="rounded-s-md grow border border-gray-400 p-2"
//       />
//       <button
//         type="submit"
//         className="w-16 rounded-e-md bg-slate-900 text-white hover:bg-slate-900"
//       >
//         Add
//       </button>
//     </form>
//   );
// }
