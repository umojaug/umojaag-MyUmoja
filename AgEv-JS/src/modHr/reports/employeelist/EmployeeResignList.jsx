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
import TaskButton from "../../../components/button/TaskButton";
import PdfButton from "../../../components/button/PdfButton";
import { filterAndSort, useSorting } from "../../../utils/FilterSort";

const EmployeeResignList = ({ dataForm }) => {
  const [query, setQuery] = useState("");
  const { currentSort, handleSort } = useSorting();
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "employees",
    `/hrreports/resign/${dataForm.fromDate}/${dataForm.tillDate}`
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
          path={`/HrPdfCommon/resign/${dataForm.fromDate}/${dataForm.tillDate}`}
        />
        <PrintHeader
          fileName="resign.csv"
          data={data.map(
            ({
              branchName,
              departmentName,
              employeePin,
              employeeName,
              dateOfBirth,
              designationName,
              gender,
              joiningDate,
              contactNumber,
              email,
              resignDate,
              resignReasonName,
              particulars,
            }) => ({
              branchName,
              departmentName,
              employeePin,
              employeeName,
              dateOfBirth: format(new Date(dateOfBirth), "dd/MMM/yyyy"),
              designationName,
              gender,
              joiningDate: format(new Date(joiningDate), "dd/MMM/yyyy"),
              contactNumber: `\t${contactNumber}`,
              email,
              resignDate,
              resignReasonName,
              particulars,
            })
          )}
          headers={[
            { label: "Branch Name", key: "branchName" },
            { label: "Department Name", key: "departmentName" },
            { label: "Employee Pin", key: "employeePin" },
            { label: "Employee Name", key: "employeeName" },
            { label: "Date of Birth", key: "dateOfBirth" },
            { label: "Designation Name", key: "designationName" },
            { label: "Gender", key: "gender" },
            { label: "Joining Date", key: "joiningDate" },
            { label: "Contact Number", key: "contactNumber" },
            { label: "Email", key: "email" },
            { label: "Resign Date", key: "resignDate" },
            { label: "Resign Reason", key: "resignReasonName" },
            { label: "Particulars", key: "particulars" },
          ]}
        />
      </div>

      <SearchHeader
        action={setQuery}
        placeholder="PIN / Namse / Designation / Department / Branch"
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
          <ListHeader label="Gender, Date Of Birth" />
          <SortableListHeader
            label="Designation"
            sortKey="designationName"
            currentSort={currentSort}
            onSort={handleSort}
          />
          <SortableListHeader
            label="Joining Date"
            sortKey="joiningDate"
            currentSort={currentSort}
            onSort={handleSort}
          />
          <ListHeader label="Contact Phone, Email: " />
          <SortableListHeader
            label="Resign Date"
            sortKey="resignDate"
            currentSort={currentSort}
            onSort={handleSort}
          />
          <SortableListHeader
            label="Reason"
            sortKey="resignReasonName"
            currentSort={currentSort}
            onSort={handleSort}
          />
          <SortableListHeader
            label="Particulars"
            sortKey="particulars"
            currentSort={currentSort}
            onSort={handleSort}
          />
          <ListHeader label="" />
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
                label="Gender & DOB: "
                value={
                  item.gender +
                  ", " +
                  format(new Date(item.dateOfBirth), "dd/MMM/yyyy")
                }
              />
              <ListCol label="Designation: " value={item.designationName} />
              <ListCol
                label="Joining Date: "
                value={format(new Date(item.joiningDate), "dd/MMM/yyyy")}
              />
              <ListCol
                label="Contact Phone, Email: "
                value={item.contactNumber + ", " + item.email}
              />
              <ListCol
                label="Resign Date: "
                value={format(new Date(item.resignDate), "dd/MMM/yyyy")}
              />
              <ListCol label="Reason: " value={item.resignReasonName} />
              <ListCol label="Particulars: " value={item.particulars} />
              <div className="flex justify-end space-x-2">
                <TaskButton
                  path={`/hr/employee/resign/details/${item.employeeId}`}
                />
                <PdfButton
                  path={`/hrPdfCommon/ResignDetails/${item.employeeId}`}
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

export default EmployeeResignList;
