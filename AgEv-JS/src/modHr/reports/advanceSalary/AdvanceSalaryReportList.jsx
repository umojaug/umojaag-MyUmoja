import React, { useState } from "react";
import { format } from "date-fns";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import {
  ListCol,
  ListHeader,
  SortableListHeader,
} from "../../../components/ListColWithHeader";
import SearchHeader from "../../../components/SearchHeader";
import PdfButton from "../../../components/button/PdfButton";
import PrintHeader from "../../../components/PrintHeader";
import { filterAndSort, useSorting } from "../../../utils/FilterSort";

const AdvanceSalaryReportList = ({ dataForm }) => {
  const [query, setQuery] = useState("");
  const { currentSort, handleSort } = useSorting();

  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "hrreportsAdvanceSalarylist",
    `/hrreports/advanceSalary/${dataForm.fromDate}/${dataForm.tillDate}`
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
    <div className="w-full max-w-screen-xl">
      <div className="flex justify-end items-center">
        <PdfButton
          path={`/hrPdfCommon/advanceSalary/${dataForm.fromDate}/${dataForm.tillDate}`}
        />
        <PrintHeader
          fileName="Advancesalary.csv"
          data={data.map(
            ({
              branchName,
              departmentName,
              employeePin,
              employeeName,
              designationName,
              advanceAmount,
              neededAdvanceDate,
              purposeOfAdvance,
              advanceStatus,
              authorityName,
            }) => ({
              branchName,
              departmentName,
              employeePin,
              employeeName,
              designationName,
              advanceAmount,
              neededAdvanceDate,
              purposeOfAdvance,
              advanceStatus,
              authorityName,
            })
          )}
          headers={[
            { label: "Branch Name", key: "branchName" },
            { label: "Department Name", key: "departmentName" },
            { label: "Employee Pin", key: "employeePin" },
            { label: "Employee Name", key: "employeeName" },
            { label: "Designation", key: "designationName" },
            { label: "Advance Amount", key: "advanceAmount" },
            { label: "Needed Advance Date", key: "neededAdvanceDate" },
            { label: "Purpose of Advance", key: "purposeOfAdvance" },
            { label: "Advance Status", key: "advanceStatus" },
            { label: "Authority Name", key: "authorityName" },
          ]}
        />
      </div>
      <SearchHeader placeholder="PIN / Name" action={setQuery} />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-10 list-header">
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
            label="Designation"
            sortKey="designationName"
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
            label="Amount"
            sortKey="advanceAmount"
            currentSort={currentSort}
            onSort={handleSort}
          />
          <SortableListHeader
            label="Needed Date"
            sortKey="neededAdvanceDate"
            currentSort={currentSort}
            onSort={handleSort}
          />
          <SortableListHeader
            label="Purpose Of Advance"
            sortKey="neededAdvanceDate"
            currentSort={currentSort}
            onSort={handleSort}
          />
          <SortableListHeader
            label="Status"
            sortKey="advanceStatus"
            currentSort={currentSort}
            onSort={handleSort}
          />
          <SortableListHeader
            label="Recommended By"
            sortKey="authorityName"
            currentSort={currentSort}
            onSort={handleSort}
          />
        </div>
        {data.length > 0 &&
          data.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-10 list-body"
            >
              <ListCol label="Branch :" value={item.branchName} />
              <ListCol label="Department : " value={item.departmentName} />
              <ListCol label="PIN : " value={item.employeePin} />
              <ListCol label="Employee Name : " value={item.designationName} />
              <ListCol label="Employee Name : " value={item.employeeName} />
              <ListCol
                label="Amount : "
                value={item.advanceAmount.toLocaleString()}
              />
              <ListCol
                label="Needed Advance Date : "
                value={format(new Date(item.neededAdvanceDate), "dd/MMM/yyyy")}
              />

              <ListCol
                label="Purpose Of Advance : "
                value={item.purposeOfAdvance}
              />
              <ListCol label="Status : " value={item.advanceStatus} />
              <ListCol label="Recommended By : " value={item.authorityName} />
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

export default AdvanceSalaryReportList;
