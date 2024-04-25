import React, { useEffect, useState } from "react";
import logo from "../../public/SVG/icon&font.svg";
import { LuPhoneCall } from "react-icons/lu";

const Navbar = () => {
  const [isSticky, setSticky] = useState(false);
  // handle scroll handle fuctions
  useEffect(() => {
    const scrollHandle = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", scrollHandle);
    return () => {
      window.addEventListener("scroll", scrollHandle);
    };
  }, []);
  // nav link❤😍
  const NavItems = (
    <>
      <li>
        <a>Home</a>
      </li>
      <li>
        <details>
          <summary>Manu</summary>
          <ul className="p-2">
            <li>
              <a>All </a>
            </li>
            <li>
              <a>Salad</a>
            </li>
            <li>
              <a>Pizza</a>
            </li>
          </ul>
        </details>
      </li>
      {/* servies */}
      <li>
        <details>
          <summary>Services</summary>
          <ul className="p-2">
            <li>
              <a>Online Order</a>
            </li>
            <li>
              <a>Table Booking</a>
            </li>
            <li>
              <a>Order Tracking</a>
            </li>
          </ul>
        </details>
      </li>

      <li>
        <a>Offers</a>
      </li>
    </>
  );
  return (
    <header className="w-full  fixed top-0 right-0 transition-all duration-300 ease-in-out ">
      <div
        className={`navbar section-container  ${
          isSticky
            ? "shadow-md bg-base-100 transition-all duration-300 ease-out"
            : ""
        }`}
      >
        <div className="lg:navbar-start w-3/4  justify-between">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {NavItems}
            </ul>
          </div>
          <a href="/">
            <img className="h-8 lg:h-10" src={logo} alt="" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {/* nav */}
            {NavItems}
          </ul>
        </div>
        <div className="navbar-end">
          <div className="hidden lg:flex">
            {/* search */}
            <button className=" btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            {/* Cart */}
            <div className="dropdown dropdown-end mr-3">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm py-[10px] bg-orenge indicator-item">
                    8
                  </span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow border-orenge"
              >
                <div className="card-body">
                  <span className="font-bold text-lg">8 Items</span>
                  <span className="text-red font-semibold">Subtotal: $999</span>
                  <div className="card-actions">
                    <button className="btn rounded-full px-4 hover:bg-transparent hover:border-orenge  bg-orenge btn-block">
                      View cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* button */}
          <a className="btn rounded-full px-4 hover:bg-transparent hover:border-orenge  bg-orenge">
            <LuPhoneCall /> Contact
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
