import React from "react";
import { useGlobalContext } from "../../hooks/context";
import { Navigate, Outlet } from "react-router-dom";
// Internal Audit Manager,Assistant Audit Manager, Internal Audit Officer
const PrivateRoute = () => {
  const value = useGlobalContext();

  return value.user ? (
    value.role === "Super Admin" ||
    value.role === "Internal Audit Manager" ||
    value.role === "Assistant Audit Manager" ||
    value.role === "Internal Audit Officer" ||
    value.role === "Internal Audit Officer – Fraud & Investigations" ? (
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
