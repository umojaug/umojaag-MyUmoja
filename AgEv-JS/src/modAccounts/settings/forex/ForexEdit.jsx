import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../components/TopHeader";
import ForexForm from "./ForexForm";
import { useGetData } from "../../../hooks/dataApi";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";

const ForexEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrForex", `/forexes/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Forex"
        btn="Return"
        path="/ac/settings/forex/list"
      />
      <ForexForm
        defaultValues={{
          forexId: list.data.forexId,
          forexName: list.data.forexName,
          forexRate: list.data.forexRate,
          workDate: new Date(Date.parse(list.data.workDate)),
        }}
        action={refetch}
        btnText="Update"
        path="/forexes/update"
        returnPath="/ac/settings/forex/list"
      />
    </div>
  );
};

export default ForexEdit;
