import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import Layout from "./Layout";
import About from "./components/About";
import Content from "./components/Content";
import { ThemeProvider } from "./components/ContextTheme/ThemeProvider";
// import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import ReactQuery from "./ReactQuery/ReactQuery";

// import AuthProvider from "./AuthProvider";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//     },
//   },
// });

export default function App() {
  //this var for react query
  // const [showDemo, setShowDemo] = useState(true);

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
  return (
    <QueryClientProvider client={new QueryClient()}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

//  <AuthProvider>
// <QueryClientProvider client={queryClient}>
// <ThemeProvider>
//   <RouterProvider router={router} />
//   <button onClick={() => setShowDemo(!showDemo)}>Toggle Demo</button>
//   {showDemo && <ReactQuery />}
// </ThemeProvider>
// </QueryClientProvider>
// </AuthProvider>
