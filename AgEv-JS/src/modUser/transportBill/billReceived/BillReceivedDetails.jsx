import React from "react";
import { useParams } from "react-router-dom";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";

import TransportAccept from "../../../modOperations/visit/components/TransportAccept";
import TransportReject from "../../../modOperations/visit/components/TransportReject";
import TravelView from "../../components/TravelView";

const BillReceivedDetails = () => {
  const { id } = useParams();

  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData("travelingBill", `/userMyTravelingBillDetails/list/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  let subTotal = 0;

  if (list.data.length > 0) {
    subTotal = list.data
      .map((item) => item.total)
      .reduce((sum, val) => sum + val, 0);
  }

  return (
    <div className="card w-full max-w-screen-xl gap-2">
      <TravelView
        data={list.data[0]}
        title="Transport bill application details list"
        path="/transportBill/received/list"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-8 list-header">
          <ListHeader label="From" />
          <ListHeader label="To" />
          <ListHeader label="Bus" />
          <ListHeader label="Taxi" />
          <ListHeader label="Train" />
          <ListHeader label="Motorcycle" />
          <ListHeader label="Others" />
          <ListHeader label="Total" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-8 list-body"
            >
              <ListCol label="From:" value={item.startFrom} />
              <ListCol label="To:" value={item.endTo} />
              <ListCol label="Bus:" value={item.bus} />
              <ListCol label="Taxi:" value={item.taxi} />
              <ListCol label="Train:" value={item.train} />
              <ListCol label="Motorcycle:" value={item.motorcycle} />
              <ListCol label="Others:" value={item.others} />
              <ListCol label="Total:" value={item.total} />
            </div>
          ))}

        <div className="list-footer font-bold">
          <div className="grid grid-cols-1 md:grid-cols-9">
            <ListCol />
            <ListCol />
            <ListCol />
            <ListCol />
            <ListCol />
            <ListCol />
            <ListCol />
            <ListCol
              value={
                subTotal >= 0
                  ? "Sub Total: " + subTotal.toLocaleString("en-US")
                  : "(" + (subTotal * -1).toLocaleString("en-US") + ")"
              }
              className="flex justify-start md:justify-end "
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5 mt-8">
        <TransportAccept id={id} returnPath="/transportBill/list" />
        <TransportReject id={id} returnPath="/transportBill/list" />
      </div>
    </div>
  );
};

export default BillReceivedDetails;
