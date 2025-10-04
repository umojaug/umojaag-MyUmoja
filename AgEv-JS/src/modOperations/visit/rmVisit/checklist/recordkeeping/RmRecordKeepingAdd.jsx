import React from "react";
import TopHeader from "../../../../../components/TopHeader";
import { useParams } from "react-router-dom";
import RmRecordKeepingForm from "./RmRecordKeepingForm";

const RmRecordKeepingAdd = () => {
  const { id } = useParams();

  const defaultValues = {
    opsRmRecordKeepingId: 0,
    rmVisitId: id,
    booksAccount: "",
    matchedWith: "",
    finding: "",
    suggestion: "",
    remarks: "",
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Rm Record keeping add:"
        btn="Return"
        path={`/ops/rm/visit/preview/${id}`}
      />
      <RmRecordKeepingForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/rmRecordKeeping/create"
        returnPath={`/ops/rm/visit/preview/${id}`}
      />
    </div>
  );
};

export default RmRecordKeepingAdd;
