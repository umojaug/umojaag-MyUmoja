import React, { useState } from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { ListHeader, ListCol } from "../../../components/ListColWithHeader";
import { format } from "date-fns";
import SearchHeader from "../../../components/SearchHeader";
import PrintHeader from "../../../components/PrintHeader";
import { selectOptions } from "../../../data/selectOptions";
import PdfButton from "../../../components/button/PdfButton";
import TopHeader from "../../../components/TopHeader";

const StopSalaryPaid = () => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("emppayrollsalarystoplist", "/emppayroll/stopSalaryPaid");

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
        item.staffStatus.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.designationName.toLowerCase().indexOf(query.toLowerCase()) !== -1
      ) {
        return item;
      } else return null;
    })
    .map(
      ({
        empPayrollId,
        salaryYear,
        salaryMonth,
        branchName,
        departmentName,
        employeePin,
        employeeName,
        designationName,
        joiningDate,
        grossSalaryUsd,
        grossSalary,
        totalNoofDays,
        proratedGrossSalary,
        nssfEmployee,
        taxPaye,
        saccoDeduction,
        totalDeduction,
        saccoPayment,
        advanceDeductions,
        saccoLoanRePaymentDeduction,
        netPayment,
        nssfEmployer,
        traineeArrears,
        totalNssf,
        stopParticulars,
      }) => ({
        empPayrollId,
        salaryYear,
        salaryMonth,
        branchName,
        departmentName,
        employeePin,
        employeeName,
        designationName,
        joiningDate,
        grossSalaryUsd,
        grossSalary,
        totalNoofDays,
        proratedGrossSalary,
        nssfEmployee,
        taxPaye,
        saccoDeduction,
        totalDeduction,
        saccoPayment,
        advanceDeductions,
        saccoLoanRePaymentDeduction,
        netPayment,
        nssfEmployer,
        traineeArrears,
        totalNssf,
        stopParticulars,
      })
    );

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Stop Salary Paid" />
      <div className="flex justify-end items-center">
        <PdfButton path={`/HrPdfReport/stopSalaryPaid`} />
        <PrintHeader
          fileName="StopSalaryPaid.csv"
          data={data.map(
            ({
              salaryYear,
              salaryMonth,
              branchName,
              departmentName,
              employeePin,
              employeeName,
              designationName,
              joiningDate,
              grossSalaryUsd,
              grossSalary,
              totalNoofDays,
              proratedGrossSalary,
              nssfEmployee,
              taxPaye,
              saccoDeduction,
              totalDeduction,
              saccoPayment,
              advanceDeductions,
              saccoLoanRePaymentDeduction,
              netPayment,
              nssfEmployer,
              traineeArrears,
              totalNssf,
              stopParticulars,
            }) => ({
              salaryYear,
              salaryMonth,
              branchName,
              departmentName,
              employeePin,
              employeeName,
              designationName,
              joiningDate: format(new Date(joiningDate), "dd/MMM/yyyy"),
              grossSalaryUsd,
              grossSalary,
              totalNoofDays,
              proratedGrossSalary,
              nssfEmployee,
              taxPaye,
              saccoDeduction,
              totalDeduction,
              saccoPayment,
              advanceDeductions,
              saccoLoanRePaymentDeduction,
              netPayment,
              nssfEmployer,
              traineeArrears,
              totalNssf,
              stopParticulars,
            })
          )}
          headers={[
            { label: "Salary Year", key: "salaryYear" },
            { label: "Salary Month", key: "salaryMonth" },
            { label: "Branch Name", key: "branchName" },
            { label: "Department Name", key: "departmentName" },
            { label: "Employee Pin", key: "employeePin" },
            { label: "Employee Name", key: "employeeName" },
            { label: "Designation Name", key: "designationName" },
            { label: "Joining Date", key: "joiningDate" },
            { label: "Gross Salary (USD)", key: "grossSalaryUsd" },
            { label: "Gross Salary", key: "grossSalary" },
            { label: "Total No. of Days", key: "totalNoofDays" },
            { label: "Prorated Gross Salary", key: "proratedGrossSalary" },
            { label: "NSSF Employee", key: "nssfEmployee" },
            { label: "Tax Payable", key: "taxPaye" },
            { label: "Sacco Deduction", key: "saccoDeduction" },
            { label: "Total Deduction", key: "totalDeduction" },
            { label: "Sacco Payment", key: "saccoPayment" },
            { label: "Advance Deductions", key: "advanceDeductions" },
            {
              label: "Sacco Loan Repayment Deduction",
              key: "saccoLoanRePaymentDeduction",
            },
            { label: "Net Payment", key: "netPayment" },
            { label: "NSSF Employer", key: "nssfEmployer" },
            { label: "Trainee Arrears", key: "traineeArrears" },
            { label: "Total NSSF", key: "totalNssf" },
            { label: "Stop Particulars", key: "stopParticulars" },
          ]}
        />
      </div>
      <SearchHeader
        action={setQuery}
        placeholder="PIN / Name / Designation / Department / Branch"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-9 list-header gap-1">
          <ListHeader label="Branch" />
          <ListHeader label="Department" />
          <ListHeader label="PIN" />
          <ListHeader label="Employee Name" />
          <ListHeader label="Designation" />
          <ListHeader label="Joining Date" />
          <ListHeader label="Month, Year" />
          <ListHeader label="Net Payment" className="flex justify-end" />
          <ListHeader label="Stop Reason" className="flex justify-end" />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.empPayrollId}
              className="grid grid-cols-1 md:grid-cols-9 list-body gap-x-2"
            >
              <ListCol label="Branch :" value={item.branchName} />
              <ListCol label="Department : " value={item.departmentName} />
              <ListCol label="PIN :" value={item.employeePin} />
              <ListCol label="Employee Name : " value={item.employeeName} />
              <ListCol label="Designation : " value={item.designationName} />
              <ListCol
                label="Joining Date: "
                value={format(new Date(item.joiningDate), "dd/MMM/yyyy")}
              />
              <ListCol
                label="Month, Year : "
                value={
                  selectOptions.monthNames[item.salaryMonth - 1] +
                  ", " +
                  item.salaryYear
                }
              />
              <ListCol
                label="Net Payment : "
                value={item.netPayment.toLocaleString("en-US")}
                className="flex justify-start md:justify-end"
              />
              <ListCol
                label="Stop Reason : "
                value={item.stopParticulars}
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
    </div>
  );
};

export default StopSalaryPaid;
