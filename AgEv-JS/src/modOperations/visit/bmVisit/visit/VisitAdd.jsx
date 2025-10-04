import React from "react";
import TopHeader from "../../../../components/TopHeader";
import VisitForm from "./VisitForm";

const VisitAdd = () => {
  const defaultValues = {
    bmVisitId: "",
    visitDate: new Date(),
    branchId: "",
    visitType: "Regular Branch Visit",
    stayOvernight: "No",
    managerId: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="BM Branch Visit Create"
        btn="Return"
        path="/ops/bm/visit/list"
      />
      <VisitForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/bmvisit/create"
        returnPath="/ops/bm/visit/list"
      />
    </div>
  );
};

export default VisitAdd;
