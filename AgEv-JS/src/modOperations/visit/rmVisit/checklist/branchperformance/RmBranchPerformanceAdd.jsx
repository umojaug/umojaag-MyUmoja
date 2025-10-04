import React from "react";

import { useParams } from "react-router-dom";

import TopHeader from "../../../../../components/TopHeader";
import RmBranchPerformanceForm from "./RmBranchPerformanceForm";

const RmBranchPerformanceAdd = () => {
  const { id } = useParams();

  const defaultValues = {
    opsRmBranchPerformanceId: 0,
    rmVisitId: id,
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
        path={`/ops/rm/visit/preview/${id}`}
      />
      <RmBranchPerformanceForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/rmBranchPerformance/create"
        returnPath={`/ops/rm/visit/preview/${id}`}
      />
    </div>
  );
};

export default RmBranchPerformanceAdd;
