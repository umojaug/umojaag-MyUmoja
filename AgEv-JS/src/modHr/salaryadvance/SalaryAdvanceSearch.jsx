import React from "react";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import { ListHeader, ListCol } from "../../components/ListColWithHeader";
// import { format } from "date-fns";

const SalaryAdvanceSearch = ({ query }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("empSalaryAdvanceSearch", `/empSalaryAdvance/search/${query}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="list-wrapper text-xs">
      <div className="md:grid grid-cols-5 list-header gap-1">
        <ListHeader label="PIN" />
        <ListHeader label="Employee Name" />
        <ListHeader label="Loan Amount" className="flex justify-end" />
        <ListHeader
          label="Number of Installment"
          className="flex justify-end"
        />
      </div>
      {list.data.length > 0 &&
        list.data.map((item) => (
          <div
            key={item.empHistoryId}
            className="grid grid-cols-1 md:grid-cols-5 list-body gap-1"
          >
            <ListCol label="PIN : " value={item.employeePin} />
            <ListCol label="Employee Name : " value={item.employeeName} />
            <ListCol label="Loan Amount : " value={item.loanAmount} />
            <ListCol
              label="Number of Installment : "
              value={item.numberOfInstallment}
            />
          </div>
        ))}

      <div className="list-footer">
        <div className="col-span-10"></div>
        <div className="flex justify-center">
          <span className="font-semibold">Total : {list.data.length}</span>
        </div>
      </div>
    </div>
  );
};

export default SalaryAdvanceSearch;
