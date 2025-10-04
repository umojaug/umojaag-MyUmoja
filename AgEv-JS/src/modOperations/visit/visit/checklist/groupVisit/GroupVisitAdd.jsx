import React from "react";
import TopHeader from "../../../../../components/TopHeader";
import { useParams } from "react-router-dom";
import GroupVisitForm from "./GroupVisitForm";

const GroupVisitAdd = () => {
  const { id } = useParams();
  const defaultValues = {
    verificationId: 0,
    allVisitId: id,
    status: "",
    number: 0,
    findings: "",
    takenSteps: "",
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="2. Today’s loan verification: "
        btn="Return"
        path={`/ops/bm/visit/preview/${id}`}
      />
      <GroupVisitForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/bmLoanVerification/create"
        returnPath={`/ops/bm/visit/preview/${id}`}
      />
    </div>
  );
};

export default GroupVisitAdd;
