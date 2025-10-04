import React from "react";
import TopHeader from "../../../components/TopHeader";
import VoucherClassificationForm from "./VoucherClassificationForm";

const VoucherClassificationAdd = () => {
  const defaultValues = {
    classificationId: "",
    classificationName: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Voucher Classification Add"
        btn="Return"
        path="/ac/settings/classification/list"
      />
      <VoucherClassificationForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/voucherClassification/create"
        returnPath="/ac/settings/bank/list"
      />
    </div>
  );
};

export default VoucherClassificationAdd;
