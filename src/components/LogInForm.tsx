// "use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import http from "./HTTP/http";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { useQuery } from "@tanstack/react-query";

//here is all scheam validation to cheack all inputs data

const logInSchema = z.object({
  name: z.string(),
  password: z.string().min(10, "Password must  be at least 10 charecters"),
}); //00

type logInSchema = z.infer<typeof logInSchema>;

export default function LogInForm() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<logInSchema>({
    resolver: zodResolver(logInSchema),
  }); //00

  const { data: users } = useQuery<logInSchema[]>({
    queryKey: ["loginKey"],
    queryFn: async () => {
      const response = await http.get<logInSchema[]>("/user");
      return response.data;
    },
  });

  const onSubmit: SubmitHandler<logInSchema> = async (item) => {
    try {
      const foundUser = users?.find(
        (user) => user.name === item.name && user.password === item.password
      );

      if (foundUser) {
        console.log("Found user:", foundUser);
        auth?.loginAction(foundUser);
        navigate("/");
      } else {
        alert("Sorry! Name or password is incorrect. Please try again.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("An error occurred during login. Please try again later.");
    }
  };
  return (
    <div className="bg-gray-200 w-[30%] h-[60%]  p-4 border rounded-lg   m-auto  justify-center items-center ">
      <div className=" m-auto text-center p-6 ">
        <h1 className="pb-4 ">Sign In</h1>
      </div>
      <form
        //===
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center m-auto space-y-4"
      >
        <input
          {...register("name")}
          type="text"
          placeholder="Username"
          className=" w-[70%] h-9 border-none  outline-none rounded-sm p-1 "
        ></input>

        <input
          {...register("password")}
          type="text"
          placeholder="Password"
          className=" w-[70%] h-9 border-none  outline-none rounded-sm p-1 "
        ></input>

        <button
          type="submit"
          className="bg-blue-700 w-[70%] h-10 rounded-sm text-white"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
