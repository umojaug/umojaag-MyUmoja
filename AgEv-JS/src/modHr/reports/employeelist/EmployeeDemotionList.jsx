import React, { useState } from "react";
import { format } from "date-fns";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { ListHeader, ListCol } from "../../../components/ListColWithHeader";
import PrintHeader from "../../../components/PrintHeader";
import SearchHeader from "../../../components/SearchHeader";
import PdfButton from "../../../components/button/PdfButton";

const EmployeeDemotionList = ({ dataForm }) => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "empdemotionlist",
    `/hrreports/demotion/${dataForm.fromDate}/${dataForm.tillDate}`
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
        item.departmentName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.designationName.toLowerCase().indexOf(query.toLowerCase()) !==
          -1 ||
        item.preDesignation.toLowerCase().indexOf(query.toLowerCase()) !== -1
      ) {
        return item;
      } else return null;
    })
    .map(
      ({
        empHistoryId,
        employeePin,
        employeeName,
        preDesignation,
        preGrossSalaryUsd,
        preGrossSalary,
        effectiveDate,
        branchName,
        departmentName,
        designationName,
        grossSalaryUsd,
        grossSalary,
        particulars,
      }) => ({
        empHistoryId,
        employeePin,
        employeeName,
        preDesignation,
        preGrossSalaryUsd,
        preGrossSalary,
        effectiveDate,
        branchName,
        departmentName,
        designationName,
        grossSalaryUsd,
        grossSalary,
        particulars,
      })
    );

  return (
    <>
      <div className="flex justify-end items-center">
        <PdfButton
          path={`/hrPdfCommon/demotion/${dataForm.fromDate}/${dataForm.tillDate}`}
        />
        <PrintHeader
          fileName="demotion.csv"
          data={data.map(
            ({
              employeePin,
              employeeName,
              preDesignation,
              preGrossSalaryUsd,
              preGrossSalary,
              effectiveDate,
              branchName,
              departmentName,
              designationName,
              grossSalaryUsd,
              grossSalary,
              particulars,
            }) => ({
              employeePin,
              employeeName,
              preDesignation,
              preGrossSalaryUsd,
              preGrossSalary,
              effectiveDate,
              branchName,
              departmentName,
              designationName,
              grossSalaryUsd,
              grossSalary,
              particulars,
            })
          )}
          headers={[
            { label: "Employee Pin", key: "employeePin" },
            { label: "Employee Name", key: "employeeName" },
            { label: "Previous Designation", key: "preDesignation" },
            { label: "Previous Gross Salary (USD)", key: "preGrossSalaryUsd" },
            { label: "Previous Gross Salary", key: "preGrossSalary" },
            { label: "Effective Date", key: "effectiveDate" },
            { label: "Branch Name", key: "branchName" },
            { label: "Department Name", key: "departmentName" },
            { label: "Designation", key: "designationName" },
            { label: "Gross Salary (USD)", key: "grossSalaryUsd" },
            { label: "Gross Salary", key: "grossSalary" },
            { label: "Particulars", key: "particulars" },
          ]}
        />
      </div>
      <SearchHeader
        action={setQuery}
        placeholder="PIN / Name / Designation / Department / Branch"
      />
      <div className="list-wrapper text-xs">
        <div className="md:grid grid-cols-10 list-header gap-1">
          <ListHeader label="Effective Date" />
          <ListHeader label="PIN" />
          <ListHeader label="Employee Name" />
          <ListHeader label="Pre Designation" />
          <ListHeader label="Old Gross Salary" className="flex justify-end" />
          <ListHeader label="New Branch" />
          <ListHeader label="New Department" />
          <ListHeader label="New Designation" />
          <ListHeader
            label="New Gross Salary Usd"
            className="flex justify-end"
          />
          <ListHeader label="New Gross Salary" className="flex justify-end" />
          <ListHeader label="Particulars" />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.empHistoryId}
              className="grid grid-cols-1 md:grid-cols-10 list-body gap-1"
            >
              <ListCol
                label="Effective Date : "
                value={format(new Date(item.effectiveDate), "dd/MMM/yyyy")}
              />
              <ListCol label="PIN : " value={item.employeePin} />
              <ListCol label="Employee Name : " value={item.employeeName} />
              <ListCol label="Designation : " value={item.preDesignation} />
              <ListCol
                label="Old Gross Salary : "
                value={
                  item.preGrossSalaryUsd > 0
                    ? item.preGrossSalaryUsd.toLocaleString("en-US") + " USD"
                    : item.preGrossSalary.toLocaleString("en-US") +
                      ` ${import.meta.env.VITE_CURRENCY}`
                }
                className="flex justify-start md:justify-end"
              />
              <ListCol label="Branch : " value={item.branchName} />
              <ListCol label="Department : " value={item.departmentName} />
              <ListCol
                label="Designation Name : "
                value={item.designationName}
              />
              <ListCol
                label="Gross Salary : "
                value={
                  item.grossSalaryUsd > 0
                    ? item.grossSalaryUsd.toLocaleString("en-US") + " USD"
                    : item.grossSalary.toLocaleString("en-US") +
                      ` ${import.meta.env.VITE_CURRENCY}`
                }
                className="flex justify-start md:justify-end"
              />
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

export default EmployeeDemotionList;
