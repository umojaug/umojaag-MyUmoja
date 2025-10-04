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

const EmployeeTransferList = ({ dataForm }) => {
  const [query, setQuery] = useState("");
  const { currentSort, handleSort } = useSorting();
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "employees",
    `/hrreports/transfer/${dataForm.fromDate}/${dataForm.tillDate}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  const data = filterAndSort(
    list.data,
    decodeURIComponent(query),
    "",
    currentSort
  );

  return (
    <>
      <div className="flex justify-end items-center">
        <PdfButton
          path={`/HrPdfCommon/transfer/${dataForm.fromDate}/${dataForm.tillDate}`}
        />

        <PrintHeader
          fileName="transfer.csv"
          data={data.map(
            ({
              employeePin,
              employeeName,
              designationName,
              preBranchName,
              preDepartmentName,
              effectiveDate,
              branchName,
              departmentName,
              particulars,
            }) => ({
              employeePin,
              employeeName,
              designationName,
              preBranchName,
              preDepartmentName,
              effectiveDate,
              branchName,
              departmentName,
              particulars,
            })
          )}
          headers={[
            { label: "Employee Pin", key: "employeePin" },
            { label: "Employee Name", key: "employeeName" },
            { label: "Designation Name", key: "designationName" },
            { label: "Previous Branch Name", key: "preBranchName" },
            { label: "Previous Department Name", key: "preDepartmentName" },
            { label: "Effective Date", key: "effectiveDate" },
            { label: "Branch Name", key: "branchName" },
            { label: "Department Name", key: "departmentName" },
            { label: "Particulars", key: "particulars" },
          ]}
        />
      </div>
      <SearchHeader
        action={setQuery}
        placeholder="PIN / Name / Designation / Department / Branch"
      />
      <div className="list-wrapper text-xs">
        <div className="md:grid grid-cols-9 list-header">
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
            label="Designation Name"
            sortKey="designationName"
            currentSort={currentSort}
            onSort={handleSort}
          />
          <SortableListHeader
            label="Old Branch"
            sortKey="prepreBranchName"
            currentSort={currentSort}
            onSort={handleSort}
          />
          <SortableListHeader
            label="Old Department"
            sortKey="predepartmentName"
            currentSort={currentSort}
            onSort={handleSort}
          />
          <SortableListHeader
            label="Effective Date"
            sortKey="effectiveDate"
            currentSort={currentSort}
            onSort={handleSort}
          />
          <SortableListHeader
            label="New Branch"
            sortKey="branchName"
            currentSort={currentSort}
            onSort={handleSort}
          />
          <SortableListHeader
            label="New Department"
            sortKey="departmentName"
            currentSort={currentSort}
            onSort={handleSort}
          />
          <SortableListHeader
            label="Particulars"
            sortKey="particulars"
            currentSort={currentSort}
            onSort={handleSort}
          />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.empHistoryId}
              className="grid grid-cols-1 md:grid-cols-9 list-body"
            >
              <ListCol label="PIN : " value={item.employeePin} />
              <ListCol label="Employee Name : " value={item.employeeName} />
              <ListCol label="Designation : " value={item.designationName} />
              <ListCol label="Old Branch : " value={item.preBranchName} />
              <ListCol
                label="Old Department : "
                value={item.preDepartmentName}
              />
              <ListCol
                label="Effective Date : "
                value={format(new Date(item.effectiveDate), "dd/MMM/yyyy")}
              />

              <ListCol label="Branch : " value={item.branchName} />
              <ListCol label="Department : " value={item.departmentName} />
              <ListCol label="Particulars : " value={item.particulars} />
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

export default EmployeeTransferList;
