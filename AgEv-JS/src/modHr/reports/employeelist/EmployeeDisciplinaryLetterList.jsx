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
import PreviewButton from "../../../components/button/PreviewButton";
import { format } from "date-fns";
import PdfButton from "../../../components/button/PdfButton";
import { filterAndSort, useSorting } from "../../../utils/FilterSort";

const EmployeeDisciplinaryLetterList = ({ dataForm }) => {
  const [query, setQuery] = useState("");
  const { currentSort, handleSort } = useSorting();
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "empdisciplinaryletter",
    `/hrreports/disciplinaryletter/${dataForm.fromDate}/${dataForm.tillDate}`
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
          path={`/hrPdfCommon/disciplinaryletter/${dataForm.fromDate}/${dataForm.tillDate}`}
        />
        <PrintHeader
          fileName="disciplinaryLetter.csv"
          data={data.map(
            ({
              branchName,
              departmentName,
              employeePin,
              employeeName,
              designationName,
              letterType,
              issueDate,
              title,
              particulars,
            }) => ({
              branchName,
              departmentName,
              employeePin,
              employeeName,
              designationName,
              letterType,
              issueDate,
              title,
              particulars,
            })
          )}
          headers={[
            { label: "Branch Name", key: "branchName" },
            { label: "Department Name", key: "departmentName" },
            { label: "Employee Pin", key: "employeePin" },
            { label: "Employee Name", key: "employeeName" },
            { label: "Designation", key: "designationName" },
            { label: "Letter Type", key: "letterType" },
            { label: "Issue Date", key: "issueDate" },
            { label: "Title", key: "title" },
            { label: "Particulars", key: "particulars" },
          ]}
        />
      </div>
      <SearchHeader
        action={setQuery}
        placeholder="PIN / Name / Designation / Department / Branch"
      />
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
            label="Letter Type"
            sortKey="letterType"
            currentSort={currentSort}
            onSort={handleSort}
          />
          <SortableListHeader
            label="Issue Date"
            sortKey="issueDate"
            currentSort={currentSort}
            onSort={handleSort}
          />
          <SortableListHeader
            label="Subject"
            sortKey="title"
            currentSort={currentSort}
            onSort={handleSort}
            className="md:col-span-2"
          />
          <ListHeader label="" />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.empDisciplinaryId}
              className="grid grid-cols-1 md:grid-cols-10 list-body"
            >
              <ListCol label="Branch:" value={item.branchName} />
              <ListCol label="Department: " value={item.departmentName} />
              <ListCol label="PIN: " value={item.employeePin} />
              <ListCol label="Employee Name: " value={item.employeeName} />
              <ListCol label="Designation: " value={item.designationName} />
              <ListCol label="Letter Type: " value={item.letterType} />
              <ListCol
                label="Issue Date: "
                value={format(new Date(item.issueDate), "dd/MMM/yyyy")}
              />
              <ListCol
                label="Subject : "
                value={item.title}
                className="md:col-span-2"
              />
              <div className="flex justify-end space-x-2">
                <PreviewButton
                  path={`/hr/reports/employee/disciplinary/Letter/preview/${item.disciplinaryLetterId}`}
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

export default EmployeeDisciplinaryLetterList;
