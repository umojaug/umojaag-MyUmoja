import React from "react";
import TopHeader from "../../components/TopHeader";
import VoucherSearch from "./VoucherSearch";

const Dashboard = () => {
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Accounts Dashboard" />
      <VoucherSearch />
    </div>
  );
};

export default Dashboard;
