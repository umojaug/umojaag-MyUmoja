import React from "react";
import { format } from "date-fns";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import DeleteButton from "../../../components/button/DeleteButton";
import EditButton from "../../../components/button/EditButton";
import PrintHeader from "../../../components/PrintHeader";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import TaskButton from "../../../components/button/TaskButton";

const BillList = ({ dataForm }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "travelingBill",
    `/userMyTravelingBill/listbyuser/${dataForm.fromDate}/${dataForm.tillDate}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data.map(
    ({
      travelingDate,
      remarks,
      acceptRemarks,
      rejectRemarks,
      submitRemarks,
    }) => ({
      travelingDate,
      remarks,
      acceptRemarks,
      rejectRemarks,
      submitRemarks,
    })
  );

  return (
    <>
      <PrintHeader
        fileName="TravelDetails.csv"
        data={data.map(
          ({
            travelingDate,
            remarks,
            acceptRemarks,
            rejectRemarks,
            submitRemarks,
            isSubmit,
          }) => ({
            travelingDate: format(new Date(travelingDate), "dd/MMM/yyyy"),
            remarks,
            acceptRemarks,
            rejectRemarks,
            submitRemarks,
            status:
              isSubmit === 0
                ? "Remarks not submitted"
                : isSubmit === 1
                ? "Pending"
                : isSubmit === 2
                ? "Approved"
                : isSubmit === 3
                ? "Rejected"
                : "Unknown",
          })
        )}
        headers={[
          { label: "Traveling Date", key: "travelingDate" },
          { label: "Short Description", key: "remarks" },
          { label: "Accept Remarks", key: "acceptRemarks" },
          { label: "Reject Remarks", key: "rejectRemarks" },
          { label: "Submit Remarks", key: "submitRemarks" },
          { label: "Status", key: "status" },
        ]}
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-7 list-header">
          <ListHeader label="Traveling Date" />
          <ListHeader label="Short Description" />
          <ListHeader label="Accept Remarks" />
          <ListHeader label="Reject Remarks" />
          <ListHeader label="Submit Remarks" />
          <ListHeader label="Status" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.travelId}
              className="grid grid-cols-1 md:grid-cols-7 list-body"
            >
              <ListCol
                label="Traveling Date:"
                value={format(new Date(item.travelingDate), "dd/MMM/yyyy")}
              />
              <ListCol label="Short Description : " value={item.remarks} />
              <ListCol label="Accept Remarks : " value={item.acceptRemarks} />
              <ListCol label="Reject Remarks : " value={item.rejectRemarks} />
              <ListCol label="Submit Remarks : " value={item.submitRemarks} />

              {item.isSubmit === 0 && (
                <ListCol label="Status" value="Remarks not submitted" />
              )}

              {item.isSubmit === 1 && (
                <ListCol label="Status" value="Pending" />
              )}

              {item.isSubmit === 2 && (
                <ListCol label="Status" value="Approved" />
              )}

              {item.isSubmit === 3 && (
                <ListCol label="Status" value="Rejected" />
              )}

              <div className="flex justify-end space-x-2">
                <TaskButton
                  path={`/transportBill/preview/${item.travelId}`}
                  btnColor={
                    item.isSubmit === 0 || item.isSubmit === 3
                      ? "btn-umojayellow"
                      : "btn-gray"
                  }
                />
                {(item.isSubmit === 0 || item.isSubmit === 3) && (
                  <>
                    <EditButton path={`/transportBill/edit/${item.travelId}`} />
                    <DeleteButton
                      action={refetch}
                      path={`/userMyTravelingBill/delete/${item.travelId}`}
                    />
                  </>
                )}
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

export default BillList;
