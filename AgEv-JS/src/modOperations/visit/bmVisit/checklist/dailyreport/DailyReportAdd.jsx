import React from "react";
import TopHeader from "../../../../../components/TopHeader";
import { useParams } from "react-router-dom";
import DailyReportForm from "./DailyReportForm";

const DailyReportAdd = () => {
  const { id } = useParams();

  const defaultValues = {
    opsBmDailyReportId: 0,
    bmVisitId: id,
    admissionNumber: "",
    disbursementNumber: "",
    disbursementAmount: "",
    securityNumber: "",
    securityAmount: "",
    overdueNumber: "",
    overdueAmount: "",
    borrowerPositionNumber: "",
    borrowerPositionAmount: "",
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="4. DailyReportList"
        btn="Return"
        path={`/ops/bm/visit/preview/${id}`}
      />
      <DailyReportForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/bmDailyReport/create"
        returnPath={`/ops/bm/visit/preview/${id}`}
      />
    </div>
  );
};

export default DailyReportAdd;
