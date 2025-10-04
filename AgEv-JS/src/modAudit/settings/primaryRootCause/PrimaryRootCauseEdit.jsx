import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import PrimaryRootCauseForm from "./PrimaryRootCauseForm";

const PrimaryRootCauseEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrDepartment", `/primaryRootCause/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Primary Root Cause"
        btn="Return"
        path="/audit/settings/primaryRootCause/list"
      />
      <PrimaryRootCauseForm
        defaultValues={{
          primaryRootCauseId: list.data.primaryRootCauseId,
          primaryRootCauseName: list.data.primaryRootCauseName,
        }}
        action={refetch}
        btnText="Update"
        path="/primaryRootCause/update"
        returnPath="/audit/settings/primaryRootCause/list"
      />
    </div>
  );
};

export default PrimaryRootCauseEdit;
