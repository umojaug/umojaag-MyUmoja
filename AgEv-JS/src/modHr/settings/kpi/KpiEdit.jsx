import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import KpiForm from "./KpiForm";

const KpiEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrkpi", `/kpi/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Edit KPI" btn="Return" path="/hr/settings/kpi/list" />
      <KpiForm
        defaultValues={{
          kpiId: list.data.kpiId,
          kpiName: list.data.kpiName,
          details: list.data.details,
        }}
        action={refetch}
        btnText="Update"
        path="/kpi/update"
        returnPath="/hr/settings/kpi/list"
      />
    </div>
  );
};

export default KpiEdit;
