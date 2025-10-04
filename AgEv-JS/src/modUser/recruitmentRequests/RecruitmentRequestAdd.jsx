import React from "react";
import RecruitmentRequestForm from "./RecruitmentRequestForm";
import TopHeader from "../../components/TopHeader";

const RecruitmentRequestAdd = () => {
  const defaultValues = {
    recruitmentId: "",
    jobTitle: "",
    departmentId: "",
    startDate: "",
    staffTypeId: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="New Recruitment Request"
        btn="Return"
        path="/recruitment/list"
      />
      <RecruitmentRequestForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/recruitmentRequests/create"
        returnPath="/recruitment/list"
      />
    </div>
  );
};

export default RecruitmentRequestAdd;
