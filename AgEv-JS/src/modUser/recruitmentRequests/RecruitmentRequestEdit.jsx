import React from "react";
import { useParams } from "react-router-dom";
import RecruitmentRequestForm from "./RecruitmentRequestForm";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import TopHeader from "../../components/TopHeader";

const RecruitmentRequestEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("recruitmentRequest", `/recruitmentRequests/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Recruitment Request"
        btn="Return"
        path="/recruitment/list"
      />
      <RecruitmentRequestForm
        defaultValues={{
          recruitmentId: list.data.recruitmentId,
          jobTitle: list.data.jobTitle,
          departmentId: list.data.departmentId,
          startDate: list.data.startDate,
          staffTypeId: list.data.staffTypeId,
        }}
        action={refetch}
        btnText="Update"
        path="/recruitmentRequests/update"
        returnPath="/recruitment/list"
      />
    </div>
  );
};

export default RecruitmentRequestEdit;
