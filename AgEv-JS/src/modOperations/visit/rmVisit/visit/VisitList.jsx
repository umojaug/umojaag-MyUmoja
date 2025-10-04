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

const VisitList = ({ dataForm }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "visitbyuser",
    `/rmvisit/listbyuser/${dataForm.fromDate}/${dataForm.tillDate}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data.map(
    ({
      visitDate,
      branchName,
      visitType,
      stayOvernight,
      managerName,
      submitDate,
      submitRemarks,
      acceptRemarks,
      rejectRemarks,
    }) => ({
      visitDate,
      branchName,
      visitType,
      stayOvernight,
      managerName,
      submitDate,
      submitRemarks,
      acceptRemarks,
      rejectRemarks,
    })
  );

  return (
    <>
      <PrintHeader
        fileName="myvisitlist.csv"
        data={data.map(
          ({
            visitDate,
            branchName,
            visitType,
            stayOvernight,
            managerName,
            submitDate,
            submitRemarks,
            acceptRemarks,
            rejectRemarks,
          }) => ({
            visitDate,
            branchName,
            visitType,
            stayOvernight,
            managerName,
            submitDate,
            submitRemarks,
            acceptRemarks,
            rejectRemarks,
          })
        )}
        headers={[
          { label: "Visit Date", key: "visitDate" },
          { label: "Branch Name", key: "branchName" },
          { label: "Visit Type", key: "visitType" },
          { label: "Stay Overnight", key: "stayOvernight" },
          { label: "Manager Name", key: "managerName" },
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
          <ListHeader label="Visit Type" />
          <ListHeader label="Stay Overnight" />
          <ListHeader label="Manager" />
          <ListHeader label="Submit Remarks" />
          <ListHeader label="Accept Remarks" />
          <ListHeader label="Reject Reason" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.rmVisitId}
              className="grid grid-cols-1 md:grid-cols-9 list-body"
            >
              <ListCol
                label="Visit Date:"
                value={format(new Date(item.visitDate), "dd/MMM/yyyy")}
              />
              <ListCol label="Branch Name : " value={item.branchName} />
              <ListCol label="Visit Type : " value={item.visitType} />
              <ListCol label="Stay Overnight : " value={item.stayOvernight} />
              <ListCol label="Manager : " value={item.managerName} />
              <ListCol label="Submit Remarks : " value={item.submitRemarks} />
              <ListCol label="Accept Remarks : " value={item.acceptRemarks} />
              <ListCol label="Reject Reason : " value={item.rejectRemarks} />
              <div className="flex justify-end space-x-2">
                <TaskButton
                  path={`/ops/rm/visit/preview/${item.rmVisitId}`}
                  btnColor={
                    item.isSubmit === 0 ? "btn-umojayellow" : "btn-gray"
                  }
                />
                {item.isSubmit === 0 && (
                  <>
                    <EditButton path={`/ops/rm/visit/edit/${item.rmVisitId}`} />
                    <DeleteButton
                      action={refetch}
                      path={`/rmvisit/delete/${item.rmVisitId}`}
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

export default VisitList;
