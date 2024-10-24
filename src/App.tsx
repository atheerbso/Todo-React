import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import Layout from "./Layout";
import About from "./components/About";
import Content from "./Content";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Content />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
        {
          path: "login",
          element: <LogIn />,
        },
        {
          path: "about",
          element: <About />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
