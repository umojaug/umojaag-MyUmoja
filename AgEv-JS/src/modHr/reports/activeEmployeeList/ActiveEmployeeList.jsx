import React, { useState } from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import {
  ListHeader,
  ListCol,
  SortableListHeader,
} from "../../../components/ListColWithHeader";
import PrintHeader from "../../../components/PrintHeader";
import SearchHeader from "../../../components/SearchHeader";
import { format } from "date-fns";
import PdfButton from "../../../components/button/PdfButton";
import { filterAndSort, useSorting } from "../../../utils/FilterSort";

const ActiveEmployeeList = ({ dataForm }) => {
  const [query, setQuery] = useState("");

  const { currentSort, handleSort } = useSorting();
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("employees", `/hrreports/activeEmployee/${dataForm.tillDate}`);

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
    <>
      <div className="flex justify-end items-center">
        <PdfButton path={`/hrPdfCommon/activeEmployee/${dataForm.tillDate}`} />
        <PrintHeader
          fileName="ActiveEmployeeList.csv"
          data={data.map(
            ({
              branchName,
              departmentName,
              employeePin,
              employeeName,
              joiningDate,
              designationName,
              contactNumber,
              grossSalary,
              grossSalaryUsd,
            }) => ({
              branchName,
              departmentName,
              employeePin,
              employeeName,
              joiningDate: format(new Date(joiningDate), "dd/MMM/yyyy"),
              designationName,
              contactNumber: `\t${contactNumber}`,
              grossSalary,
              grossSalaryUsd,
            })
          )}
          headers={[
            { label: "Branch Name", key: "branchName" },
            { label: "Department Name", key: "departmentName" },
            { label: "Employee Pin", key: "employeePin" },
            { label: "Employee Name", key: "employeeName" },
            { label: "Joining Date", key: "joiningDate" },
            { label: "Designation", key: "designationName" },
            { label: "Contact Number", key: "contactNumber" },
            { label: "Gross Salary", key: "grossSalary" },
            { label: "Gross Salary (USD)", key: "grossSalaryUsd" },
          ]}
        />
      </div>
      <SearchHeader
        action={setQuery}
        placeholder="PIN / Name / Designation / Department / Branch"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-9 list-header">
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
            currentSort={currentSort}
            sortKey="employeeName"
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
            label="Contact Number"
            sortKey="contactNumber"
            currentSort={currentSort}
            onSort={handleSort}
          />
          <SortableListHeader
            label="Gross Salary"
            sortKey="grossSalary"
            currentSort={currentSort}
            onSort={handleSort}
            className="flex justify-end"
          />
          <ListHeader label="" />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.employeeId}
              className="grid grid-cols-1 md:grid-cols-9 list-body"
            >
              <ListCol label="Branch:" value={item.branchName} />
              <ListCol label="Department: " value={item.departmentName} />
              <ListCol label="PIN : " value={item.employeePin} />
              <ListCol label="Employee Name: " value={item.employeeName} />
              <ListCol
                label="Joining Date: "
                value={format(new Date(item.joiningDate), "dd/MMM/yyyy")}
              />
              <ListCol label="Designation: " value={item.designationName} />
              <ListCol label="Contact Number: " value={item.contactNumber} />
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
              <div className="flex justify-end space-x-2">
                <PdfButton
                  path={`/hrPdfCommon/JoiningLetter/${item.employeeId}`}
                  filename={`AppointmentToThePostOf${item.designationName}_${item.employeeId}.pdf`}
                  method="Get"
                  payload={item}
                />
              </div>
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

export default ActiveEmployeeList;
