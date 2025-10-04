import React from "react";
import Error from "../../../../components/Error";
import { HashLoading } from "../../../../components/Loading";
import { useGetData } from "../../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../../components/ListColWithHeader";
import { format } from "date-fns";
import TopHeader from "../../../../components/TopHeader";
import TaskButton from "../../../../components/button/TaskButton";
import { AiOutlineFile } from "react-icons/ai";

const BillReceivedList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData("travelingBill", `/myTravelingBill/receivedTravelBillList`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl gap-2">
      <TopHeader
        title="Transport Bill Received As Supervisor"
        btn="Return"
        path="/ops/transportBill"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-6 list-header">
          <ListHeader label="Traveling Date" />
          <ListHeader label="Applicant" />
          <ListHeader label="Checked By" />
          <ListHeader label="Supervisor" />
          <ListHeader label="Short Description" />

          {/* <ListHeader label="" /> */}
        </div>
        {list.data.length > 0 &&
          list.data.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-6 list-body"
            >
              <ListCol
                label="Traveling Date:"
                value={format(new Date(item.travelingDate), "dd/MMM/yyyy")}
              />
              <ListCol label="Applicant : " value={item.employeeName} />
              <ListCol label="CheckedBy : " value={item.checkerName} />
              <ListCol label="Supervisor : " value={item.managerName} />
              <ListCol label="Short Description : " value={item.remarks} />

              <div className="flex justify-end space-x-2">
                {item.isSubmit === 2 ? (
                  <TaskButton
                    path={`/ops/transportBill/received/details/${item.travelId}`}
                    btnColor={"btn-umojayellow"}
                  />
                ) : (
                  <TaskButton
                    path={`/ops/transportBill/received/preview/${item.travelId}`}
                    btnColor="btn-gray"
                  />
                )}
                <a href={item.fileUrl} className="btn-sky w-12 h-10">
                  <AiOutlineFile size={24} />
                </a>
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
