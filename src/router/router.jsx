import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/home/Home";
import Menu from "../Pages/Shop/Menu";
import Signup from "../components/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
export default router;
