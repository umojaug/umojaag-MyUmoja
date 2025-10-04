import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import WeightageForm from "./WeightageForm";

const WeightageEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("auditWeightage", `/auditweightage/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Weightage"
        btn="Return"
        path="/audit/settings/weightage/list"
      />
      <WeightageForm
        defaultValues={{
          weightageId: list.data.weightageId,
          weightageName: list.data.weightageName,
          weightageRangeFrom: list.data.weightageRangeFrom,
          weightageRangeTo: list.data.weightageRangeTo,
        }}
        action={refetch}
        btnText="Update"
        path="/auditweightage/update"
        returnPath="/audit/settings/weightage/list"
      />
    </div>
  );
};

export default WeightageEdit;
