import React from "react";
import TopHeader from "../../../components/TopHeader";
import AreaOfReviewForm from "./AreaOfReviewForm";

const AreaOfReviewAdd = () => {
  const defaultValues = {
    areaOfReviewId: "",
    areaOfReviewName: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Audit Area Create"
        btn="Return"
        path="/audit/settings/areaOfReview/list"
      />
      <AreaOfReviewForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/areaOfReview/create"
        returnPath="/audit/settings/areaOfReview/list"
      />
    </div>
  );
};

export default AreaOfReviewAdd;
