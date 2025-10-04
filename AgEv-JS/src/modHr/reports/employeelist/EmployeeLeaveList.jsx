import React, { useState } from "react";
import { format } from "date-fns";
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
import PdfButton from "../../../components/button/PdfButton";
import { filterAndSort, useSorting } from "../../../utils/FilterSort";

const EmployeeLeaveList = ({ dataForm }) => {
  const [query, setQuery] = useState("");
  const { currentSort, handleSort } = useSorting();
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "employeeleavelist",
    `/hrreports/leave/${dataForm.fromDate}/${dataForm.tillDate}`
  );

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
        <PdfButton
          path={`/hrPdfCommon/leave/${dataForm.fromDate}/${dataForm.tillDate}`}
        />
        <PrintHeader
          fileName="leave.csv"
          data={data.map(
            ({
              branchName,
              departmentName,
              employeePin,
              employeeName,
              designationName,
              leaveName,
              fromDate,
              tillDate,
              particulars,
              leaveStatus,
              authorityName,
            }) => ({
              branchName,
              departmentName,
              employeePin,
              employeeName,
              designationName,
              leaveName,
              fromDate,
              tillDate,
              particulars,
              leaveStatus,
              authorityName,
            })
          )}
          headers={[
            { label: "Branch Name", key: "branchName" },
            { label: "Department Name", key: "departmentName" },
            { label: "Employee Pin", key: "employeePin" },
            { label: "Employee Name", key: "employeeName" },
            { label: "Designation", key: "designationName" },
            { label: "Leave Name", key: "leaveName" },
            { label: "From Date", key: "fromDate" },
            { label: "Till Date", key: "tillDate" },
            { label: "Particulars", key: "particulars" },
            { label: "Leave Status", key: "leaveStatus" },
            { label: "Authority Name", key: "authorityName" },
          ]}
        />
      </div>
      <SearchHeader
        action={setQuery}
        placeholder="PIN / Name / Designation / Department / Branch"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-11 list-header">
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
            label="Designation"
            sortKey="designationName"
            currentSort={currentSort}
            onSort={handleSort}
          />
          <SortableListHeader
            label="Leave Name"
            sortKey="leaveName"
            currentSort={currentSort}
            onSort={handleSort}
          />
          <SortableListHeader
            label="From Date"
            sortKey="fromDate"
            currentSort={currentSort}
            onSort={handleSort}
          />
          <SortableListHeader
            label="Till Date"
            sortKey="tillDate"
            currentSort={currentSort}
            onSort={handleSort}
          />
          <SortableListHeader
            label="Particulars"
            sortKey="particulars"
            currentSort={currentSort}
            onSort={handleSort}
          />
          <SortableListHeader
            label="Status"
            sortKey="leaveStatus"
            currentSort={currentSort}
            onSort={handleSort}
          />
          <SortableListHeader
            label="At"
            sortKey="authorityName"
            currentSort={currentSort}
            onSort={handleSort}
          />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.empLeaveId}
              className="grid grid-cols-1 md:grid-cols-11 list-body"
            >
              <ListCol label="Branch:" value={item.branchName} />
              <ListCol label="Department: " value={item.departmentName} />
              <ListCol label="PIN : " value={item.employeePin} />
              <ListCol label="Employee Name: " value={item.employeeName} />
              <ListCol label="Designation: " value={item.designationName} />
              <ListCol label="Leave Name: " value={item.leaveName} />
              <ListCol
                label="From Date: "
                value={format(new Date(item.fromDate), "dd/MMM/yyyy")}
              />
              <ListCol
                label="Till Date : "
                value={format(new Date(item.tillDate), "dd/MMM/yyyy")}
              />
              <ListCol label="Particulars : " value={item.particulars} />
              <ListCol label="Status : " value={item.leaveStatus} />
              <ListCol label="At : " value={item.authorityName} />
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

export default EmployeeLeaveList;
