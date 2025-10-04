import React from "react";
// import { HashLoading } from "../../components/Loading";
// import Error from "../../components/Error";
import TopHeader from "../../components/TopHeader";
// import { useGetData } from "../../hooks/dataApi";
import { ListHeader, ListCol } from "../../components/ListColWithHeader";
import DeleteButton from "../../components/button/DeleteButton";

const RequisitionApproveList = () => {
  // const {
  //   data: list,
  //   error,
  //   isLoading,
  //   isError,
  //   refetch,
  // } = useGetData("requisitionApprove", "/ac/requisitionApprove/list");

  const data = [
    {
      requisitionApproveId: "111",
      entryBy: "11",
      particulars: "Dhaka",
      amount: "11",
      approved: "Dhaka",
      approvedBy: "Dhaka",
      workDate: "Dhaka",
    },
  ];

  // if (isLoading) return <HashLoading />;

  // if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Requisition Approve"
        btn="Save"
        path="/ac/requisitionApprove/add"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-7 list-header">
          <ListHeader label="Entry By" />
          <ListHeader label="Particulars" />
          <ListHeader label="Amount" />
          <ListHeader label="Approved" />
          <ListHeader label="Approved By" />
          <ListHeader label="Work Date" />
          <ListHeader label="" />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.requisitionApproveId}
              className="grid grid-cols-1 md:grid-cols-7 list-body"
            >
              <ListCol label="Entry By:" value={item.entryBy} />
              <ListCol label="Particulars:" value={item.particulars} />
              <ListCol label="Amount:" value={item.amount} />
              <ListCol label="Approved By:" value={item.approvedBy} />
              <ListCol label="Approved:" value={item.approved} />
              <ListCol label="Work Date:" value={item.workDate} />
              <div className="flex justify-end space-x-2">
                <DeleteButton
                  // action={refetch}
                  path={`/receiveVoucher/delete/${item.receiveVoucherId}`}
                />
              </div>
            </div>
          ))}
        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">Total : {data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequisitionApproveList;
