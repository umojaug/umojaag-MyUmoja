import React from "react";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import ToCsv from "../../components/ToCsv";
import { useGetData } from "../../hooks/dataApi";
import SaccoStatementDetails from "./SaccoStatementDetails";

const SaccoStatement = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("saccoslist", "/saccos/statement");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <div className="flex justify-between px-0 pb-2">
        <div className="text-xl lg:text-2xl font-bold lg:text-semibold text-gray-600">
          Sacco statement
        </div>
        <div className="flex space-x-5">
          <ToCsv data={list.data} filename="MySacco.csv" />
        </div>
      </div>
      {list.data.length > 0 && <SaccoStatementDetails data={list.data} />}
    </div>
  );
};

export default SaccoStatement;
