import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/home/Home";
import Menu from "../Pages/Shop/Menu";
import Signup from "../components/Signup";

import PrivateRouter from "../private/PrivateRouter";
import UpdateProfile from "../Pages/dashboard/UpdateProfile";
import CartPage from "../Pages/Shop/CartPage";
import DashboardLayout from "../Layout/DashboardLayout";
import { Dashboard } from "../Pages/dashboard/admin/Dashboard";
import Users from "../Pages/dashboard/admin/Users";
import AddMenu from "../Pages/dashboard/admin/AddMenu";

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
      {
        path: "/cart-page",
        element: (
          <PrivateRouter>
            <CartPage />
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
  {
    path: "dashboard",
    element: (
      <PrivateRouter>
        <DashboardLayout />
      </PrivateRouter>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "menu-add",
        element: <AddMenu />,
      },
    ],
  },
]);
export default router;
