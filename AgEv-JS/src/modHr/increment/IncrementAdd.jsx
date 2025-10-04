import React from "react";
import TopHeader from "../../components/TopHeader";
import IncrementForm from "./IncrementForm";
// import PromotionForm from "./IncrementForm";

const IncrementAdd = () => {
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Increment Create"
        btn="Return"
        path="/hr/increment/list"
      />
      <IncrementForm
        path="/empincrement/create"
        returnPath="/hr/increment/list"
      />
    </div>
  );
};

export default IncrementAdd;
