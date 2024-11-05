// "use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form"; // library to cheack data regesrtation
import { z } from "zod"; // library to cheack data regesrtation , but for more complex
import http from "./HTTP/http";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

//here is all scheam validation to cheack all inputs data

const signUpSchema = z
  .object({
    email: z.string().email(),
    name: z.string().min(2, "the fisrt litter must to be capital"),
    password: z.string().min(10, "Password must  be at least 10 charecters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password must match",
    path: ["confirmPassword"],
  });

type signUpSchema = z.infer<typeof signUpSchema>;
// isSubmitting
export default function SignUpFormWithZod() {
  const navigate = useNavigate();
  const signUpWithMutation = useMutation({
    mutationFn: (body: signUpSchema) =>
      http.post<signUpSchema>("user", body).then((res) => res.data),
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      console.error("Signup error:", error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm<signUpSchema>({
    resolver: zodResolver(signUpSchema),
  });
  const onSubmit: SubmitHandler<signUpSchema> = (data) => {
    signUpWithMutation.mutate(data);
  };

  return (
    <div className="bg-gray-200 w-[30%] h-[60%]  p-4 border rounded-lg   m-auto  justify-center items-center ">
      <div className=" m-auto text-center p-6 ">
        <h1 className="pb-4 ">Sign Up</h1>
        <h4>
          Have an Account ? <a href="#">Log In</a>
        </h4>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center m-auto space-y-4"
      >
        <input
          {...register("name")}
          type="text"
          placeholder="Username"
          className=" w-[70%] h-9 border-none  outline-none rounded-sm p-1 "
        ></input>
        {errors.name && (
          <p className="text-red-500">{`${errors.name.message}`}</p>
        )}
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className=" w-[70%] h-9 border-none  outline-none rounded-sm p-1 "
        ></input>
        {errors.email && (
          <p className="text-red-500">{`${errors.email.message}`}</p>
        )}
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className=" w-[70%] h-9 border-none  outline-none rounded-sm p-1 "
        ></input>
        {errors.password && (
          <p className="text-red-500">{`${errors.password.message}`}</p>
        )}
        <input
          {...register("confirmPassword")}
          type="password"
          placeholder="Confirm Password"
          className=" w-[70%] h-9 border-none  outline-none rounded-sm p-1"
        ></input>
        {errors.confirmPassword && (
          <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
        )}
        <button
          //   disabled={isSubmitting}
          type="submit"
          className="bg-blue-700 w-[70%] h-10 rounded-sm text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
} //end of SignUpFormWithZod

// function signUpWithMutation() {
//   throw new Error("Function not implemented.");
// }
