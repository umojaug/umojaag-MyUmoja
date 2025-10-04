import React from "react";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import { format } from "date-fns";

const CurrentOpenMonth = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData("empPayrollCurrentOpenMonth", "/empPayroll/currentOpenMonth");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;
  return (
    <p className="font-bold text-green-700">
      Open Month:
      {format(new Date(list.data.firstDayOfOpenMonth), "MMM-yyyy")}
    </p>
  );
};

export default CurrentOpenMonth;
