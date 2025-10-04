import React from "react";
import TopHeader from "../../../../components/TopHeader";
import BillForm from "./BillForm";
import { useParams } from "react-router-dom";

const BillAdd = () => {
  const { id } = useParams();
  const defaultValues = {
    travelId: "",
    allVisitId: id,
    travelingDate: new Date(),
    remarks: "",
    managerId: "",
    title: "",
    fileUrl: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Travel Bill Create"
        btn="Return"
        path={`/ops/transportBill/list/${id}`}
      />
      <BillForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/myTravelingBill/create"
        returnPath="/ops/transportBill/list"
      />
    </div>
  );
};

export default BillAdd;
