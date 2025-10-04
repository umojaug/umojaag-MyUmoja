import React from "react";
import { useGlobalContext } from "../../hooks/context";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const value = useGlobalContext();
  return value.user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
// state={from: location }
