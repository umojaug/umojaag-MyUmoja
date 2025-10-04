import React from "react";
import { useGlobalContext } from "../../hooks/context";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const value = useGlobalContext();
  return value.user ? (
    value.role === "Super Admin" ||
    value.role === "HR Manager" ||
    value.role === "HR Executive" ||
    value.role === "Internal Audit Manager" ||
    value.role === "Assistant Audit Manager" ||
    value.role === "Internal Audit Officer" ||
    value.role === "Internal Audit Officer – Fraud & Investigations" ||
    value.role === "Accounts Manager" ||
    value.role === "Accounts Executive" ||
    value.role === "Country Team Lead" ? (
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
