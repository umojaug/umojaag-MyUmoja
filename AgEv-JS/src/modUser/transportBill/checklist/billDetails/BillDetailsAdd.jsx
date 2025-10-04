import React from "react";

import { useParams } from "react-router-dom";
import BillDetailsForm from "./BillDetailsForm";
import TopHeader from "../../../../components/TopHeader";

const BillDetailsAdd = () => {
  const { id } = useParams();

  const defaultValues = {
    travelId: id,
    startFrom: "",
    endTo: "",
    taxi: 0,
    bus: 0,
    train: 0,
    others: 0,
    motorcycle: 0,
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Transport Bill information:"
        btn="Return"
        path={`/transportBill/preview/${id}`}
      />
      <BillDetailsForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/userMyTravelingBillDetails/create"
        returnPath={`/transportBill/preview/${id}`}
      />
    </div>
  );
};

export default BillDetailsAdd;
