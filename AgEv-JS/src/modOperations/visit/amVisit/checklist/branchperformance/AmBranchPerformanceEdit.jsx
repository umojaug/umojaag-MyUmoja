import React from "react";
import { useParams } from "react-router-dom";
import { useGetData } from "../../../../../hooks/dataApi";
import { HashLoading } from "../../../../../components/Loading";
import Error from "../../../../../components/Error";
import TopHeader from "../../../../../components/TopHeader";
import AmBranchPerformanceForm from "./AmBranchPerformanceForm";

const AmBranchPerformanceEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("amBranchPerformance", `/amBranchPerformance/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit AM Branch Performance"
        btn="Return"
        path={`/ops/am/visit/preview/${list.data.amVisitId}`}
      />
      <AmBranchPerformanceForm
        defaultValues={{
          opsAmBranchPerformanceId: list.data.opsAmBranchPerformanceId,
          amVisitId: list.data.amVisitId,
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
        path="/amBranchPerformance/update"
        returnPath={`/ops/am/visit/preview/${list.data.amVisitId}`}
      />
    </div>
  );
};

export default AmBranchPerformanceEdit;
