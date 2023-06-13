import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AllExpenses from "./pages/AllExpenses";
import Charts from "./pages/Charts";
import { Container } from "@chakra-ui/react";
import Error from "./components/Error";
import { account } from "./appwrite/appwrite-config";
import Verification from "./pages/Verification";
import SignupVerification from "./pages/SignupVerification";

function App() {
  const router = createBrowserRouter([
    {
      path: "/signup",
      Component: Signup,
    },
    {
      path: "/login",
      Component: Login,
    },
    {
      path: "/verification",
      Component: Verification,
    },
    {
      path: "/signup-verification",
      Component: SignupVerification,
    },
    {
      path: "/",
      Component: Root,
      errorElement: <Error />,
      children: [
        {
          index: true,
          Component: Dashboard,
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
