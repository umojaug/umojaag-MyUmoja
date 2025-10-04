import React from "react";
import TopHeader from "../../components/TopHeader";
import JobForm from "./JobForm";

const JobAdd = () => {
  const defaultValues = {
    jobId: "",
    departmentId: "",
    companyId: "",
    title: "",
    section: "",
  };
  return (
    <div className="card w-full max-w-screen-xl mx-auto">
      <TopHeader
        title="Job Opportunities Create"
        btn="Return"
        path="/hr/job/list"
      />
      <JobForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/jobs/create"
        returnPath="/hr/job/list"
      />
    </div>
  );
};

export default JobAdd;
