import React from "react";
import DeleteButton from "../../../../../components/button/DeleteButton";
import EditButton from "../../../../../components/button/EditButton";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import TopHeader from "../../../../../components/TopHeader";
import { useGetData } from "../../../../../hooks/dataApi";
import {
  ListCol,
  ListHeader,
} from "../../../../../components/ListColWithHeader";
import OthersBill from "../othersBill/OthersBill";

const BillDetailsList = ({ id, isSubmit }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("travelingBill", `/myTravelingBillDetails/list/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;
  let subTotal = 0;

  if (list.data.length > 0) {
    subTotal = list.data
      .map((item) => item.total)
      .reduce((sum, val) => sum + val, 0);
  }

  //
  return (
    <div>
      <TopHeader
        title="Transport Bill information: "
        btn={isSubmit === 0 || isSubmit === 4 ? "Save" : ""}
        path={`/ops/transportBillDetails/add/${id}`}
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-12 list-header">
          <ListHeader label="From" className="md:col-span-2" />
          <ListHeader label="To" className="md:col-span-2" />
          <ListHeader label="Bus" className="flex justify-end" />
          <ListHeader label="Taxi" className="flex justify-end" />
          <ListHeader label="Train" className="flex justify-end" />
          <ListHeader label="Motorcycle" className="flex justify-end" />
          <ListHeader label="Others" className="flex justify-end" />
          <ListHeader label="Total" className="flex justify-end " />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-12 list-body"
            >
              <ListCol
                className="md:col-span-2"
                label="From :"
                value={item.startFrom}
              />
              <ListCol
                className="md:col-span-2"
                label="To :"
                value={item.endTo}
              />
              <ListCol
                className="flex justify-start md:justify-end"
                label="Bus :"
                value={item.bus.toLocaleString("en-US")}
              />
              <ListCol
                className="flex justify-start md:justify-end"
                label="Taxi :"
                value={item.taxi.toLocaleString("en-US")}
              />
              <ListCol
                className="flex justify-start md:justify-end"
                label="Train :"
                value={item.train.toLocaleString("en-US")}
              />
              <ListCol
                className="flex justify-start md:justify-end"
                label="Motorcycle :"
                value={item.motorcycle.toLocaleString("en-US")}
              />
              <ListCol
                className="flex justify-start md:justify-end"
                label="Others :"
                value={item.others.toLocaleString("en-US")}
              />
              <ListCol
                className="flex justify-start md:justify-end "
                label="Total :"
                value={item.total.toLocaleString("en-US")}
              />
              {(isSubmit === 0 || isSubmit === 4) && (
                <div className="flex justify-end space-x-2 md:col-span-2">
                  <EditButton
                    path={`/ops/transportBillDetails/edit/${item.travelBillId}`}
                  />
                  <DeleteButton
                    action={refetch}
                    path={`/myTravelingBillDetails/delete/${item.travelBillId}`}
                  />
                </div>
              )}
            </div>
          ))}

        <div className="list-footer font-bold">
          <div className="grid grid-cols-1 md:grid-cols-12 md:justify-items-end">
            <ListCol
              value={
                subTotal >= 0
                  ? "Total Bill : " + subTotal.toLocaleString("en-US")
                  : "(" + (subTotal * -1).toLocaleString("en-US") + ")"
              }
              className="flex justify-start md:justify-end col-span-10"
            />
            <ListCol />
          </div>
        </div>
      </div>
      <OthersBill subTotal={subTotal} id={id} isSubmit={isSubmit} />
    </div>
  );
};

export default BillDetailsList;
