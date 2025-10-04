import React from "react";
import TopHeader from "../../../../../components/TopHeader";
import GroupVisitForm from "./AmRecordKeepingForm";
import { useParams } from "react-router-dom";

const AmRecordKeepingAdd = () => {
  const { id } = useParams();

  const defaultValues = {
    opsAmRecordKeepingId: 0,
    amVisitId: id,
    booksAccount: "",
    matchedWith: "",
    finding: "",
    suggestion: "",
    remarks: "",
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Am Record keeping add:"
        btn="Return"
        path={`/ops/am/visit/preview/${id}`}
      />
      <GroupVisitForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/amRecordKeeping/create"
        returnPath={`/ops/am/visit/preview/${id}`}
      />
    </div>
  );
};

export default AmRecordKeepingAdd;
