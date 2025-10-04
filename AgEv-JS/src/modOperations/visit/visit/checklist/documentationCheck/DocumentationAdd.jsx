import React from "react";
import TopHeader from "../../../../../components/TopHeader";
import { useParams } from "react-router-dom";
import DocumentationForm from "./DocumentationForm";

const DocumentationAdd = () => {
  const { id } = useParams();

  const defaultValues = {
    opsBmDailyReportId: 0,
    bmVisitId: id,
    admissionNumber: "",
    disbursementNumber: "",
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="4. DailyReportList"
        btn="Return"
        path={`/ops/bm/visit/preview/${id}`}
      />
      <DocumentationForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/bmDailyReport/create"
        returnPath={`/ops/bm/visit/preview/${id}`}
      />
    </div>
  );
};

export default DocumentationAdd;
