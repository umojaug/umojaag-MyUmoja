import React from "react";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import TaskButton from "../../../components/button/TaskButton";
import { format } from "date-fns";
import PrintHeader from "../../../components/PrintHeader";

const ReviewList = ({ dataForm }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "visitbyuser",
    `/visit/listbymanager/${dataForm.fromDate}/${dataForm.tillDate}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data.map(
    ({
      visitDate,
      branchName,
      employeeName,
      visitType,
      stayOvernight,
      submitDate,
      submitRemarks,
      acceptRemarks,
      rejectRemarks,
    }) => ({
      visitDate,
      employeeName,
      branchName,
      visitType,
      stayOvernight,
      submitDate,
      submitRemarks,
      acceptRemarks,
      rejectRemarks,
    })
  );

  return (
    <>
      <PrintHeader
        fileName="myreviewlist.csv"
        data={data.map(
          ({
            visitDate,
            employeeName,
            branchName,
            visitType,
            stayOvernight,
            submitDate,
            submitRemarks,
            acceptRemarks,
            rejectRemarks,
          }) => ({
            visitDate,
            employeeName,
            branchName,
            visitType,
            stayOvernight,
            submitDate,
            submitRemarks,
            acceptRemarks,
            rejectRemarks,
          })
        )}
        headers={[
          { label: "Visit Date", key: "visitDate" },
          { label: "Employee Name", key: "employeeName" },
          { label: "Branch Name", key: "branchName" },
          { label: "Visit Type", key: "visitType" },
          { label: "Stay Overnight", key: "stayOvernight" },
          { label: "Submit Date", key: "submitDate" },
          { label: "Submit Remarks", key: "submitRemarks" },
          { label: "Accept Remarks", key: "acceptRemarks" },
          { label: "Reject Remarks", key: "rejectRemarks" },
        ]}
      />

      <div className="list-wrapper">
        <div className="md:grid grid-cols-9 list-header">
          <ListHeader label="Visit Date" />
          <ListHeader label="Branch Name" />
          <ListHeader label="Employee" />
          <ListHeader label="Visit Type" />
          <ListHeader label="Stay Overnight" />
          <ListHeader label="Submit Remarks" />
          <ListHeader label="Accept Remarks" />
          <ListHeader label="Reject Reason" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.visitId}
              className="grid grid-cols-1 md:grid-cols-9 list-body"
            >
              <ListCol
                label="Visit Date:"
                value={format(new Date(item.visitDate), "dd/MMM/yyyy")}
              />
              <ListCol label="Branch Name : " value={item.branchName} />
              <ListCol label="Employee : " value={item.employeeName} />
              <ListCol label="Visit Type : " value={item.visitType} />
              <ListCol label="Stay Overnight : " value={item.stayOvernight} />
              <ListCol label="Submit Remarks : " value={item.submitRemarks} />
              <ListCol label="Accept Remarks : " value={item.acceptRemarks} />
              <ListCol label="Reject Reason : " value={item.rejectRemarks} />
              <div className="flex justify-end space-x-2">
                <TaskButton
                  path={`/ops/my/review/preview/${item.visitId}`}
                  btnColor={
                    item.isSubmit === 1 ? "btn-umojayellow" : "btn-gray"
                  }
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
    </>
  );
};

export default ReviewList;
