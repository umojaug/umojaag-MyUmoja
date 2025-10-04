import React from "react";
import { useGlobalContext } from "../../hooks/context";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const value = useGlobalContext();

  return value.user ? (
    value.role === "Super Admin" ||
    value.role === "Operations Head" ||
    value.role === "Operations Manager" ||
    value.role === "Regional Manager" ||
    value.role === "Area Manager" ||
    value.role === "FMPU Executive" ||
    value.role === "FMPU Manager" ||
    value.role === "Branch Manager" ||
    value.role === "Country Team Lead" ||
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
