import React, { useState } from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { ListHeader, ListCol } from "../../../components/ListColWithHeader";
import SearchHeader from "../../../components/SearchHeader";
import PrintHeader from "../../../components/PrintHeader";
import EditButton from "../../../components/button/EditButton";
import { format } from "date-fns";
import PdfButton from "../../../components/button/PdfButton";
import RamdomButton from "../../../components/button/RamdomButton";
import RamdomButtonBool from "../../../components/button/RamdomButtonBool";

const EmpPayrollSaccoList = ({ dataForm }) => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "employees",
    `/emppayroll/sacco/${dataForm.fromDate}/${dataForm.tillDate}`
  );

  if (isLoading) return <HashLoading />;
  if (isError) return <Error message={error?.message} />;

  const principleRisks = [...new Set(list.data.map((x) => x.isActive))];

  const data = list.data.filter((item) => {
    const searchQuery = String(query || "").toLowerCase();

    if (searchQuery === "active") {
      return item.isActive === true;
    }

    if (searchQuery === "resigned") {
      return item.isActive === false;
    }

    return (
      String(item.employeePin || "")
        .toLowerCase()
        .includes(searchQuery) ||
      String(item.employeeName || "")
        .toLowerCase()
        .includes(searchQuery) ||
      String(item.branchName || "")
        .toLowerCase()
        .includes(searchQuery) ||
      String(item.departmentName || "")
        .toLowerCase()
        .includes(searchQuery) ||
      String(item.designationName || "")
        .toLowerCase()
        .includes(searchQuery)
    );
  });

  const sumOpening = data.reduce(
    (sum, item) => sum + (Number(item.openingBalance) || 0),
    0
  );
  const sumClosing = data.reduce(
    (sum, item) => sum + (Number(item.closingBalance) || 0),
    0
  );
  const sumTransaction = data.reduce(
    (sum, item) => sum + (Number(item.transactionBalance) || 0),
    0
  );

  return (
    <div>
      <div className="flex justify-end items-center">
        <PdfButton path={`/HrPdfCommon/sacco`} />
        <PrintHeader
          fileName="sacco.csv"
          data={data.map(
            ({
              branchName,
              departmentName,
              employeePin,
              employeeName,
              designationName,
              contactNumber,
              isActive,
              openingBalance,
              closingBalance,
              transactionBalance,
            }) => ({
              branchName,
              departmentName,
              employeePin,
              employeeName,
              designationName,
              contactNumber: `\t${contactNumber}`,
              isActive,
              openingBalance,
              closingBalance,
              transactionBalance,
            })
          )}
          headers={[
            { label: "Branch Name", key: "branchName" },
            { label: "Department Name", key: "departmentName" },
            { label: "Employee Pin", key: "employeePin" },
            { label: "Employee Name", key: "employeeName" },
            { label: "Designation Name", key: "designationName" },
            { label: "Contact Number", key: "contactNumber" },
            { label: "Opening Balance", key: "openingBalance" },
            { label: "Closing Balance", key: "closingBalance" },
            { label: "Transaction Balance", key: "transactionBalance" },
          ]}
        />
      </div>

      <SearchHeader
        action={setQuery}
        placeholder="PIN / Name / Designation / Department / Branch"
      />

      <RamdomButtonBool principleRisks={principleRisks} action={setQuery} />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-12 list-header">
          <ListHeader label="Branch" />
          <ListHeader label="Department" />
          <ListHeader label="PIN" />
          <ListHeader label="Employee Name" />
          <ListHeader label="Joining Date" />
          <ListHeader label="Designation" />
          <ListHeader label="Contact Number" />
          <ListHeader label="Status " />
          <ListHeader label="Opening " className="flex justify-end" />
          <ListHeader label="Transaction" className="flex justify-end" />
          <ListHeader label="Closing" className="flex justify-end" />
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
                label="Joining Date: "
                value={format(new Date(item.joiningDate), "dd/MMM/yyyy")}
              />
              <ListCol label="Designation: " value={item.designationName} />
              <ListCol label="Contact Number: " value={item.contactNumber} />
              <ListCol
                label="Status: "
                value={item.isActive ? "Active" : "Resigned"}
              />
              <ListCol
                label="Opening: "
                value={item.openingBalance.toLocaleString("en-US")}
                className="flex justify-start md:justify-end"
              />
              <ListCol
                label="Transaction: "
                value={item.transactionBalance.toLocaleString("en-US")}
                className="flex justify-start md:justify-end"
              />
              <ListCol
                label="Closing: "
                value={item.closingBalance.toLocaleString("en-US")}
                className="flex justify-start md:justify-end"
              />
              <div className="flex justify-end">
                <EditButton
                  path={`/hr/reports/payroll/sacco/${item.employeeId}`}
                />
              </div>
            </div>
          ))}

        <div className="list-footer font-bold grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-8 flex items-center">
            <span>Total Transactions: {list.data.length}</span>
          </div>
          <div className="md:col-span-1 flex justify-end">
            <span> {sumOpening.toLocaleString("en-US")}</span>
          </div>
          <div className="md:col-span-1 flex justify-end">
            <span> {sumTransaction.toLocaleString("en-US")}</span>
          </div>
          <div className="md:col-span-1 flex justify-end">
            <span> {sumClosing.toLocaleString("en-US")}</span>
          </div>
          <div className="md:col-span-1 flex justify-end"></div>
        </div>
      </div>
    </div>
  );
};

export default EmpPayrollSaccoList;
