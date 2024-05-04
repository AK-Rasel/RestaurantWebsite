import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/home/Home";
import Menu from "../Pages/Shop/Menu";
import Signup from "../components/Signup";
import AuthProvider from "../context/AuthProvider";
import PrivateRouter from "../private/PrivateRouter";
import UpdateProfile from "../Pages/dashboard/UpdateProfile";

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
        element: (
          <PrivateRouter>
            <Menu />
          </PrivateRouter>
        ),
      },
      {
        path: "/update_profile",
        element: (
          <PrivateRouter>
            <UpdateProfile />
          </PrivateRouter>
        ),
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
export default router;
