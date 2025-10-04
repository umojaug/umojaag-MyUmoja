import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import SearchHeader from "../../../components/SearchHeader";
import ToCsv from "../../../components/ToCsv";
import { useGetData } from "../../../hooks/dataApi";
import SaccoStatementDetails from "../../../modUser/sacco/SaccoStatementDetails";

const EmpPayrollSaccoDetails = () => {
  const [query, setQuery] = useState("");
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("saccoslist", `/saccos/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data.filter((item) => {
    if (query === "") {
      return item;
    } else if (
      item.employeePin.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.employeeName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.branchName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.departmentName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.designationName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    ) {
      return item;
    } else return null;
  });

  return (
    <div className="card w-full max-w-screen-xl">
      <div className="flex justify-between px-0 pb-2">
        <div className="text-xl lg:text-2xl font-bold lg:text-semibold text-gray-600">
          Sacco statement
        </div>
        <div className="flex space-x-5">
          <ToCsv data={data} filename="MySacco.csv" />
        </div>
      </div>
      <SearchHeader
        action={setQuery}
        placeholder="PIN / Name / Designation / Department / Branch"
      />
      {data.length > 0 && <SaccoStatementDetails data={data} />}
    </div>
  );
};

export default EmpPayrollSaccoDetails;
