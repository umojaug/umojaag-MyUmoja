import React from "react";
import { useParams } from "react-router-dom";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import TravelView from "../../components/TravelView";
import BillDetailsList from "../../../modOperations/visit/transportBill/checklist/billDetails/BillDetailsList";

const UnpaidTravelBillPreview = () => {
  const { id } = useParams();

  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("travelingBill", `/myTravelingBill/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const isSubmit = list.data.isSubmit;

  return (
    <div className="card w-full max-w-screen-xl gap-2">
      <div className="px-5">
        <TravelView
          title="Transport Bill Preview"
          data={list.data}
          path={`/transportBill`}
        />
        <BillDetailsList id={id} isSubmit={isSubmit} />
      </div>
    </div>
  );
};

export default UnpaidTravelBillPreview;
