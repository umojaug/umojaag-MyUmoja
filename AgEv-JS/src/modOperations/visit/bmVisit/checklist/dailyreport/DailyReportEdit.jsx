import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import TopHeader from "../../../../../components/TopHeader";
import { useGetData } from "../../../../../hooks/dataApi";
import DailyReportForm from "./DailyReportForm";

const DailyReportEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("bmDailyReport", `/bmDailyReport/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit BM group visit"
        btn="Return"
        path={`/ops/bm/visit/preview/${list.data.bmVisitId}`}
      />
      <DailyReportForm
        defaultValues={{
          opsBmDailyReportId: list.data.opsBmDailyReportId,
          bmVisitId: list.data.bmVisitId,
          admissionNumber: list.data.admissionNumber,
          disbursementNumber: list.data.disbursementNumber,
          disbursementAmount: list.data.disbursementAmount,
          securityNumber: list.data.securityNumber,
          securityAmount: list.data.securityAmount,
          overdueNumber: list.data.overdueNumber,
          overdueAmount: list.data.overdueAmount,
          borrowerPositionNumber: list.data.borrowerPositionNumber,
          borrowerPositionAmount: list.data.borrowerPositionAmount,
        }}
        action={refetch}
        btnText="Update"
        path="/bmDailyReport/update"
        returnPath={`/ops/bm/visit/preview/${list.data.bmVisitId}`}
      />
    </div>
  );
};

export default DailyReportEdit;
