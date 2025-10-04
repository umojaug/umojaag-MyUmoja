import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";

import EducationForm from "./EducationForm";

const EducationEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrEducation", `/educations/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Education"
        btn="Return"
        path="/hr/settings/education/list"
      />
      <EducationForm
        defaultValues={{
          educationId: list.data.educationId,
          educationName: list.data.educationName,
        }}
        action={refetch}
        btnText="Update"
        path="/educations/update"
        returnPath="/hr/settings/education/list"
      />
    </div>
  );
};

export default EducationEdit;
