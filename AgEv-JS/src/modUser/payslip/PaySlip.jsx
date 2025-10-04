import React from "react";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import { useGetData } from "../../hooks/dataApi";
import PayslipDetails from "./PayslipDetails";

const PaySlip = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("payslipsstatement", "/payslips/statement");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <div className="flex justify-between px-0 pb-2">
        <div className="text-xl lg:text-2xl font-bold lg:text-semibold text-gray-600">
          My Payslip
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {list.data.length > 0 &&
          list.data.map((item) => (
            <PayslipDetails data={item} key={item.empPayrollId} />
          ))}
      </div>
    </div>
  );
};

export default PaySlip;
