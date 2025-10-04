import React, { useState } from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { ListHeader, ListCol } from "../../../components/ListColWithHeader";
import SearchHeader from "../../../components/SearchHeader";
import PrintHeader from "../../../components/PrintHeader";
import { format } from "date-fns";
import PdfButton from "../../../components/button/PdfButton";

const AuditTrailList = ({ dataForm }) => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "employees",
    `/hrreports/auditTrail/${dataForm.fromDate}/${dataForm.tillDate}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  const data = list.data.filter((item) => {
    if (query === "") {
      return item;
    } else if (
      item.employeePin.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.employeeName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.taskName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.entryBy.toLowerCase().indexOf(query.toLowerCase()) !== -1
    ) {
      return item;
    } else return null;
  });

  return (
    <div>
      <div className="flex justify-end items-center">
        <PdfButton
          path={`/HrPdfCommon/auditTrail/${dataForm.fromDate}/${dataForm.tillDate}`}
        />
        <PrintHeader
          fileName="auditTrailReport.csv"
          data={data.map(
            ({
              employeePin,
              employeeName,
              taskName,
              entryBy,
              entryDate,
              updateDate,
            }) => ({
              employeePin,
              employeeName,
              taskName,
              entryBy,
              entryDate,
              updateDate,
            })
          )}
          headers={[
            { label: "Employee Pin", key: "employeePin" },
            { label: "Employee Name", key: "employeeName" },
            { label: "Task Name", key: "taskName" },
            { label: "Entry By", key: "entryBy" },
            { label: "Entry Date", key: "entryDate" },
            { label: "Update Date", key: "updateDate" },
          ]}
        />
      </div>

      <SearchHeader
        action={setQuery}
        placeholder="PIN / Name / Entry By / Task Name"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-6 list-header">
          <ListHeader label="Employee Pin" />
          <ListHeader label="Employee Name" />
          <ListHeader label="Task Name" />
          <ListHeader label="Entry By" />
          <ListHeader label="Entry Date" />
          <ListHeader label="Update Date" />
        </div>
        {data.length > 0 &&
          data.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-6 list-body"
            >
              <ListCol label="Employee Pin : " value={item.employeePin} />
              <ListCol label="Employee Name : " value={item.employeeName} />
              <ListCol label="Task Name : " value={item.taskName} />
              <ListCol label="Entry By : " value={item.entryBy} />

              <ListCol
                label="Entry Date : "
                value={format(new Date(item.entryDate), "dd/MMM/yyyy")}
              />

              <ListCol
                label="Update Date : "
                value={format(new Date(item.updateDate), "dd/MMM/yyyy")}
              />
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

export default AuditTrailList;
