import React, { useState } from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { ListHeader, ListCol } from "../../../components/ListColWithHeader";
import PrintHeader from "../../../components/PrintHeader";
import { selectOptions } from "../../../data/selectOptions";
import SearchHeader from "../../../components/SearchHeader";
import PdfButton from "../../../components/button/PdfButton";

const EmpPayrollTaxList = ({ dataForm }) => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "emppayrolltax",
    `/emppayroll/tax/${dataForm.selectMonth}/${dataForm.selectYear}`
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
        item.tinNumber.toLowerCase().indexOf(query.toLowerCase()) !== -1
      ) {
        return item;
      } else return null;
    })
    .map(
      ({
        empPayrollId,
        employeePin,
        employeeName,
        tinNumber,
        proratedGrossSalary,
        taxPaye,
      }) => ({
        empPayrollId,
        employeePin,
        employeeName,
        tinNumber,
        proratedGrossSalary,
        taxPaye,
      })
    );

  return (
    <>
      <div className="flex justify-end items-center">
        <PdfButton
          path={`/HrPdfReport/tax/${dataForm.selectMonth}/${dataForm.selectYear}`}
        />
        <PrintHeader
          fileName={`taxpaye-${
            selectOptions.monthNames[dataForm.selectMonth - 1]
          }-${dataForm.selectYear}.csv`}
          data={data.map(
            ({
              employeePin,
              employeeName,
              tinNumber,
              proratedGrossSalary,
              taxPaye,
            }) => ({
              employeePin,
              employeeName,
              tinNumber,
              proratedGrossSalary,
              taxPaye,
            })
          )}
          headers={[
            { label: "Employee Pin", key: "employeePin" },
            { label: "Employee Name", key: "employeeName" },
            { label: "TIN Number", key: "tinNumber" },
            { label: "Prorated Gross Salary", key: "proratedGrossSalary" },
            { label: "Tax Payable", key: "taxPaye" },
          ]}
        />
      </div>
      <SearchHeader
        action={setQuery}
        placeholder="PIN / Name / Designation / Department / Branch"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-5 list-header">
          <ListHeader label="PIN" />
          <ListHeader label="Employee Name" />
          <ListHeader label="TIN Number" />
          <ListHeader label="Gross Salary" className="flex justify-end" />
          <ListHeader label="TAX Paye" className="flex justify-end" />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.empPayrollId}
              className="grid grid-cols-1 md:grid-cols-5 list-body"
            >
              <ListCol label="PIN :" value={item.employeePin} />
              <ListCol label="Employee Name : " value={item.employeeName} />
              <ListCol label="TIN Number : " value={item.tinNumber} />
              <ListCol
                label="Gross Payment : "
                value={item.proratedGrossSalary.toLocaleString("en-US")}
                className="flex justify-start md:justify-end"
              />
              <ListCol
                label="Tax Paye : "
                value={item.taxPaye.toLocaleString("en-US")}
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
    </>
  );
};

export default EmpPayrollTaxList;
