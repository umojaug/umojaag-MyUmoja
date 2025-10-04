import React from "react";
import AmApprove from "./AmApprove"; // Fixed import path
import BmApprove from "./BmApprove";
import { useGlobalContext } from "../../../hooks/context";

const TicketViewWrapper = () => {
  const { role } = useGlobalContext();

  return (
    <div>
      {role === "Area Manager" ? (
        <AmApprove />
      ) : role === "Branch Manager" ? (
        <BmApprove />
      ) : (
        <div className="p-4 text-red-600">Unauthorized Role</div>
      )}
    </div>
  );
};

export default TicketViewWrapper;
