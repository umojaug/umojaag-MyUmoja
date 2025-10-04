import React from "react";
import { format } from "date-fns";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import { ListHeader, ListCol } from "../../components/ListColWithHeader";
import EditButton from "../../components/button/EditButton";
import TopHeader from "../../components/TopHeader";
import { AiOutlineFile } from "react-icons/ai";

const LeaveRecommended = ({ query }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("empleaverecommendedlist", "/empleave/recommendedlist/");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Leave Application Recommended" />

      <div className="list-wrapper">
        <div className="md:grid grid-cols-12 list-header">
          <ListHeader label="Branch" />
          <ListHeader label="Department" />
          <ListHeader label="PIN" />
          <ListHeader label="Employee Name" />
          <ListHeader label="Designation" />
          <ListHeader label="Leave Type" />
          <ListHeader label="From Date" />
          <ListHeader label="Till Date" />
          <ListHeader label="Particulars" />
          <ListHeader label="Status" />
          <ListHeader label="Recommended By" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.empLeaveId}
              className="grid grid-cols-1 md:grid-cols-12 list-body"
            >
              <ListCol label="Branch :" value={item.branchName} />
              <ListCol label="Department : " value={item.departmentName} />
              <ListCol label="PIN : " value={item.employeePin} />
              <ListCol label="Employee Name : " value={item.employeeName} />
              <ListCol label="Designation : " value={item.designationName} />
              <ListCol label="Leave Type : " value={item.leaveName} />
              <ListCol
                label="From Date : "
                value={format(new Date(item.fromDate), "dd/MMM/yyyy")}
              />
              <ListCol
                label="Till Date : "
                value={format(new Date(item.tillDate), "dd/MMM/yyyy")}
              />
              <ListCol label="Particulars : " value={item.particulars} />
              <ListCol label="Status : " value={item.leaveStatus} />
              <ListCol label="Recommended By : " value={item.authorityName} />
              <div className="flex justify-end space-x-2">
                {item.fileUrl !== "" ? (
                  <a href={item.fileUrl} className="btn-success w-12 h-10">
                    <AiOutlineFile size={24} />
                  </a>
                ) : (
                  <></>
                )}
                <EditButton path={`/hr/leave/comments/${item.empLeaveId}`} />
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

export default LeaveRecommended;
