import React from "react";
import DeleteButton from "../../../../components/button/DeleteButton";
import EditButton from "../../../../components/button/EditButton";
import Error from "../../../../components/Error";
import { HashLoading } from "../../../../components/Loading";
import { useGetData } from "../../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../../components/ListColWithHeader";
import TaskButton from "../../../../components/button/TaskButton";
import { format } from "date-fns";
import PrintHeader from "../../../../components/PrintHeader";
import { AiOutlineFile } from "react-icons/ai";
import { useParams } from "react-router-dom";

const BillList = ({ dataForm }) => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "travelingBill",
    `/myTravelingBill/listbyuser/${dataForm.fromDate}/${dataForm.tillDate}/${id}`
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
        fileName="myBillList.csv"
        data={data.map(
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
        )}
        headers={[
          { label: "Traveling Date", key: "travelingDate" },
          { label: "Remarks", key: "remarks" },
          { label: "Accept Remarks", key: "acceptRemarks" },
          { label: "Reject Remarks", key: "rejectRemarks" },
          { label: "Submit Remarks", key: "submitRemarks" },
        ]}
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-8 list-header">
          <ListHeader label="Traveling Date" />
          <ListHeader label="Short Description" />
          <ListHeader label="Accept Remarks" />
          <ListHeader label="Reject Remarks" />
          <ListHeader label="Submit Remarks" />
          <ListHeader label="Status" />
          <ListHeader label="Bill Status" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.travelId}
              className="grid grid-cols-1 md:grid-cols-8 list-body"
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
              {item.isSubmit === 4 && <ListCol label="Status" value="Return" />}
              {item.billStatus === 1 ? (
                <ListCol label="Bill Status" value="Paid" />
              ) : (
                <ListCol label="Bill Status" value="Unpaid" />
              )}

              <div className="flex justify-end space-x-2">
                <TaskButton
                  path={`/ops/transportBill/preview/${item.travelId}`}
                  btnColor={
                    item.isSubmit === 0 || item.isSubmit === 4
                      ? "btn-umojayellow"
                      : "btn-gray"
                  }
                />
                <a href={item.fileUrl} className="btn-sky w-12 h-10">
                  <AiOutlineFile size={24} />
                </a>
                {(item.isSubmit === 0 || item.isSubmit === 4) && (
                  <>
                    <EditButton
                      path={`/ops/transportBill/edit/${item.travelId}`}
                    />
                    <DeleteButton
                      action={refetch}
                      path={`/myTravelingBill/delete/${item.travelId}`}
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
