import React from "react";
import TopHeader from "../../components/TopHeader";
import Notification from "./Notification";
import { useGlobalContext } from "../../hooks/context";
import MonthOpenClose from "./MonthOpenClose";

const Dashboard = () => {
  const value = useGlobalContext();
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="HR Dashboard" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 content-around">
        {(value.role === "Super Admin" ||
          value.role === "HR Manager" ||
          value.role === "HR Executive") && (
          <>
            <MonthOpenClose />
            <Notification />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
