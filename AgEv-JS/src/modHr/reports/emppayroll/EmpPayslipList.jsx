import React from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import PayslipDetails from "../../../modUser/payslip/PayslipDetails";

const EmpPayslipList = ({ dataForm }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "emppayrollPayslip",
    `/emppayroll/Payslip/${dataForm.searchByPinName}/${dataForm.selectMonth}/${dataForm.selectYear}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <>
      {/* <PrintHeader
        fileName={`payslip-${
          selectOptions.monthNames[dataForm.selectMonth - 1]
        }-${dataForm.selectYear}.csv`}
        data={list.data.map(
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
      /> */}

      <div className="list-wrapper">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {list.data.length > 0 &&
            list.data.map((item) => (
              <PayslipDetails data={item} key={item.empPayrollId} />
            ))}
        </div>

        {/* <div className="md:grid grid-cols-5 list-header">
          <ListHeader label="PIN" />
          <ListHeader label="Employee Name" />
          <ListHeader label="TIN Number" />
          <ListHeader label="Gross Salary" className="flex justify-end" />
          <ListHeader label="TAX Paye" className="flex justify-end" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
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
            <span className="font-semibold">Total : {list.data.length}</span>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default EmpPayslipList;
