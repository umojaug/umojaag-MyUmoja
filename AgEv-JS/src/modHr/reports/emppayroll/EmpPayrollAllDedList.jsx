import React, { useState } from "react";
import { format } from "date-fns";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { ListHeader, ListCol } from "../../../components/ListColWithHeader";
import PrintHeader from "../../../components/PrintHeader";
import SearchHeader from "../../../components/SearchHeader";
import PdfButton from "../../../components/button/PdfButton";

const EmpPayrollAllDedList = ({ dataForm }) => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "empalldedlist",
    `/empallded/list/${dataForm.fromDate}/${dataForm.tillDate}`
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
        item.designationName.toLowerCase().indexOf(query.toLowerCase()) !== -1
      ) {
        return item;
      } else return null;
    })
    .map(
      ({
        empAllDedId,
        branchName,
        departmentName,
        employeePin,
        employeeName,
        designationName,
        allowanceDeductionName,
        effectiveDate,
        amount,
        particulars,
      }) => ({
        empAllDedId,
        branchName,
        departmentName,
        employeePin,
        employeeName,
        designationName,
        allowanceDeductionName,
        effectiveDate,
        amount,
        particulars,
      })
    );

  return (
    <>
      <div className="flex justify-end items-center">
        <PdfButton
          path={`/HrPdfCommon/adlist/${dataForm.fromDate}/${dataForm.tillDate}`}
        />

        <PrintHeader
          fileName="allded.csv"
          data={data.map(
            ({
              branchName,
              departmentName,
              employeePin,
              employeeName,
              designationName,
              allowanceDeductionName,
              effectiveDate,
              amount,
              particulars,
            }) => ({
              branchName,
              departmentName,
              employeePin,
              employeeName,
              designationName,
              allowanceDeductionName,
              effectiveDate,
              amount,
              particulars,
            })
          )}
          headers={[
            { label: "Branch Name", key: "branchName" },
            { label: "Department Name", key: "departmentName" },
            { label: "Employee Pin", key: "employeePin" },
            { label: "Employee Name", key: "employeeName" },
            { label: "Designation Name", key: "designationName" },
            {
              label: "Allowance/Deduction Name",
              key: "allowanceDeductionName",
            },
            { label: "Effective Date", key: "effectiveDate" },
            { label: "Amount", key: "amount" },
            { label: "Particulars", key: "particulars" },
          ]}
        />
      </div>
      <SearchHeader
        action={setQuery}
        placeholder="PIN / Name / Designation / Department / Branch"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-9 list-header">
          <ListHeader label="Branch" />
          <ListHeader label="Department" />
          <ListHeader label="PIN" />
          <ListHeader label="Employee Name" />
          <ListHeader label="Designation" />
          <ListHeader label="Allowance / Deduction Name" />
          <ListHeader label="Effective Date" />
          <ListHeader label="Amount" />
          <ListHeader label="Particulars" />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.empAllDedId}
              className="grid grid-cols-1 md:grid-cols-9 list-body"
            >
              <ListCol label="Branch:" value={item.branchName} />
              <ListCol label="Department: " value={item.departmentName} />
              <ListCol label="PIN : " value={item.employeePin} />
              <ListCol label="Employee Name: " value={item.employeeName} />
              <ListCol label="Designation: " value={item.designationName} />
              <ListCol
                label="Allowance / Deduction Name: "
                value={item.allowanceDeductionName}
              />
              <ListCol
                label="Effective Date: "
                value={format(new Date(item.effectiveDate), "dd/MMM/yyyy")}
              />

              <ListCol label="Amount: " value={item.amount} />
              <ListCol label="Particulars: " value={item.particulars} />
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

export default EmpPayrollAllDedList;
