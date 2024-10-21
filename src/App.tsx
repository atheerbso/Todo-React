import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import Home from "./Home";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      // loader: rootLoader,
    },
    {
      path: "/SignUp",
      element: <SignUp />,
    },
    {
      path: "/LogIn",
      element: <LogIn />,
    },
  ]);

  return <RouterProvider router={router} />;
}

// children: [
//   {
//     path: "SignUp /",
//     element: <SignUp />,
//   },
//   {
//     path: "LogIn /",
//     element: <LogIn />,
//   },
// ],
