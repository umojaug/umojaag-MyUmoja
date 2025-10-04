import React from "react";
import { useParams } from "react-router-dom";
import { useGetData } from "../../../hooks/dataApi";
import VisitView from "../components/VisitView";
import VisitChecklistView from "../components/VisitChecklistView";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import Accept from "../components/Accept";
import Reject from "../components/Reject";

const ReviewPreview = () => {
  const { id } = useParams();

  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("visitdetails", `/visit/detailsview/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl gap-2">
      <VisitView data={list.data} />
      <VisitChecklistView id={id} />

      {list.data.isSubmit === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5">
          <Accept id={id} returnPath="/ops/my/review/list" />
          <Reject id={id} returnPath="/ops/my/review/list" />
        </div>
      )}
    </div>
  );
};

export default ReviewPreview;
