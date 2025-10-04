import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import { ListHeader, ListCol } from "../../components/ListColWithHeader";
import SearchHeader from "../../components/SearchHeader";
import PrintHeader from "../../components/PrintHeader";
import { format } from "date-fns";

const ProbationList = () => {
  const { id } = useParams();
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("hrreports", `/hrreports/probation/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  const data = list.data.filter((item) => {
    if (query === "") {
      return item;
    } else if (
      item.employeePin.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.employeeName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.branchName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.departmentName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.designationName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    ) {
      return item;
    } else return null;
  });

  return (
    <div className="card w-full max-w-screen-xl">
      <PrintHeader
        title="Employee Probation List"
        fileName="employeeProbationList.csv"
        data={data.map(
          ({
            branchName,
            departmentName,
            employeePin,
            employeeName,
            dateOfBirth,
            designationName,
            joiningDate,
            gender,
            contactNumber,
            grossSalary,
            grossSalaryUsd,
            email,
          }) => ({
            branchName,
            departmentName,
            employeePin,
            employeeName,
            dateOfBirth: format(new Date(dateOfBirth), "dd/MMM/yyyy"),
            designationName,
            joiningDate: format(new Date(joiningDate), "dd/MMM/yyyy"),
            gender,
            contactNumber: `\t${contactNumber}`,
            grossSalary,
            grossSalaryUsd,
            email,
          })
        )}
        headers={[
          { label: "Branch Name", key: "branchName" },
          { label: "Department Name", key: "departmentName" },
          { label: "Employee Pin", key: "employeePin" },
          { label: "Employee Name", key: "employeeName" },
          { label: "Date of Birth", key: "dateOfBirth" },
          { label: "Designation", key: "designationName" },
          { label: "Joining Date", key: "joiningDate" },
          { label: "Gender", key: "gender" },
          { label: "Contact Number", key: "contactNumber" },
          { label: "Gross Salary", key: "grossSalary" },
          { label: "Gross Salary (USD)", key: "grossSalaryUsd" },
          { label: "Email", key: "email" },
        ]}
      />

      <SearchHeader
        action={setQuery}
        placeholder="PIN / Name / Designation / Department / Branch"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-10 list-header">
          <ListHeader label="Branch" />
          <ListHeader label="Department" />
          <ListHeader label="PIN" />
          <ListHeader label="Employee Name" />
          <ListHeader label="DOB" />
          <ListHeader label="Designation" />
          <ListHeader label="Joining Date" />
          <ListHeader label="Gender" />
          <ListHeader label="Contact Number" />
          <ListHeader label="Gross Salary" className="flex justify-end" />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.employeeId}
              className="grid grid-cols-1 md:grid-cols-10 list-body"
            >
              <ListCol label="Branch : " value={item.branchName} />
              <ListCol label="Department : " value={item.departmentName} />
              <ListCol label="PIN/Employee : " value={item.employeePin} />
              <ListCol label="Employee Name : " value={item.employeeName} />
              <ListCol
                label="DOB : "
                value={format(new Date(item.dateOfBirth), "dd/MMM/yyyy")}
              />
              <ListCol label="Designation: " value={item.designationName} />
              <ListCol
                label="Joining Date : "
                value={format(new Date(item.joiningDate), "dd/MMM/yyyy")}
              />
              <ListCol label="Gender : " value={item.gender} />
              <ListCol label="Contact Number : " value={item.contactNumber} />
              <ListCol
                label="Gross Salary : "
                value={
                  item.grossSalaryUsd === 0
                    ? item.grossSalary.toLocaleString("en-US") +
                      ` ${import.meta.env.VITE_CURRENCY}`
                    : item.grossSalaryUsd.toLocaleString("en-US") + " USD"
                }
                className="flex justify-start md:justify-end"
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

export default ProbationList;
