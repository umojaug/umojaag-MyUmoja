import React from "react";
import TopHeader from "../../../components/TopHeader";
import AreaForm from "./AreaForm";

const AreaAdd = () => {
  const defaultValues = {
    areaId: "",
    regionId: "",
    areaName: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="New Area"
        btn="Return"
        path="/admin/settings/area/list"
      />
      <AreaForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/areas/create"
        returnPath="/admin/settings/area/list"
      />
    </div>
  );
};

export default AreaAdd;
