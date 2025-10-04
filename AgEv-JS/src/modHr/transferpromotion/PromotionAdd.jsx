import React from "react";
import TopHeader from "../../components/TopHeader";
import PromotionForm from "./PromotionForm";

const PromotionAdd = () => {
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Promotion Create"
        btn="Return"
        path="/hr/transferpromotion/list"
      />
      <PromotionForm
        path="/emppromotion/create"
        returnPath="/hr/transferpromotion/list"
      />
    </div>
  );
};

export default PromotionAdd;
