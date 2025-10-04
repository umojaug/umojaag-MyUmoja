import React from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import EmployeeListSelect from "./EmployeeListSelect";

const EmployeeList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("employees", "/hrreports/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <EmployeeListSelect empData={list.data} />
    </div>
  );
};

export default EmployeeList;
