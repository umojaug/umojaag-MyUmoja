import React from "react";
import { format } from "date-fns";
import { AiOutlineFile } from "react-icons/ai";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import TaskButton from "../../../components/button/TaskButton";
import PdfButton from "../../../components/button/PdfButton";
import PrintHeader from "../../../components/PrintHeader";

const TravelBillList = ({ dataForm }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData(
    "travelingBill",
    `/myTravelingBill/report/${dataForm.fromDate}/${dataForm.tillDate}`
  );

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
    <div className="w-full max-w-screen-xl gap-2 pt-4">
      <div className="flex justify-end items-center">
        <PdfButton
          path={`/opsPdf/travelHistory/${dataForm.fromDate}/${dataForm.tillDate}`}
        />

        <PrintHeader
          fileName="TravelReport.csv"
          data={data.map(
            ({
              travelingDate,
              employeeName,
              checkerName,
              managerName,
              remarks,
              isSubmit,
              billStatus,
              travelId,
              fileUrl,
            }) => ({
              travelingDate,
              employeeName,
              checkerName,
              managerName,
              remarks,
              isSubmit,
              billStatus,
              travelId,
              fileUrl,
            })
          )}
          headers={[
            { label: "Travel Date", key: "travelingDate" },
            { label: "Applicant", key: "employeeName" },
            { label: "Checked By", key: "checkerName" },
            { label: "Supervisor", key: "managerName" },
            { label: "Short Description", key: "remarks" },
            { label: "Status", key: "isSubmit" },
            { label: "Bill Status", key: "billStatus" },
            { label: "Travel ID", key: "travelId" },
            { label: "File URL", key: "fileUrl" },
          ]}
        />
      </div>
      <div className="list-wrapper">
        <div className="md:grid grid-cols-8 list-header">
          <ListHeader label="Travel Date" />
          <ListHeader label="Applicant" />
          <ListHeader label="Checked By" />
          <ListHeader label="Supervisor" />
          <ListHeader label="Short Description" />
          <ListHeader label="Status" />
          <ListHeader label="Bill Status" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-8 list-body"
            >
              <ListCol
                label="Travel Date:"
                value={format(new Date(item.travelingDate), "dd/MMM/yyyy")}
              />
              <ListCol label="Applicant : " value={item.employeeName} />
              <ListCol label="CheckedBy : " value={item.checkerName} />
              <ListCol label="Supervisor : " value={item.managerName} />
              <ListCol label="Short Description : " value={item.remarks} />
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
                <ListCol label="Bill Status : " value="Paid" />
              ) : (
                <ListCol label="Bill Status : " value="Unpaid" />
              )}
              <div className="flex justify-end space-x-2">
                <TaskButton
                  path={`/ops/reports/travelbill/preview/${item.travelId}`}
                  btnColor="btn-gray"
                />

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

export default TravelBillList;
