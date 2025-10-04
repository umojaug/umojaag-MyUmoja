import React, { useState } from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import {
  SortableListHeader,
  ListCol,
} from "../../../components/ListColWithHeader";
import SearchHeader from "../../../components/SearchHeader";
import PrintHeader from "../../../components/PrintHeader";
import { format } from "date-fns";
import PdfButton from "../../../components/button/PdfButton";
import TopHeader from "../../../components/TopHeader";
import { filterAndSort, useSorting } from "../../../utils/FilterSort";

const EmployeeTenure = () => {
  const [query, setQuery] = useState("");
  const { currentSort, handleSort } = useSorting();
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("employees", "/hrreports/tenure");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  const searchFields = [
    "employeePin",
    "employeeName",
    "branchName",
    "departmentName",
    "designationName",
  ];

  const data = filterAndSort(
    list.data,
    decodeURIComponent(query),
    searchFields,
    currentSort
  );

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Tenure List" />
      <div className="flex justify-end items-center">
        <PdfButton path={`/HrPdfCommon/tenure`} />
        <PrintHeader
          fileName="tenure.csv"
          data={data.map(
            ({
              branchName,
              departmentName,
              employeePin,
              employeeName,
              designationName,
              dateOfBirth,
              gender,
              email,
              contactNumber,
              joiningDate,
              tenureYear,
              tenureMonth,
            }) => ({
              branchName,
              departmentName,
              employeePin,
              employeeName,
              designationName,
              dateOfBirth: format(new Date(dateOfBirth), "dd/MMM/yyyy"),
              gender,
              email,
              contactNumber: `\t${contactNumber}`,
              joiningDate: format(new Date(joiningDate), "dd/MMM/yyyy"),
              tenureYear,
              tenureMonth,
            })
          )}
          headers={[
            { label: "Branch Name", key: "branchName" },
            { label: "Department Name", key: "departmentName" },
            { label: "Employee Pin", key: "employeePin" },
            { label: "Employee Name", key: "employeeName" },
            { label: "Designation Name", key: "designationName" },
            { label: "Date of Birth", key: "dateOfBirth" },
            { label: "Gender", key: "gender" },
            { label: "Email", key: "email" },
            { label: "Contact Number", key: "contactNumber" },
            { label: "Joining Date", key: "joiningDate" },
            { label: "Tenure Year", key: "tenureYear" },
            { label: "Tenure Month", key: "tenureMonth" },
          ]}
        />
      </div>
      <SearchHeader
        action={setQuery}
        placeholder="PIN / Name / Designation / Department / Branch"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-12 list-header">
          <SortableListHeader
            label="Branch"
            sortKey="branchName"
            currentSort={currentSort}
            onSort={handleSort}
          />
          <SortableListHeader
            label="Department"
            sortKey="departmentName"
            currentSort={currentSort}
            onSort={handleSort}
          />
          <SortableListHeader
            label="PIN"
            sortKey="employeePin"
            currentSort={currentSort}
            onSort={handleSort}
          />
          <SortableListHeader
            label="Employee Name"
            sortKey="employeeName"
            currentSort={currentSort}
            onSort={handleSort}
          />
          <SortableListHeader
            label="Date Of Birth"
            sortKey="dateOfBirth"
            currentSort={currentSort}
            onSort={handleSort}
          />
          <SortableListHeader
            label="Gender"
            sortKey="gender"
            currentSort={currentSort}
            onSort={handleSort}
          />
          <SortableListHeader
            label="Joining Date"
            sortKey="joiningDate"
            currentSort={currentSort}
            onSort={handleSort}
          />
          <SortableListHeader
            label="Designation"
            sortKey="designationName"
            currentSort={currentSort}
            onSort={handleSort}
          />
          <SortableListHeader
            label="Email"
            sortKey="email"
            currentSort={currentSort}
            onSort={handleSort}
          />
          <SortableListHeader
            label="Contact Number"
            sortKey="contactNumber"
            currentSort={currentSort}
            onSort={handleSort}
          />
          <SortableListHeader
            label="Year"
            sortKey="tenureYear"
            currentSort={currentSort}
            onSort={handleSort}
            className="flex justify-end"
          />
          <SortableListHeader
            label="Month"
            sortKey="tenureMonth"
            currentSort={currentSort}
            onSort={handleSort}
            className="flex justify-end"
          />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.employeeId}
              className="grid grid-cols-1 md:grid-cols-12 list-body"
            >
              <ListCol label="Branch:" value={item.branchName} />
              <ListCol label="Department: " value={item.departmentName} />
              <ListCol label="PIN : " value={item.employeePin} />
              <ListCol label="Employee Name: " value={item.employeeName} />
              <ListCol
                label="Date Of Birth: "
                value={format(new Date(item.dateOfBirth), "dd/MMM/yyyy")}
              />
              <ListCol label="Gender: " value={item.gender} />
              <ListCol
                label="Joining Date: "
                value={format(new Date(item.joiningDate), "dd/MMM/yyyy")}
              />
              <ListCol label="Designation: " value={item.designationName} />
              <ListCol label="Email: " value={item.email} />
              <ListCol label="Contact Number: " value={item.contactNumber} />
              <ListCol
                label="Tenure Year: "
                value={item.tenureYear}
                className="flex justify-start md:justify-end"
              />
              <ListCol
                label="Tenure Month: "
                value={item.tenureMonth}
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

export default EmployeeTenure;
