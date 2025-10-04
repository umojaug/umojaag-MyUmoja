import React, { useState } from "react";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import { ListHeader, ListCol } from "../../components/ListColWithHeader";
import SearchHeader from "../../components/SearchHeader";
import DeleteButton from "../../components/button/DeleteButton";
import TopHeader from "../../components/TopHeader";
import { selectOptions } from "../../data/selectOptions";

const EmpSalaryStopList = () => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("emppayrollsalarystoplist", `/EmpParyrollStop/list`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  const data = list.data
    .filter((item) => {
      if (query === "") {
        return item;
      } else if (
        item.employeePin.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.employeeName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.branchName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.departmentName.toLowerCase().indexOf(query.toLowerCase()) !== -1
      ) {
        return item;
      } else return null;
    })
    .map(
      ({
        empPayrollStopId,
        salaryYear,
        salaryMonth,
        branchName,
        departmentName,
        employeePin,
        employeeName,
        designationName,
        stopParticulars,
      }) => ({
        empPayrollStopId,
        salaryYear,
        salaryMonth,
        branchName,
        departmentName,
        employeePin,
        employeeName,
        designationName,
        stopParticulars,
      })
    );

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Stop Salary Payment List"
        btn="Save"
        path="/hr/salary/stop/add"
      />
      <SearchHeader
        action={setQuery}
        placeholder="PIN / Name / Designation / Department / Branch"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-8 list-header gap-1">
          <ListHeader label="Branch" />
          <ListHeader label="Department" />
          <ListHeader label="PIN" />
          <ListHeader label="Employee Name" />
          <ListHeader label="Designation" />
          <ListHeader label="Month, Year" />
          <ListHeader label="Stop Reason" />
          <ListHeader label="" />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.empPayrollStopId}
              className="grid grid-cols-1 md:grid-cols-8 list-body gap-x-2"
            >
              <ListCol label="Branch :" value={item.branchName} />
              <ListCol label="Department : " value={item.departmentName} />
              <ListCol label="PIN :" value={item.employeePin} />
              <ListCol label="Employee Name : " value={item.employeeName} />
              <ListCol label="Designation : " value={item.designationName} />
              <ListCol
                label="Month, Year : "
                value={
                  selectOptions.monthNames[item.salaryMonth - 1] +
                  ", " +
                  item.salaryYear
                }
              />
              <ListCol label="Stop Reason : " value={item.stopParticulars} />
              <div>
                <div className="flex justify-end space-x-2">
                  <DeleteButton
                    action={refetch}
                    path={`/empparyrollstop/delete/${item.empPayrollStopId}`}
                  />
                </div>
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

export default EmpSalaryStopList;
