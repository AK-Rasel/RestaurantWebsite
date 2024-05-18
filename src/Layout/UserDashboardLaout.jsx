import React from "react";
// import React from "react";
import { Link, Outlet } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import {
  FaHome,
  FaLocationArrow,
  FaQuestionCircle,
  FaRegUser,
  FaShoppingBag,
  FaUser,
} from "react-icons/fa";
import { AiFillPlusSquare } from "react-icons/ai";
import { RiFileEditFill } from "react-icons/ri";
import { FiMenu } from "react-icons/fi";
import logo from "../../public/SVG/icon&font.svg";
import useAdmin from "../hooks/useAdmin";

const UserDashboardLaout = () => {
  const sidebar = (
    <>
      <li>
        <Link to="/dashboard" className="flex justify-start mb-3">
          <img className="w-36" src={logo} alt="" />
          <div className="badge  badge-warning p-2">User</div>
        </Link>
      </li>
      <hr />
      <li className="mt-3">
        <Link to="/dashboard">
          <MdDashboard /> Dashboard
        </Link>
      </li>
      <li>
        <Link to="">
          <FaShoppingBag /> Profile
        </Link>
      </li>
      <li>
        <Link to="">
          <AiFillPlusSquare /> reservation
        </Link>
      </li>
      <li>
        <Link to="">
          <RiFileEditFill /> Payment History
        </Link>
      </li>
      <li>
        <Link to="">
          <FaUser /> MY CART
        </Link>
      </li>
      <li>
        <Link to="">
          <FaUser /> MY bookings
        </Link>
      </li>
      <li>
        <Link to="">
          <FaUser /> Order Tracking
        </Link>
      </li>
    </>
  );
  const sharedLink = (
    <>
      <li className="mt-3">
        <Link to="/">
          <FaHome /> Back to Home
        </Link>
      </li>
      <li>
        <Link to="">
          <FaLocationArrow />
          Shop
        </Link>
      </li>
      <li>
        <Link to="">
          <FaLocationArrow />
          Contact
        </Link>
      </li>
      <li>
        <Link to="">
          <FaLocationArrow />
          FAQ
        </Link>
      </li>
    </>
  );

  return (
    <div>
      <div className="drawer sm:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col sm:items-start sm:justify-start">
          <div className="flex items-center justify-between my-4 mx-4">
            <label
              htmlFor="my-drawer-2"
              className="btn bg-orange text-xl drawer-button md:hidden"
            >
              <FiMenu />
            </label>
            <button className="btn rounded-full px-4 hover:bg-transparent hover:border-orange  bg-orange sm:hidden">
              <FaRegUser /> Login
            </button>
          </div>
          {/* all pages ----start*/}
          <div className="mt-5 md:mt-2 mx-4">
            <Outlet />
          </div>
          {/* all pages -----end*/}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content text-base">
            {/* Sidebar content here */}
            {sidebar}
            {/* shared Links */}
            {sharedLink}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardLaout;
