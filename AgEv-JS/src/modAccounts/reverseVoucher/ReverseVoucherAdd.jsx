import React from "react";
import TopHeader from "../../components/TopHeader";
import ReverseVoucherForm from "./ReverseVoucherForm";

const ReverseVoucherAdd = () => {
  const defaultValues = {
    voucherNumber: "",
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Add Reverse Voucher"
        btn="Return"
        path="/ac/reverseVoucher/list"
      />
      <ReverseVoucherForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/ac/reverseVoucher/create"
        returnPath="/ac/reverseVoucher/list"
      />
    </div>
  );
};

export default ReverseVoucherAdd;
