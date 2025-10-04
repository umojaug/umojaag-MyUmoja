import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../components/TopHeader";
import RegionForm from "./RegionForm";
import { useGetData } from "../../../hooks/dataApi";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";

const RegionEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrRegion", `/regions/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Region"
        btn="Return"
        path="/admin/settings/region/list"
      />
      <RegionForm
        defaultValues={{
          regionId: list.data.regionId,
          divisionId: list.data.divisionId,
          regionName: list.data.regionName,
          startDate: list.data.startDate,
        }}
        action={refetch}
        btnText="Update"
        path="/regions/update"
        returnPath="/admin/settings/region/list"
      />
    </div>
  );
};

export default RegionEdit;
