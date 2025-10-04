import React, { useState } from "react";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import PrintHeader from "../../../components/PrintHeader";
import SearchHeader from "../../../components/SearchHeader";
import PdfButton from "../../../components/button/PdfButton";
import TopHeader from "../../../components/TopHeader";

const EmployeeMonthlyPosition = () => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("myleavebalance", "/hrreports/empMonthlyPosition");

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
      <TopHeader title="Month wise Employee position" />
      <div className="flex justify-end items-center">
        <PdfButton path="/HrPdfCommon/empMonthlyPosition" />
        <PrintHeader
          fileName="monthlyEmpPosition.csv"
          data={data.map(
            ({
              country,
              salaryYear,
              salaryMonth,
              female,
              male,
              notToSay,
              newJoin,
              countResign,
            }) => ({
              country,
              salaryYear,
              salaryMonth,
              female,
              male,
              notToSay,
              newJoin,
              countResign,
            })
          )}
          headers={[
            { label: "Country", key: "country" },
            { label: "Salary Year", key: "salaryYear" },
            { label: "Salary Month", key: "salaryMonth" },
            { label: "Female", key: "female" },
            { label: "Male", key: "male" },
            { label: "Not to Say", key: "notToSay" },
            { label: "New Join", key: "newJoin" },
            { label: "Resigned", key: "countResign" },
          ]}
        />
      </div>
      <SearchHeader
        action={setQuery}
        placeholder="PIN / Name / Designation / Department"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-8 list-header">
          <ListHeader label="Country" />
          <ListHeader label="Salary Year" />
          <ListHeader label="Salary Month" />
          <ListHeader label="Female" />
          <ListHeader label="Male" />
          <ListHeader label="Not To Say" />
          <ListHeader label="New Join" />
          <ListHeader label="Count Resign" />
        </div>
      </div>
      {data.length > 0 &&
        data.map((item) => (
          <div
            key={item.employeePin}
            className="grid grid-cols-1 md:grid-cols-8 list-body"
          >
            <ListCol label="Country : " value={item.country} />
            <ListCol label="Salary Year : " value={item.salaryYear} />
            <ListCol label="Salary Month : " value={item.salaryMonth} />
            <ListCol label="Female : " value={item.female} />
            <ListCol label="Male : " value={item.male} />
            <ListCol label="Not To Say : " value={item.notToSay} />
            <ListCol label="New Join : " value={item.newJoin} />
            <ListCol label="Count Resign : " value={item.countResign} />
          </div>
        ))}
      <div className="list-footer">
        <div className="col-span-10"></div>
        <div className="flex justify-center">
          <span className="font-semibold">Total : {data.length}</span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeMonthlyPosition;
