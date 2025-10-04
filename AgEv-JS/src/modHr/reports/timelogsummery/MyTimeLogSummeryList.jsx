import React from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import PrintHeader from "../../../components/PrintHeader";
import PdfButton from "../../../components/button/PdfButton";

const MyTimeLogSummeryList = ({ dataForm }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "myTimeLogList",
    `/hrreports/timeLogSummery/${dataForm.fromDate}/${dataForm.tillDate}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  const data = list.data.map(
    ({ employeePin, employeeName, designationName, taskHour }) => ({
      employeePin,
      employeeName,
      designationName,
      taskHour,
    })
  );

  return (
    <div className="w-full max-w-screen-xl">
      <div className="flex justify-end items-center">
        <PdfButton
          path={`/HrPdfCommon/TimeLogSummery/${dataForm.fromDate}/${dataForm.tillDate}`}
        />

        <PrintHeader
          fileName="TimelogSummery.csv"
          data={data.map(
            ({ employeePin, employeeName, designationName, taskHour }) => ({
              employeePin,
              employeeName,
              designationName,
              taskHour,
            })
          )}
          headers={[
            { label: "Employee Pin", key: "employeePin" },
            { label: "Employee Name", key: "employeeName" },
            { label: "Designation Name", key: "designationName" },
            { label: "Task Hour", key: "taskHour" },
          ]}
        />
      </div>
      <div className="list-wrapper">
        <div className="md:grid grid-cols-4 list-header">
          <ListHeader label="Employee PIN" />
          <ListHeader label="Employee Name" />
          <ListHeader label="Designation" />
          <ListHeader label="Total Task Hour" />
        </div>
        {data.length > 0 &&
          data.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-4 list-body"
            >
              <ListCol label="Employee PIN : " value={item.employeePin} />
              <ListCol label="Employee Name : " value={item.employeeName} />
              <ListCol label="Designation : " value={item.designationName} />
              <ListCol label="Task Hour : " value={item.taskHour} />
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

export default MyTimeLogSummeryList;
