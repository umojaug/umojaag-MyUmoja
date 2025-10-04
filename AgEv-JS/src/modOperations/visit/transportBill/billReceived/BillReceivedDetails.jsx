import React from "react";
import { useGetData } from "../../../../hooks/dataApi";
import { HashLoading } from "../../../../components/Loading";
import Error from "../../../../components/Error";
// import { ListCol, ListHeader } from "../../../../components/ListColWithHeader";
import { useParams } from "react-router-dom";
import TransportAccept from "../../components/TransportAccept";
import TransportReject from "../../components/TransportReject";
import TravelView from "../../components/TravelView";
// import OthersBill from "../checklist/othersBill/OthersBill";
import BillDetailsList from "../checklist/billDetails/BillDetailsList";

const BillReceivedDetails = () => {
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
        path="/ops/transportBill/received/list"
      />

      <BillDetailsList id={id} isSubmit={list.data.isSubmit} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5 mt-8">
        <TransportAccept
          id={id}
          path="/myTravelingBill/accept"
          returnPath="/ops/transportBill/received/list"
        />
        <TransportReject
          id={id}
          path="/myTravelingBill/reject"
          returnPath="/ops/transportBill/received/list"
        />
      </div>
    </div>
  );
};

export default BillReceivedDetails;
