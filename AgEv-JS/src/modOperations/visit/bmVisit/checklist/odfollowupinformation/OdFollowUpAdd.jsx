import React from "react";
import TopHeader from "../../../../../components/TopHeader";
import { useParams } from "react-router-dom";
import OdFollowUpForm from "./OdFollowUpForm";

const OdFollowUpAdd = () => {
  const { id } = useParams();
  const defaultValues = {
    opsBmOdFollowUpId: 0,
    bmVisitId: id,
    groupName: "",
    borrowerName: "",
    realisedAmount: 0,
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="3.Today’s OD follow up information"
        btn="Return"
        path={`/ops/bm/visit/preview/${id}`}
      />
      <OdFollowUpForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/bmOdFollowUp/create"
        returnPath={`/ops/bm/visit/preview/${id}`}
      />
    </div>
  );
};

export default OdFollowUpAdd;
