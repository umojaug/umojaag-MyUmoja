import React from "react";
import { useParams } from "react-router-dom";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import JobFeedBack from "./JobFeedBack";
import TopHeader from "../../../components/TopHeader";

const JobApplyDetails = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData("hrjobs", `/jobs/ApplyJobDetails/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div>
      <div className="card w-full max-w-screen-xl mx-auto">
        <TopHeader title="Job Apply Details " />
        <div className="grid grid-cols-1 gap-1">
          <div className="">Name : {list.data.fullName}</div>
          <div className="">Email : {list.data.email}</div>
          <div className="">Country : {list.data.companyName}</div>
          <div className="">Department : {list.data.departmentName}</div>
        </div>
        <JobFeedBack
          jobApplyId={list.data.jobApplyId}
          email={list.data.email}
        />
      </div>
    </div>
  );
};

export default JobApplyDetails;
