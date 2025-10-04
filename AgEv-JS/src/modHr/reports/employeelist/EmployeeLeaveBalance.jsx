import React, { useState } from "react";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import PrintHeader from "../../../components/PrintHeader";
import SearchHeader from "../../../components/SearchHeader";
import PdfButton from "../../../components/button/PdfButton";
import TopHeader from "../../../components/TopHeader";

const EmployeeLeaveBalance = () => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("myleavebalance", "/hrreports/leavebalance");

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
      <TopHeader title="Leave Balance" />
      <div className="flex justify-end items-center">
        <PdfButton path="/HrPdfCommon/leavebalance" />
        <PrintHeader
          fileName="leavebalance.csv"
          data={data.map(
            ({
              branchName,
              departmentName,
              employeePin,
              employeeName,
              designationName,
              ale,
              al,
              comp,
              mtl,
              pat,
              sl,
              stu,
            }) => ({
              branchName,
              departmentName,
              employeePin,
              employeeName,
              designationName,
              ale,
              al,
              comp,
              mtl,
              pat,
              sl,
              stu,
            })
          )}
          headers={[
            { label: "Branch Name", key: "branchName" },
            { label: "Department Name", key: "departmentName" },
            { label: "Employee Pin", key: "employeePin" },
            { label: "Employee Name", key: "employeeName" },
            { label: "Designation", key: "designationName" },
            { label: "ALE", key: "ale" },
            { label: "AL", key: "al" },
            { label: "Comp", key: "comp" },
            { label: "MTL", key: "mtl" },
            { label: "PAT", key: "pat" },
            { label: "SL", key: "sl" },
            { label: "STU", key: "stu" },
          ]}
        />
      </div>
      <SearchHeader
        action={setQuery}
        placeholder="PIN / Name / Designation / Department / Branch"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-8 list-header">
          <ListHeader label="Branch" />
          <ListHeader label="Department" />
          <ListHeader label="Employee PIN" />
          <ListHeader label="Employee Name" />
          <ListHeader label="Designation" />
          <div className="grid grid-cols-1 md:grid-cols-7 col-span-3">
            <ListHeader label="ALE" />
            <ListHeader label="AL" />
            <ListHeader label="Comp" />
            <ListHeader label="MTL" />
            <ListHeader label="Pat" />
            <ListHeader label="SL" />
            <ListHeader label="Stu" />
          </div>
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.employeePin}
              className="grid grid-cols-1 md:grid-cols-8 list-body"
            >
              <ListCol label="Branch : " value={item.branchName} />
              <ListCol label="Department : " value={item.departmentName} />
              <ListCol label="Employee PIN : " value={item.employeePin} />
              <ListCol label="Employee Name : " value={item.employeeName} />
              <ListCol label="Designation : " value={item.designationName} />
              <div className="grid grid-cols-1 md:grid-cols-7  col-span-3">
                <ListCol label="ALE : " value={item.ale} />
                <ListCol label="AL : " value={item.al} />
                <ListCol label="Comp : " value={item.comp} />
                <ListCol label="MTL : " value={item.mtl} />
                <ListCol label="Pat : " value={item.pat} />
                <ListCol label="SL : " value={item.sl} />
                <ListCol label="Stu : " value={item.stu} />
              </div>
            </div>
          ))}
        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">Total : {data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLeaveBalance;
