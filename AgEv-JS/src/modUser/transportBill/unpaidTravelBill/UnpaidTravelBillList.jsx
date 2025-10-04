import React from "react";
import { format } from "date-fns";
import { AiOutlineFile } from "react-icons/ai";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import PrintHeader from "../../../components/PrintHeader";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import TaskButton from "../../../components/button/TaskButton";
import TopHeader from "../../../components/TopHeader";
import BillPay from "./BillPay";
import { useGlobalContext } from "../../../hooks/context";

const UnpaidTravelBillList = () => {
  const value = useGlobalContext();

  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("travelingBill", `/myTravelingBill/unpaidList`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data.map(
    ({ travelingDate, employeeName, checkerName, managerName, remarks }) => ({
      travelingDate,
      employeeName,
      checkerName,
      managerName,
      remarks,
    })
  );

  return (
    <div className="card w-full max-w-screen-xl gap-2 ">
      <TopHeader
        title="Unpaid Travel Bill List"
        btn="Return"
        path="/transportBill"
      />
      {value.role === "Branch Manager" ||
      value.role === "Accounts Manager" ||
      value.role === "Accounts Executive" ? (
        <>
          <div className="flex justify-end items-center">
            <PrintHeader
              fileName="UnpaidTravelBill.csv"
              data={data.map(
                ({
                  travelingDate,
                  employeeName,
                  checkerName,
                  managerName,
                  remarks,
                }) => ({
                  travelingDate,
                  employeeName,
                  checkerName,
                  managerName,
                  remarks,
                })
              )}
              headers={[
                { label: "Audit Year", key: "travelingDate" },
                { label: "Month Name", key: "employeeName" },
                { label: "Audit Unit Name", key: "checkerName" },
                { label: "What Went Well", key: "managerName" },
                { label: "Handled Better", key: "remarks" },
              ]}
            />
          </div>
          <div className="list-wrapper">
            <div className="md:grid grid-cols-9 list-header">
              <ListHeader label="Travel Date" />
              <ListHeader label="Applicant" />
              <ListHeader label="Checked By" />
              <ListHeader label="Supervisor" />
              <ListHeader label="Reject Remarks" />
              <ListHeader label="Accept Remarks" />
              <ListHeader label="Application Status" />
              <ListHeader label="Bill Status" />
            </div>
            {list.data.length > 0 &&
              list.data.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-9 list-body"
                >
                  <ListCol
                    label="Travel Date:"
                    value={format(new Date(item.travelingDate), "dd/MMM/yyyy")}
                  />
                  <ListCol label="Applicant : " value={item.employeeName} />
                  <ListCol label="CheckedBy : " value={item.checkerName} />
                  <ListCol label="Supervisor : " value={item.managerName} />
                  <ListCol
                    label="Reject Remarks : "
                    value={item.rejectRemarks}
                  />
                  <ListCol
                    label="Accept Remarks : "
                    value={item.acceptRemarks}
                  />

                  {item.isSubmit === 0 && (
                    <ListCol label="Status" value="Not submitted" />
                  )}

                  {item.isSubmit === 1 && (
                    <ListCol label="Status" value="Pending" />
                  )}

                  {item.isSubmit === 2 && (
                    <ListCol label="Status" value="Checked By Approved" />
                  )}

                  {item.isSubmit === 3 && (
                    <ListCol label="Status" value="Approved" />
                  )}
                  {item.isSubmit === 4 && (
                    <ListCol label="Status" value="Return" />
                  )}

                  {item.isSubmit === 3 && item.billStatus === 1 && (
                    <ListCol label="Bill Status" value="Paid" />
                  )}
                  {item.isSubmit === 3 && item.billStatus === 0 && (
                    <ListCol label="Bill Status" value="Unpaid" />
                  )}

                  <div className="flex justify-end space-x-2">
                    <TaskButton
                      path={`/transportBill/unpaid/preview/${item.travelId}`}
                      btnColor="btn-gray"
                    />

                    <a href={item.fileUrl} className="btn-sky w-12 h-10">
                      <AiOutlineFile size={24} />
                    </a>
                    {item.billStatus === 0 && (
                      <BillPay
                        action={refetch}
                        path={`/myTravelingBill/travelBillPay/${item.travelId}`}
                      />
                    )}
                  </div>
                </div>
              ))}

            <div className="list-footer">
              <div className="col-span-10"></div>
              <div className="flex justify-center">
                <span className="font-semibold">
                  TOTAL : {list.data.length}
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-xl text-center font-semibold text-orange-600">
          <h3>You don't have permission to pay the bill</h3>
        </div>
      )}
    </div>
  );
};

export default UnpaidTravelBillList;
