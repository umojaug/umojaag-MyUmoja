import React from "react";
import { format } from "date-fns";
import { useGetData } from "../../../hooks/dataApi";
import TopHeader from "../../../components/TopHeader";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import TaskButton from "../../../components/button/TaskButton";


const BillReceivedList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData("travelingBill", `/userMyTravelingBill/receivedTravelBillList`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl gap-2">
      <TopHeader title="Transport bill application list" />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-3 list-header">
          <ListHeader label="Traveling Date" />
          <ListHeader label="Short Description" />

          {/* <ListHeader label="" /> */}
        </div>
        {list.data.length > 0 &&
          list.data.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-3 list-body"
            >
              <ListCol
                label="Traveling Date:"
                value={format(new Date(item.travelingDate), "dd/MMM/yyyy")}
              />
              <ListCol label="Short Description : " value={item.remarks} />

              <div className="flex justify-end space-x-2">
                <TaskButton
                  path={`/transportBill/received/details/${item.travelId}`}
                  btnColor={"btn-umojayellow"}
                />
              </div>
            </div>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">TOTAL : {list.data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillReceivedList;
