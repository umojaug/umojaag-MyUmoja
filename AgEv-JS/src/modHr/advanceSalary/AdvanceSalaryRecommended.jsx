import React from "react";
import { format } from "date-fns";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import { ListHeader, ListCol } from "../../components/ListColWithHeader";
import TopHeader from "../../components/TopHeader";
import TaskButton from "../../components/button/TaskButton";

const AdvanceSalaryRecommended = ({ query }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "empleaverecommendedlist",
    "/pendingAdvanceApplications/recommendedlist/"
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Advance Salary Recommended" />
      {/* <SearchHeader placeholder="PIN / Name" action={setQuery} /> */}
      <div className="list-wrapper">
        <div className="md:grid grid-cols-11 list-header">
          <ListHeader label="Branch" />
          <ListHeader label="Department" />
          <ListHeader label="PIN" />
          <ListHeader label="Employee Name" />
          <ListHeader label="Designation" />
          <ListHeader label="Amount" />
          <ListHeader label="Needed Date" />
          <ListHeader label="Purpose Of Advance" />
          <ListHeader label="Status" />
          <ListHeader label="Recommended By" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.empLeaveId}
              className="grid grid-cols-1 md:grid-cols-11 list-body"
            >
              <ListCol label="Branch :" value={item.branchName} />
              <ListCol label="Department : " value={item.departmentName} />
              <ListCol label="PIN : " value={item.employeePin} />
              <ListCol label="Employee Name : " value={item.employeeName} />
              <ListCol label="Employee Name : " value={item.designationName} />
              <ListCol
                label="Amount : "
                value={item.advanceAmount.toLocaleString()}
              />
              <ListCol
                label="Needed Advance Date : "
                value={format(new Date(item.neededAdvanceDate), "dd/MMM/yyyy")}
              />

              <ListCol
                label="Purpose Of Advance : "
                value={item.purposeOfAdvance}
              />
              <ListCol label="Status : " value={item.advanceStatus} />
              <ListCol label="Recommended By : " value={item.authorityName} />
              <div className="flex justify-end space-x-2">
                <TaskButton
                  path={`/hr/advance/recommended/comments/${item.advanceId}`}
                />
              </div>
            </div>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">Total : {list.data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvanceSalaryRecommended;
