import React from "react";
import { useParams } from "react-router-dom";
import { useGetData } from "../../../../../hooks/dataApi";
import { HashLoading } from "../../../../../components/Loading";
import Error from "../../../../../components/Error";
import TopHeader from "../../../../../components/TopHeader";
import RmBranchPerformanceForm from "./RmBranchPerformanceForm";

const RmBranchPerformanceEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("rmBranchPerformance", `/rmBranchPerformance/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit RM Branch Performance"
        btn="Return"
        path={`/ops/rm/visit/preview/${list.data.rmVisitId}`}
      />
      <RmBranchPerformanceForm
        defaultValues={{
          opsRmBranchPerformanceId: list.data.opsRmBranchPerformanceId,
          rmVisitId: list.data.rmVisitId,
          loName: list.data.loName,
          numberOfGroup: list.data.numberOfGroup,
          overdueNumber: list.data.overdueNumber,
          overdueAmount: list.data.overdueAmount,
          numberOfBorrower: list.data.numberOfBorrower,
          numberOfAdmission: list.data.numberOfAdmission,
          securityReturn: list.data.securityReturn,
          remarks: list.data.remarks,
        }}
        action={refetch}
        btnText="Update"
        path="/rmBranchPerformance/update"
        returnPath={`/ops/rm/visit/preview/${list.data.rmVisitId}`}
      />
    </div>
  );
};

export default RmBranchPerformanceEdit;
