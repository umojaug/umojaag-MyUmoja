import React from "react";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import TopHeader from "../../../components/TopHeader";
import Details from "./Details";
import Comments from "./Comments";
import { useParams } from "react-router-dom";
import { useGetData } from "../../../hooks/dataApi";

const TicketDetailsWithComments = () => {
  const { id, "*": prevPath } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("comments", `/TicketNote/list/${id}`);
  if (isLoading) return <HashLoading />;
  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Ticket Details"
        btn="Return"
        path={prevPath ? `/${prevPath}` : "/Tickets"}
      />

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Details />
        </div>
        <Comments comments={list.data} action={refetch} id={id} />
      </div>
    </div>
  );
};

export default TicketDetailsWithComments;
