import React from "react";
import { useParams } from "react-router-dom";
import SubmitToManager from "./SubmitToManager";
import BillDetailsList from "./billDetails/BillDetailsList";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import TravelView from "../../../modOperations/visit/components/TravelView";

const Preview = () => {
  const { id } = useParams();

  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("travelingBill", `/userMyTravelingBill/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const isSubmit = list.data.isSubmit;

  return (
    <div className="card w-full max-w-screen-xl gap-2">
      <div className="px-5">
        <TravelView
          title="Transport Bill"
          data={list.data}
          path="/transportBill/list"
        />
        <BillDetailsList id={id} isSubmit={isSubmit} />

        {(list.data.isSubmit === 0 || list.data.isSubmit === 3) && (
          <SubmitToManager id={id} />
        )}
      </div>
    </div>
  );
};

export default Preview;
