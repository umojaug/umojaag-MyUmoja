import React, { useState } from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { ListHeader, ListCol } from "../../../components/ListColWithHeader";
import PrintHeader from "../../../components/PrintHeader";
import SearchHeader from "../../../components/SearchHeader";
import { format } from "date-fns";
import PrintButton from "../../../components/button/PrintButton";

const EmployeeBirthdayList = ({ dataForm }) => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "emppayroll",
    `/emppayroll/salaryattendance/${dataForm.fromDate}/${dataForm.tillDate}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  const data = list.data
    .filter((item) => {
      if (query === "") {
        return item;
      } else if (
        item.employeePin.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.employeeName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.branchName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.designationName.toLowerCase().indexOf(query.toLowerCase()) !== -1
      ) {
        return item;
      } else return null;
    })
    .map(
      ({
        empPayrollId,
        salaryMonthYear,
        branchName,
        departmentName,
        employeePin,
        employeeName,
        designationName,
        joiningDate,
        gender,
      }) => ({
        empPayrollId,
        salaryMonthYear,
        branchName,
        departmentName,
        employeePin,
        employeeName,
        designationName,
        joiningDate,
        gender,
      })
    );

  return (
    <>
      <div className="flex justify-end space-x-1">
        <div className="flex items-center space-x-2">
          <PrintButton
            path={`/salaryattendancesummary?fromdate=${dataForm.fromDate}&tilldate=${dataForm.tillDate}`}
          />
        </div>
        <PrintHeader
          fileName="salaryAttendance.csv"
          data={data.map(
            ({
              salaryMonthYear,
              branchName,
              departmentName,
              employeePin,
              employeeName,
              designationName,
              joiningDate,
              gender,
            }) => ({
              salaryMonthYear,
              branchName,
              departmentName,
              employeePin,
              employeeName,
              designationName,
              joiningDate: format(new Date(joiningDate), "dd/MMM/yyyy"),
              gender,
            })
          )}
          headers={[
            { label: "Salary Month & Year", key: "salaryMonthYear" },
            { label: "Branch Name", key: "branchName" },
            { label: "Department Name", key: "departmentName" },
            { label: "Employee Pin", key: "employeePin" },
            { label: "Employee Name", key: "employeeName" },
            { label: "Designation Name", key: "designationName" },
            { label: "Joining Date", key: "joiningDate" },
            { label: "Gender", key: "gender" },
          ]}
        />
      </div>
      <SearchHeader
        action={setQuery}
        placeholder="PIN / Name / Designation / Department / Branch"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-8 list-header">
          <ListHeader label="Month" />
          <ListHeader label="Branch" />
          <ListHeader label="Department" />
          <ListHeader label="PIN" />
          <ListHeader label="Employee Name" />
          <ListHeader label="Joining Date" />
          <ListHeader label="Designation" />
          <ListHeader label="Gender" />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.employeeId}
              className="grid grid-cols-1 md:grid-cols-8 list-body"
            >
              <ListCol
                label="Month : "
                value={format(new Date(item.salaryMonthYear), "MMM, yyyy")}
              />
              <ListCol label="Branch :" value={item.branchName} />
              <ListCol label="Department : " value={item.departmentName} />
              <ListCol label="PIN : " value={item.employeePin} />
              <ListCol label="Employee Name : " value={item.employeeName} />
              <ListCol
                label="Joining Date : "
                value={format(new Date(item.joiningDate), "dd/MMM/yyyy")}
              />
              <ListCol label="Designation : " value={item.designationName} />
              <ListCol label="Gender : " value={item.gender} />
            </div>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">Total : {data.length}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeBirthdayList;
