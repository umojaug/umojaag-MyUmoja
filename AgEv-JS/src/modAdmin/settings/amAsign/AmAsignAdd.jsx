import React from "react";
import TopHeader from "../../../components/TopHeader";

import AmAsignForm from "./AmAsignForm";

const AmAsignAdd = () => {
  const defaultValues = {
    areaId: "",
    employeeId: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Asign Area Manager"
        btn="Return"
        path="/admin/settings/am/asign/list"
      />
      <AmAsignForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/AmAssign/create"
        returnPath="/admin/settings/amAsign/list"
      />
    </div>
  );
};

export default AmAsignAdd;
