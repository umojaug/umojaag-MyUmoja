import React, { useState } from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { ListHeader, ListCol } from "../../../components/ListColWithHeader";
import PrintHeader from "../../../components/PrintHeader";
import PrintButton from "../../../components/button/PrintButton";
import { selectOptions } from "../../../data/selectOptions";
import { AiOutlineUserAdd, AiOutlineTeam } from "react-icons/ai";
import SearchHeader from "../../../components/SearchHeader";
import { format } from "date-fns";
import EmailButton from "../../../components/button/EmailButton";

const EmpSalaryList = ({ dataForm }) => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "emppayrollsalary",
    `/emppayroll/salary/${dataForm.selectMonth}/${dataForm.selectYear}`
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
        item.staffStatus.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.designationName.toLowerCase().indexOf(query.toLowerCase()) !== -1
      ) {
        return item;
      } else return null;
    })
    .map(
      ({
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
        bonus,
        grossWithBonus,
        lst,
        pgsLst,
        othersAllowance,
        nssfEmployee,
        taxPaye,
        saccoDeduction,
        totalDeduction,
        saccoPayment,
        advanceDeductions,
        saccoLoanRePaymentDeduction,
        netPayment,
        salaryRefund,
        lostDeduction,
        nssfEmployer,
        traineeArrears,
        totalNssf,
        stopPayment,
        stopParticulars,
        staffStatus,
      }) => ({
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
        bonus,
        grossWithBonus,
        lst,
        pgsLst,
        othersAllowance,
        nssfEmployee,
        taxPaye,
        saccoDeduction,
        totalDeduction,
        saccoPayment,
        advanceDeductions,
        saccoLoanRePaymentDeduction,
        netPayment,
        salaryRefund,
        lostDeduction,
        nssfEmployer,
        traineeArrears,
        totalNssf,
        stopPayment,
        stopParticulars,
        staffStatus,
      })
    );

  return (
    <>
      <div className="flex justify-end space-x-1">
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => (query === "New" ? setQuery("") : setQuery("New"))}
            className="px-2 transition hover:-translate-y-1"
          >
            {query === "New" ? (
              <AiOutlineTeam size={40} />
            ) : (
              <AiOutlineUserAdd size={40} />
            )}
          </button>
          <EmailButton
            path={`/EmpPayroll/EmailPayslip/${dataForm.selectMonth}/${dataForm.selectYear}`}
            size={40}
          />
          <PrintButton
            path={`/salarysheet?year=${dataForm.selectYear}&month=${dataForm.selectMonth}`}
          />
        </div>
        <PrintHeader
          fileName={`salarysheet-${
            selectOptions.monthNames[dataForm.selectMonth - 1]
          }-${dataForm.selectYear}.csv`}
          data={data.map(
            ({
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
              bonus,
              grossWithBonus,
              lst,
              pgsLst,
              othersAllowance,
              nssfEmployee,
              taxPaye,
              saccoDeduction,
              totalDeduction,
              saccoPayment,
              advanceDeductions,
              saccoLoanRePaymentDeduction,
              netPayment,
              salaryRefund,
              lostDeduction,
              nssfEmployer,
              traineeArrears,
              totalNssf,
              stopPayment,
              stopParticulars,
              staffStatus,
            }) => ({
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
              bonus,
              grossWithBonus,
              lst,
              pgsLst,
              othersAllowance,
              nssfEmployee,
              taxPaye,
              saccoDeduction,
              totalDeduction,
              saccoPayment,
              advanceDeductions,
              saccoLoanRePaymentDeduction,
              netPayment,
              salaryRefund,
              lostDeduction,
              nssfEmployer,
              traineeArrears,
              totalNssf,
              stopPayment,
              stopParticulars,
              staffStatus,
            })
          )}
          headers={[
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
            { label: "Bonus", key: "bonus" },
            { label: "Gross with Bonus", key: "grossWithBonus" },
            { label: "LST", key: "lst" },
            { label: "PGS LST", key: "pgsLst" },
            { label: "Others Allowance", key: "othersAllowance" },
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
            { label: "Salary Refund", key: "salaryRefund" },
            { label: "Lost Deduction", key: "lostDeduction" },
            { label: "NSSF Employer", key: "nssfEmployer" },
            { label: "Trainee Arrears", key: "traineeArrears" },
            { label: "Total NSSF", key: "totalNssf" },
            { label: "Stop Payment", key: "stopPayment" },
            { label: "Stop Particulars", key: "stopParticulars" },
            { label: "Staff Status", key: "staffStatus" },
          ]}
        />
      </div>
      <SearchHeader
        action={setQuery}
        placeholder="PIN / Name / Designation / Department / Branch"
      />
      <div className="list-wrapper text-xs">
        <div className="md:grid grid-cols-12 list-header gap-1">
          <ListHeader label="Branch" />
          <ListHeader label="Department" />
          <ListHeader label="PIN" />
          <ListHeader label="Employee Name" />
          <ListHeader label="Designation" />
          <ListHeader label="Joining Date" />
          <ListHeader label="Gross Salary" className="flex justify-end" />
          <ListHeader label="Total No of Days" className="flex justify-end" />
          <ListHeader
            label="Prorated Gross Salary"
            className="flex justify-end"
          />
          <ListHeader label="Total Deduction" className="flex justify-end" />
          <ListHeader label="Net Payment" className="flex justify-end" />
          <ListHeader label="Trainee Arrears" className="flex justify-end" />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.employeePin}
              className="grid grid-cols-1 md:grid-cols-12 list-body gap-1"
            >
              <ListCol label="Branch :" value={item.branchName} />
              <ListCol label="Department : " value={item.departmentName} />
              <ListCol label="PIN :" value={item.employeePin} />
              <ListCol
                label="Employee Name : "
                value={item.employeeName}
                className={`${
                  item.staffStatus === "New" &&
                  "bg-yellow-400 py-1 px-2 rounded-lg"
                }`}
              />
              <ListCol label="Designation : " value={item.designationName} />
              <ListCol
                label="Joining Date: "
                value={format(new Date(item.joiningDate), "dd/MMM/yyyy")}
              />
              <ListCol
                label="Gross Salary : "
                value={item.grossSalary.toLocaleString("en-US")}
                className={`flex justify-start md:justify-end ${
                  item.grossSalary === 0 && "bg-teal-400 py-1 px-2 rounded-lg"
                }`}
              />
              <ListCol
                label="Total No of Days : "
                value={item.totalNoofDays}
                className="flex justify-start md:justify-end"
              />
              <ListCol
                label="Prorated Gross Salary : "
                value={item.proratedGrossSalary.toLocaleString("en-US")}
                className={`flex justify-start md:justify-end ${
                  item.proratedGrossSalary === 0 &&
                  "bg-teal-400 py-1 px-2 rounded-lg"
                }`}
              />
              <ListCol
                label="Total Deduction : "
                value={item.totalDeduction.toLocaleString("en-US")}
                className="flex justify-start md:justify-end"
              />
              <ListCol
                label="Net Payment : "
                value={item.netPayment.toLocaleString("en-US")}
                className={`flex justify-start md:justify-end ${
                  item.stopPayment && "bg-red-400 py-1 px-2 rounded-lg"
                }`}
              />
              <ListCol
                label="Trainee Arrears : "
                value={item.traineeArrears.toLocaleString("en-US")}
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
      <div className="grid grid-cols-1 md:w-1/3 mt-2">
        <span className="font-bold p-2">Note : </span>
        <span className="bg-yellow-400 rounded-t-lg p-2">
          New Staff : Yellow
        </span>
        <span className="bg-red-400 p-2">Stop Salary : Red</span>
        <span className="bg-teal-400 rounded-b-lg p-2">
          Gross Salary Missing : Teal
        </span>
      </div>
    </>
  );
};

export default EmpSalaryList;
