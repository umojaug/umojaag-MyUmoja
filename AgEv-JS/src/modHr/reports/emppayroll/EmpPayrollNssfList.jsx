import React, { useState } from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { ListHeader, ListCol } from "../../../components/ListColWithHeader";
import PrintHeader from "../../../components/PrintHeader";
import { selectOptions } from "../../../data/selectOptions";
import SearchHeader from "../../../components/SearchHeader";
import PdfButton from "../../../components/button/PdfButton";

const EmpPayrollNssfList = ({ dataForm }) => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "emppayrollnssf",
    `/emppayroll/nssf/${dataForm.selectMonth}/${dataForm.selectYear}`
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
        item.nssfNumber.toLowerCase().indexOf(query.toLowerCase()) !== -1
      ) {
        return item;
      } else return null;
    })
    .map(
      ({
        empPayrollId,
        employeePin,
        employeeName,
        nssfNumber,
        proratedGrossSalary,
        nssfEmployee,
        nssfEmployer,
        totalNssf,
      }) => ({
        empPayrollId,
        employeePin,
        employeeName,
        nssfNumber,
        proratedGrossSalary,
        nssfEmployee,
        nssfEmployer,
        totalNssf,
      })
    );

  return (
    <>
      <div className="flex justify-end items-center">
        <PdfButton
          path={`/HrPdfReport/nssf/${dataForm.selectMonth}/${dataForm.selectYear}`}
        />
        <PrintHeader
          fileName={`nssf-${
            selectOptions.monthNames[dataForm.selectMonth - 1]
          }-${dataForm.selectYear}.csv`}
          data={data.map(
            ({
              employeePin,
              employeeName,
              nssfNumber,
              proratedGrossSalary,
              nssfEmployee,
              nssfEmployer,
              totalNssf,
            }) => ({
              employeePin,
              employeeName,
              nssfNumber,
              proratedGrossSalary,
              nssfEmployee,
              nssfEmployer,
              totalNssf,
            })
          )}
          headers={[
            { label: "Employee Pin", key: "employeePin" },
            { label: "Employee Name", key: "employeeName" },
            { label: "NSSF Number", key: "nssfNumber" },
            { label: "Prorated Gross Salary", key: "proratedGrossSalary" },
            { label: "NSSF Employee", key: "nssfEmployee" },
            { label: "NSSF Employer", key: "nssfEmployer" },
            { label: "Total NSSF", key: "totalNssf" },
          ]}
        />
      </div>
      <SearchHeader
        action={setQuery}
        placeholder="PIN / Name / Designation / Department / Branch"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-7 list-header">
          <ListHeader label="PIN" />
          <ListHeader label="Employee Name" />
          <ListHeader label="NSSF Number" />
          <ListHeader label="Gross Salary" className="flex justify-end" />
          <ListHeader label="NSSF Employee" className="flex justify-end" />
          <ListHeader label="NSSF Employer" className="flex justify-end" />
          <ListHeader label="Total Deposit" className="flex justify-end" />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.empPayrollId}
              className="grid grid-cols-1 md:grid-cols-7 list-body"
            >
              <ListCol label="PIN :" value={item.employeePin} />
              <ListCol label="Employee Name : " value={item.employeeName} />
              <ListCol label="NSSF Number : " value={item.nssfNumber} />
              <ListCol
                label="Gross Payment: "
                value={item.proratedGrossSalary.toLocaleString("en-US")}
                className="flex justify-start md:justify-end"
              />
              <ListCol
                label="Gross Payment: "
                value={item.nssfEmployee.toLocaleString("en-US")}
                className="flex justify-start md:justify-end"
              />
              <ListCol
                label="Gross Payment: "
                value={item.nssfEmployer.toLocaleString("en-US")}
                className="flex justify-start md:justify-end"
              />
              <ListCol
                label="Gross Payment: "
                value={item.totalNssf.toLocaleString("en-US")}
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

export default EmpPayrollNssfList;
