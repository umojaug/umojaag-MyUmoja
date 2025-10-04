import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../components/TopHeader";
import TourForm from "./TourForm";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import { useGetData } from "../../hooks/dataApi";

const TourEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("tour", `/tour/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Tour" btn="Return" path="/hr/tour/list" />
      <TourForm
        defaultValues={{
          tourType: list.data.tourType,
          fromDate: new Date(list.data.fromDate),
          tillDate: new Date(list.data.tillDate),
          applicationDate: new Date(list.data.applicationDate),
          workDate: new Date(list.data.workDate),
          particulars: list.data.particulars,
        }}
        action={refetch}
        btnText="Update"
        path="tour/update"
        returnPath="/hr/tour/list"
      />
    </div>
  );
};

export default TourEdit;
