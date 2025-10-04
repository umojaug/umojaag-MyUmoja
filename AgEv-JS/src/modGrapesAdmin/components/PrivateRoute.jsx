import React from "react";
import { useGlobalContext } from "../../hooks/context";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const value = useGlobalContext();

  return value.user ? (
    value.role === "Grapes Admin" ? (
      <Outlet />
    ) : (
      <Navigate to="/grapes" />
    )
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
// state={from: location }
