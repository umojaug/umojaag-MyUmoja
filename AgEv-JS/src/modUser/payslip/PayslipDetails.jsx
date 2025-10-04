import React from "react";
import PayslipRow from "./PayslipRow";
import { selectOptions } from "../../data/selectOptions";
import { format } from "date-fns";
import PdfButton from "../../components/button/PdfButton";
// import PrintButton from "../../components/button/PrintButton";

function PayslipDetails({ data }) {
  return (
    <div className="grid grid-cols-1 border border-black">
      <div className="text-md  px-2 grid grid-cols-1">
        <div className="flex justify-between py-2">
          <img className="h-8" src="/images/reportlogo.jpg" alt="logo" />
          <PdfButton path={`/HrPdfReport/Payslip/${data.empPayrollId}`} />
        </div>
        <span className="text-sm font-bold w-full text-center">PaySlip</span>
        <span className="text-sm font-semibold w-full text-center ">
          {data.companyName}
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full text-xs px-2 py-3">
          <div className="grid">
            <div className="">PIN : {data.employeePin}</div>
            <div className="">
              Date of Joining :
              {format(new Date(data.joiningDate), "dd/MMM/yyyy")}
            </div>
            <div className="">
              Pay Period : {selectOptions.monthNames[data.salaryMonth - 1]},{" "}
              {data.salaryYear}
            </div>
            <div className="">No. Of Days : {data.totalNoofDays}</div>
            <div className="">Branch : {data.branchName}</div>
            <div className="">Department : {data.departmentName}</div>
          </div>
          <div className="grid">
            <div className="">Name : {data.employeeName}</div>
            <div className="">Designation : {data.designationName}</div>
            <div className="">NSSF Number : {data.nssfNumber}</div>
            <div className="">Bank Name : {data.bankName}</div>
            <div className="">Bank A/C Number : {data.bankAccountNumber}</div>
            <div className="">TIN : {data.tinNumber}</div>
          </div>
        </div>
        <div className="text-xs border-y border-black grid grid-cols-3 w-full font-bold">
          <div className="px-2 py-0 border-r border-black col-span-2">
            Particulars
          </div>
          <div className="px-2 py-0">Amount</div>
        </div>
        {data.grossSalaryUsd > 0 && (
          <PayslipRow
            label="Gross Salary USD : "
            value={data.grossSalaryUsd.toLocaleString("en-US")}
            isBold={false}
          />
        )}
        <PayslipRow
          label="Gross Salary : "
          value={data.grossSalary.toLocaleString("en-US")}
          isBold={false}
        />
        <PayslipRow
          label="Prorated Gross : "
          value={Math.round(data.proratedGrossSalary, 0).toLocaleString(
            "en-US"
          )}
          isBold={false}
        />
        <PayslipRow
          label="LST : "
          value={data.lst.toLocaleString("en-US")}
          isBold={false}
        />
        <PayslipRow
          label="NSSF (5%) : "
          value={data.nssfEmployee.toLocaleString("en-US")}
          isBold={false}
        />
        <PayslipRow
          label="Pgs LST : "
          value={data.pgsLst.toLocaleString("en-US")}
          isBold={false}
        />
        <PayslipRow
          label="TAX PAYE : "
          value={data.taxPaye.toLocaleString("en-US")}
          isBold={false}
        />
        <PayslipRow
          label="Sacco Deduction : "
          value={data.saccoDeduction.toLocaleString("en-US")}
          isBold={false}
        />
        <PayslipRow
          label="Total Deduction : "
          value={data.totalDeduction.toLocaleString("en-US")}
          isBold={false}
        />
        <PayslipRow
          label="Sacco Payment : "
          value={data.saccoPayment.toLocaleString("en-US")}
          isBold={false}
        />
        <PayslipRow
          label="Advance Deductions : "
          value={data.advanceDeductions.toLocaleString("en-US")}
          isBold={false}
        />
        <PayslipRow
          label="Sacco Loan Re-Payment Deduction : "
          value={data.saccoLoanRePaymentDeduction.toLocaleString("en-US")}
          isBold={false}
        />
        <PayslipRow
          label="Net payment : "
          value={data.netPayment.toLocaleString("en-US")}
          isBold={true}
        />
        <PayslipRow
          label="Loss Deduction : "
          value={data.lostDeduction.toLocaleString("en-US")}
          isBold={false}
        />
        <PayslipRow
          label="NSSF (10%) : "
          value={data.nssfEmployer.toLocaleString("en-US")}
          isBold={false}
        />
        <PayslipRow
          label="NSSF Payable : "
          value={data.totalNssf.toLocaleString("en-US")}
          isBold={false}
        />
        <PayslipRow
          label="Trainee Arrears : "
          value={data.traineeArrears.toLocaleString("en-US")}
          isBold={false}
        />
        <div className="text-xs p-2 w-full text-center">
          This a system generated Payslip
        </div>
      </div>
    </div>
  );
}

export default PayslipDetails;
