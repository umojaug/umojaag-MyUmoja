import React from "react";
import BoardNotice from "./BoardNotice";
import Clock from "./Clock";
import MainModules from "./MainModules";
import { useGlobalContext } from "../../hooks/context";
import Notification from "./Notification";
import Welcome from "./Welcome";

const Dashboard = () => {
  const value = useGlobalContext();

  return (
    <>
      {value.role === "Super Admin" && <MainModules />}
      <div className="card w-full max-w-screen-xl mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="inline-block align-middle">
            <Clock />
          </div>
          <Welcome />
        </div>
      </div>
      <div className="card w-full max-w-screen-xl mb-4">
        <Notification />
      </div>

      <BoardNotice />
    </>
  );
};

export default Dashboard;
