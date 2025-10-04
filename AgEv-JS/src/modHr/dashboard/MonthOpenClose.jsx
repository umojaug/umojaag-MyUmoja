import React from "react";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";

const MonthOpenClose = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData("HrMonthClose", "/hrMonthClose/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div>
      <p className="font-medium text-xs md:text-base leading-0">
        Current Month:{" "}
        <span className="text-green-600">{list.data.firstDayOfOpenMonth}</span>
      </p>
    </div>
  );
};

export default MonthOpenClose;
