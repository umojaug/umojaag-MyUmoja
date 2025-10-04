import React from "react";
import TopHeader from "../../components/TopHeader";
// import { useGlobalContext } from "../../hooks/context";
// import VisitCardSearch from "./visitCard/VisitCardSearch";

const Dashboard = () => {
  // const value = useGlobalContext();
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Monitoring Dashboard" />
      {/* {(value.role === "Super Admin" ||
        value.role === "Operations Head" ||
        value.role === "Operations Manager") && <VisitCardSearch />} */}
    </div>
  );
};

export default Dashboard;
