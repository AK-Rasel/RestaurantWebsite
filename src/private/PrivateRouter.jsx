/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const PrivateRouter = ({ children }) => {
  const { loading, user } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return <LoadingSpinner />;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/signup" state={{ from: location }} replace></Navigate>;
};

export default PrivateRouter;
