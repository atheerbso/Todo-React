// "use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import http from "./HTTP/http";
import { useNavigate } from "react-router-dom";

//here is all scheam validation to cheack all inputs data

const logInSchema = z.object({
  name: z.string(),
  password: z.string().min(10, "Password must  be at least 10 charecters"),
});

type logInSchema = z.infer<typeof logInSchema>;

export default function LogInForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    // formState: {  isSubmitting },
    // reset,
  } = useForm<logInSchema>({
    resolver: zodResolver(logInSchema),
  });

  const onSubmit = async (data: logInSchema) => {
    await http.get<logInSchema[]>("/user").then((result) => {
      console.log(result.data);
      const login = result.data.find(
        (item) => item.name === data.name && item.password === data.password
      );
      if (login) {
        navigate("/Content");
      } else {
        console.error("Signup error");
      }
    });
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
          type="password"
          placeholder="Password"
          className=" w-[70%] h-9 border-none  outline-none rounded-sm p-1 "
        ></input>

        <button
          //   disabled={isSubmitting}
          type="submit"
          className="bg-blue-700 w-[70%] h-10 rounded-sm text-white"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}