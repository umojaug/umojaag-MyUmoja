import React from "react";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import { useGetData } from "../../hooks/dataApi";
import { ListCol, ListHeader } from "../../components/ListColWithHeader";

const LeaveMyBalance = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("myleavebalance", "/myleave/balance");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div>
      <div className="flex justify-between px-0 pb-2 text-xl lg:text-2xl font-bold lg:text-semibold text-gray-600">
        Balance
      </div>
      <div className="list-wrapper">
        <div className="md:grid grid-cols-4 list-header">
          <ListHeader label="Leave Name" />
          <ListHeader label="Yearly Leave" />
          <ListHeader label="Availed" />
          <ListHeader label="Balance" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.bookId}
              className="grid grid-cols-1 md:grid-cols-4 list-body"
            >
              <ListCol label="Leave Name" value={item.leaveName} />
              <ListCol label="Yearly Leave" value={item.yearlyLeave} />
              <ListCol label="Availed" value={item.availed} />
              <ListCol label="Balance" value={item.balance} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default LeaveMyBalance;
