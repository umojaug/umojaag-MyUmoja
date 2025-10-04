import React from "react";
import { useGetData } from "../../../../hooks/dataApi";
import { HashLoading } from "../../../../components/Loading";
import Error from "../../../../components/Error";
import TopHeader from "../../../../components/TopHeader";
import { ListCol, ListHeader } from "../../../../components/ListColWithHeader";
import EditButton from "../../../../components/button/EditButton";
import DeleteButton from "../../../../components/button/DeleteButton";

const BillDetailsList = ({ id, isSubmit }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("travelingBill", `/userMyTravelingBillDetails/list/${id}`);

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
        btn={isSubmit === 0 || isSubmit === 3 ? "Save" : ""}
        path={`/transportBillDetails/add/${id}`}
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-9 list-header">
          <ListHeader label="From" />
          <ListHeader label="To" />
          <ListHeader label="Bus" />
          <ListHeader label="Taxi" />
          <ListHeader label="Train" />
          <ListHeader label="Motorcycle" />
          <ListHeader label="Others" />
          <ListHeader label="Total" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-9 list-body"
            >
              <ListCol label="From:" value={item.startFrom} />
              <ListCol label="To:" value={item.endTo} />
              <ListCol label="Bus:" value={item.bus} />
              <ListCol label="Taxi:" value={item.taxi} />
              <ListCol label="Train:" value={item.train} />
              <ListCol label="Motorcycle:" value={item.motorcycle} />
              <ListCol label="Others:" value={item.others} />
              <ListCol label="Total:" value={item.total} />
              {(isSubmit === 0 || isSubmit === 3) && (
                <div className="flex justify-end space-x-2">
                  <EditButton
                    path={`/transportBillDetails/edit/${item.travelBillId}`}
                  />
                  <DeleteButton
                    action={refetch}
                    path={`/userMyTravelingBillDetails/delete/${item.travelBillId}`}
                  />
                </div>
              )}
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
    </div>
  );
};

export default BillDetailsList;
