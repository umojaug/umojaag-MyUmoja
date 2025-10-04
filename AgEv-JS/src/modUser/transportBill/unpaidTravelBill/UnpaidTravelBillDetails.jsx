import React from "react";
import { useParams } from "react-router-dom";
import TravelView from "../../../modOperations/visit/components/TravelView";
import BillDetailsList from "../../../modOperations/visit/transportBill/checklist/billDetails/BillDetailsList";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";

const UnpaidTravelBillDetails = () => {
  const { id } = useParams();

  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData("travelingBill", `/myTravelingBill/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl gap-2">
      <TravelView
        data={list.data}
        title="Transport bill application details"
        path="/ops/transportBill/checkedBy/list"
      />

      <BillDetailsList id={id} isSubmit={list.data.isSubmit} />
    </div>
  );
};

export default UnpaidTravelBillDetails;
