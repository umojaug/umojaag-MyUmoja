import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import TopHeader from "../../../../../components/TopHeader";
import { useGetData } from "../../../../../hooks/dataApi";

import BillDetailsForm from "./BillDetailsForm";

const BillDetailsEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("travelingBill", `/myTravelingBillDetails/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Transport Bill"
        btn="Return"
        path={`/ops/transportBill/preview/${list.data.travelId}`}
      />
      <BillDetailsForm
        defaultValues={{
          travelBillId: list.data.travelBillId,
          travelId: list.data.travelId,
          startFrom: list.data.startFrom,
          endTo: list.data.endTo,
          taxi: list.data.taxi,
          bus: list.data.bus,
          train: list.data.train,
          others: list.data.others,
          motorcycle: list.data.motorcycle,
        }}
        action={refetch}
        btnText="Update"
        path="/myTravelingBillDetails/update"
        returnPath={`/ops/transportBill/preview/${list.data.travelId}`}
      />
    </div>
  );
};

export default BillDetailsEdit;
