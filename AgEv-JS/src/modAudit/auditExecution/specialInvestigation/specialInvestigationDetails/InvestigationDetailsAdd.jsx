import React from "react";
import InvestigationDetailsForm from "./InvestigationDetailsForm";
import TopHeader from "../../../../components/TopHeader";
import { useParams } from "react-router-dom";

const InvestigationDetailsAdd = () => {
  const { id } = useParams();

  const defaultValues = {
    investigationDetailsId: "",
    guideline: "",
    testSteps: "",
    evidences1: "",
    evidences2: "",
    evidences3: "",
    reportInputs: "",
    testConclusion: "",
    investigationId: id,
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Special Investigation Add"
        btn="Return"
        path="/audit/excution/special/investigation/list"
      />
      <InvestigationDetailsForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/auditSpInvestigation/detailsCreate"
        returnPath="/audit/excution/special/investigation/list"
        isEdit="false"
      />
    </div>
  );
};

export default InvestigationDetailsAdd;
