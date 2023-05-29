import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AllExpenses from "./pages/AllExpenses";
import Charts from "./pages/Charts";
import { Container } from "@chakra-ui/react";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: Root,
    },
    {
      index: true,
      path: "dashboard",
      Component: Dashboard,
    },
    {
      path: "signup",
      Component: Signup,
    },
    {
      path: "login",
      Component: Login,
    },
    {
      path: "dashboard",
      Component: Dashboard,
    },
    {
      path: "all-expenses",
      Component: AllExpenses,
    },
    {
      path: "charts",
      Component: Charts,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
