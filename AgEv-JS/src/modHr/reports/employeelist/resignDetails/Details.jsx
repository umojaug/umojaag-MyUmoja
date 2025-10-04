import React from "react";
import { useParams } from "react-router-dom";
import { useGetData } from "../../../../hooks/dataApi";
import { HashLoading } from "../../../../components/Loading";
import Error from "../../../../components/Error";
import DetailsList from "./DetailsList";
import ExitInterview from "./ExitInterview";

const Details = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("hrreportsdetailsbyid", `/hrreports/detailsbyid/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl gap-5">
      <DetailsList employee={list.data.employee} />
      <ExitInterview interview={list.data.interview} />
    </div>
  );
};

export default Details;
