import React from "react";
import TopHeader from "../../../components/TopHeader";
import RegionForm from "./RegionForm";

const RegionAdd = () => {
  const defaultValues = {
    regionId: "",
    divisionId: "",
    regionName: "",
    startDate: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="New Region"
        btn="Return"
        path="/admin/settings/region/list"
      />
      <RegionForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/regions/create"
        returnPath="/admin/settings/region/list"
      />
    </div>
  );
};

export default RegionAdd;
