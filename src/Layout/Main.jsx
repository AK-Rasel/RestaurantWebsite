import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../index.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Toaster } from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";

const Main = () => {
  const { loading, user } = useContext(AuthContext);
  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          {" "}
          <Navbar />
          <div className="min-h-screen">
            <Outlet />
          </div>
          <Footer />
          <Toaster
            className="z-50"
            position="bottom-left"
            reverseOrder={false}
          />
        </div>
      )}
    </div>
  );
};

export default Main;
