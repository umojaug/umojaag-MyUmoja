import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../components/TopHeader";
import LeaveForm from "./LeaveForm";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";

const LeaveEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("settingLeave", `/leaves/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Leave"
        btn="Return"
        path="/hr/settings/leave/list"
      />
      <LeaveForm
        defaultValues={{
          leaveId: list.data.leaveId,
          leaveName: list.data.leaveName,
          shortCode: list.data.shortCode,
          yearlyLeave: list.data.yearlyLeave,
        }}
        action={refetch}
        btnText="Update"
        path="/leaves/update"
        returnPath="/hr/settings/leave/list"
      />
    </div>
  );
};

export default LeaveEdit;
