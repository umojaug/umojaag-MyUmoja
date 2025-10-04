import React from "react";
import BillForm from "./BillForm";
import TopHeader from "../../../components/TopHeader";

const BillAdd = () => {
  const defaultValues = {
    travelId: "",
    travelingDate: new Date(),
    remarks: "",
    title: "",
    managerId: "",
    file: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Transport Bill Create"
        btn="Return"
        path="/transportBill/list"
      />
      <BillForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/userMyTravelingBill/create"
        returnPath="/transportBill/list"
      />
    </div>
  );
};

export default BillAdd;
