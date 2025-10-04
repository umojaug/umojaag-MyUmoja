import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import TopHeader from "../../components/TopHeader";
import { useGetData } from "../../hooks/dataApi";
import JobForm from "./JobForm";

const JobEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrjobs", `/jobs/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl mx-auto">
      <TopHeader title="Edit job" btn="Return" path="/hr/job/list" />
      <JobForm
        defaultValues={{
          jobId: list.data.jobId,
          departmentId: list.data.departmentId,
          companyId: list.data.companyId,
          title: list.data.title,
          section: list.data.section,
        }}
        action={refetch}
        btnText="Update"
        path="/Jobs/update"
        returnPath="/hr/job/list"
      />
    </div>
  );
};

export default JobEdit;
