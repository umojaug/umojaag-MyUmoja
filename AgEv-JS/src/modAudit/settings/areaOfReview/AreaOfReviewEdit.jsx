import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import AreaOfReviewForm from "./AreaOfReviewForm";

const AreaOfReviewEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("areaOfReview", `/areaOfReview/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Audit Area"
        btn="Return"
        path="/audit/settings/areaOfReview/list"
      />
      <AreaOfReviewForm
        defaultValues={{
          areaOfReviewId: list.data.areaOfReviewId,
          areaOfReviewName: list.data.areaOfReviewName,
        }}
        action={refetch}
        btnText="Update"
        path="/areaOfReview/update"
        returnPath="/audit/settings/areaOfReview/list"
      />
    </div>
  );
};

export default AreaOfReviewEdit;
