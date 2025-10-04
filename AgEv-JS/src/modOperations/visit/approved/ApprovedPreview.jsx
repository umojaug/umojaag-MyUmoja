import React from "react";
import { useParams } from "react-router-dom";
import { useGetData } from "../../../hooks/dataApi";
import VisitView from "../components/VisitView";
import VisitChecklistView from "../components/VisitChecklistView";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";

const ApprovedPreview = () => {
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
    </div>
  );
};

export default ApprovedPreview;
