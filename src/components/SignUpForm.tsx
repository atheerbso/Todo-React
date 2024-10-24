// "use client";
// import React from "react";
// import { useForm } from "react-hook-form";
// import type { FieldValues } from "react-hook-form";

// export default function SignUpForm() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     reset,
//     getValues,
//   } = useForm();

//   const onSubmit = async (data: FieldValues) => {
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     reset();
//   };
//   return (
//     <div className="bg-gray-200 w-[30%] h-[60%]  p-4 border rounded-lg   m-auto  justify-center items-center ">
//       <div className=" m-auto text-center p-6 ">
//         <h1 className="pb-4 ">Sign Up</h1>
//         <h4>
//           Have an Account ? <a href="#">Log In</a>
//         </h4>
//       </div>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="flex flex-col items-center m-auto space-y-4"
//       >
//         {/* i will check it  */}
//         <input
//           type="text"
//           {...register("username", {
//             required: "user name is required ",
//             pattern: /^[A-Za-z]+$/i,
//             maxLength: 10,
//           })}
//           placeholder="UserName"
//           className=" w-[70%] h-9 border-none  outline-none rounded-sm p-1 "
//         ></input>
//         {errors.username && (
//           <p className="text-red-500">{`${errors.username.message}`}</p>
//         )}
//         <input
//           {...register("email", {
//             required: "Email Field is Required", // message will show when i skip to write email
//           })}
//           type="email"
//           placeholder="Email"
//           className=" w-[70%] h-9 border-none  outline-none rounded-sm p-1 "
//         ></input>
//         {errors.email && (
//           <p className="text-red-500">{`${errors.email.message}`}</p>
//         )}
//         <input
//           {...register("password", {
//             required: "Password is Required ",
//             minLength: {
//               value: 10,
//               message: "Password must  be at least 10 charecters",
//             },
//           })}
//           type="password"
//           placeholder="Password"
//           className=" w-[70%] h-9 border-none  outline-none rounded-sm p-1 "
//         ></input>
//         {errors.password && (
//           <p className="text-red-500">{`${errors.password.message}`}</p>
//         )}
//         <input
//           {...register("confirmPassword", {
//             required: "Confirm password is required ",
//             validate: (value) =>
//               value === getValues("password") || "password must match",
//           })}
//           type="password"
//           placeholder="Confirm Password"
//           className=" w-[70%] h-9 border-none  outline-none rounded-sm p-1"
//         ></input>
//         {errors.confirmPassword && (
//           <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
//         )}
//         <button
//           disabled={isSubmitting}
//           type="submit"
//           className="bg-blue-700 w-[70%] h-10 rounded-sm text-white"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }
