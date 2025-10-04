import React from "react";
import TopHeader from "../../components/TopHeader";
import RequisitionApproveForm from "./RequisitionApproveForm";

const RequisitionApproveAdd = () => {
  const defaultValues = {
    requisitionApproveId: "",
    entryBy: "",
    particulars: "",
    amount: "",
    approved: false,
    approvedBy: "",
    workDate: new Date(),
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Requisition Approve"
        btn="Return"
        path="/ac/requisitionApprove/list"
      />
      <RequisitionApproveForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/ac/requisitionApprove/create"
        returnPath="/ac/requisitionApprove/list"
      />
    </div>
  );
};

export default RequisitionApproveAdd;
