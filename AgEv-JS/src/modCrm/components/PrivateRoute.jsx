import React from "react";
import { useGlobalContext } from "../../hooks/context";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const value = useGlobalContext();

  return value.user ? (
    value.role === "Super Admin" ||
    value.role === "Loan Branchr" ||
    value.role === "Operations Head" ||
    value.role === "Operations Manager" ||
    value.role === "Regional Manager" ||
    value.role === "Area Manager" ||
    value.role === "Branch Manager" ? (
      <Outlet />
    ) : (
      <Navigate to="/dashboard" />
    )
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
// state={from: location }
