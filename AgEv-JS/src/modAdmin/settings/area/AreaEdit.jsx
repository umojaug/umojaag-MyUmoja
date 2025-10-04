import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../components/TopHeader";
import AreaForm from "./AreaForm";
import { useGetData } from "../../../hooks/dataApi";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";

const AreaEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrArea", `/areas/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Area"
        btn="Return"
        path="/admin/settings/area/list"
      />
      <AreaForm
        defaultValues={{
          areaId: list.data.areaId,
          regionId: list.data.regionId,
          areaName: list.data.areaName,
        }}
        action={refetch}
        btnText="Update"
        path="/areas/update"
        returnPath="/admin/settings/area/list"
      />
    </div>
  );
};

export default AreaEdit;
