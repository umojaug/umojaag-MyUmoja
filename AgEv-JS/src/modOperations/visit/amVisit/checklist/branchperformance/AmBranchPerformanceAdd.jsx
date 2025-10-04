import React from "react";

import { useParams } from "react-router-dom";
import AmBranchPerformanceForm from "./AmBranchPerformanceForm";
import TopHeader from "../../../../../components/TopHeader";

const AmBranchPerformanceAdd = () => {
  const { id } = useParams();

  const defaultValues = {
    opsAmBranchPerformanceId: 0,
    amVisitId: id,
    loName: "",
    numberOfGroup: 0,
    overdueNumber: 0,
    overdueAmount: 0,
    numberOfBorrower: 0,
    numberOfAdmission: 0,
    securityReturn: 0,
    remarks: "",
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Branch Performance information:"
        btn="Return"
        path={`/ops/am/visit/preview/${id}`}
      />
      <AmBranchPerformanceForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/amBranchPerformance/create"
        returnPath={`/ops/am/visit/preview/${id}`}
      />
    </div>
  );
};

export default AmBranchPerformanceAdd;
