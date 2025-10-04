import React from "react";
import { useGetData } from "../../../hooks/dataApi";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import DetailsList from "./DetailsList";
import { useParams } from "react-router-dom";
import Transfer from "./Transfer";
import Promotion from "./Promotion";

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
      <Transfer transfer={list.data.transfer} />
      <Promotion promotion={list.data.promotion} />
    </div>
  );
};

export default Details;
