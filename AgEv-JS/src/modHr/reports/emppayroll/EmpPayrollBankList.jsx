import React, { useState } from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { ListHeader, ListCol } from "../../../components/ListColWithHeader";
import SearchHeader from "../../../components/SearchHeader";
import { AiOutlinePrinter } from "react-icons/ai";
import { GrDocumentCsv } from "react-icons/gr";

const EmpPayrollBankList = ({ dataForm }) => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "emppayrollbank",
    `/emppayroll/bank/${dataForm.selectMonth}/${dataForm.selectYear}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  const data = list.data
    .filter((item) => {
      if (query === "") {
        return item;
      } else if (
        item.employeeName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.bankAccountNumber.toLowerCase().indexOf(query.toLowerCase()) !==
          -1 ||
        item.bankName.toLowerCase().indexOf(query.toLowerCase()) !== -1
      ) {
        return item;
      } else return null;
    })
    .map(
      ({
        empPayrollId,
        bankName,
        bankAccountNumber,
        employeeName,
        netPayment,
      }) => ({
        empPayrollId,
        bankName,
        bankAccountNumber,
        employeeName,
        netPayment,
      })
    );

  return (
    <>
      <div className="flex justify-end items-center space-x-2">
        <a
          href={
            import.meta.env.VITE_REPORT_URL +
            `/banksheet?year=${dataForm.selectYear}&month=${dataForm.selectMonth}`
          }
        >
          <AiOutlinePrinter size={40} />
        </a>
        <a
          href={
            import.meta.env.VITE_REPORT_URL +
            `/banksheetnoformat?year=${dataForm.selectYear}&month=${dataForm.selectMonth}`
          }
        >
          <GrDocumentCsv size={40} />
        </a>
      </div>
      <SearchHeader
        action={setQuery}
        placeholder="PIN / Name / Designation / Department / Branch"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-4 list-header">
          <ListHeader label="Bank Name" />
          <ListHeader label="Account Number" />
          <ListHeader label="Employee Name" />
          <ListHeader label="Net Payment" className="flex justify-end" />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.empPayrollId}
              className="grid grid-cols-1 md:grid-cols-4 list-body"
            >
              <ListCol label="Bank Name:" value={item.bankName} />
              <ListCol
                label="Account Number: "
                value={item.bankAccountNumber}
              />
              <ListCol label="Employee Name: " value={item.employeeName} />
              <ListCol
                label="Net Payment: "
                value={item.netPayment.toLocaleString("en-US")}
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
      </div>{" "}
    </>
  );
};

export default EmpPayrollBankList;
