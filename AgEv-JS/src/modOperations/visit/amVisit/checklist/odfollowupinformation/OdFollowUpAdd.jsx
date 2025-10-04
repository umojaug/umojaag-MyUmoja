import React from "react";
import TopHeader from "../../../../../components/TopHeader";
import { useParams } from "react-router-dom";

import OdFollowUpForm from "./OdFollowUpForm";

const OdFollowUpAdd = () => {
  const { id } = useParams();
  const defaultValues = {
    opsAmODFollowUpId: 0,
    amVisitId: id,
    groupName: "",
    borrowerName: "",
    realisedAmount: 0,
    remarks: "",
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="3.Today’s OD follow up information"
        btn="Return"
        path={`/ops/am/visit/preview/${id}`}
      />
      <OdFollowUpForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/amOdFollowUp/create"
        returnPath={`/ops/am/visit/preview/${id}`}
      />
    </div>
  );
};

export default OdFollowUpAdd;
