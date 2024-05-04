/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const Profile = ({ user }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout().then((result) => {
      navigate("/signup");
      toast.success("Successfully Logout").catch((error) => {
        alert("logout failed");
      });
    });
  };
  console.log(user);
  return (
    <div>
      <div className="drawer drawer-end z-50">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer-4" className="drawer-button ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={
                    user.photoURL
                      ? user.photoURL
                      : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  }
                />
              </div>
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <a>Profile</a>
            </li>
            <li>
              <a>Order</a>
            </li>
            <li>
              <a>Setting</a>
            </li>
            <li>
              <button
                htmlFor="my-drawer-4"
                aria-label="close sidebar"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
