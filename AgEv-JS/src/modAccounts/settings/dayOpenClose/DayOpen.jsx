import React from "react";
import { format } from "date-fns";
import TopHeader from "../../../components/TopHeader";
import DayOpenForm from "./DayOpenForm";
import DayOpenList from "./DayOpenList";
import { HashLoading } from "../../../components/Loading";
import { useGetData } from "../../../hooks/dataApi";
import Error from "../../../components/Error";

const DayOpen = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("AsDayList", "/AcBusinessDay/StatusList");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      {/* {list.data[0].status === "Day Open" ? (
        <p className=" font-bold text-green-500 ">
          Business Date Open:
          {format(new Date(list.data[0].businessDate), "dd-MMM-yyyy")}
        </p>
      ) : (
        <p className=" font-bold text-red-500">
          Business Date Closed:
          {format(new Date(list.data[0].businessDate), "dd-MMM-yyyy")}
        </p>
      )} */}
      <TopHeader title="Day Status" />
      <DayOpenForm action={refetch} />
      <DayOpenList data={list.data} action={refetch} />
    </div>
  );
};

export default DayOpen;
