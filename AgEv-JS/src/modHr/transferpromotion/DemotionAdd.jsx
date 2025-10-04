import React from "react";
import TopHeader from "../../components/TopHeader";
// import PromotionForm from "./PromotionForm";
import DemotionForm from "./DemotionForm";

const DemotionAdd = () => {
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Demotion Create"
        btn="Return"
        path="/hr/transferpromotion/list"
      />
      <DemotionForm
        path="/empDemotion/create"
        returnPath="/hr/transferpromotion/list"
      />
    </div>
  );
};

export default DemotionAdd;
