import React from "react";
import TopHeader from "../../../components/TopHeader";
import AuditAreaForm from "./AuditAreaForm";

const AuditAreaAdd = () => {
  const defaultValues = {
    auditAreaId: "",
    auditAreaName: "",
    auditAreatype: "",
    priority: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="New Audit Test Area"
        btn="Return"
        path="/audit/settings/testarea/list"
      />
      <AuditAreaForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/auditTestAreas/create"
        returnPath="/audit/settings/area/list"
      />
    </div>
  );
};

export default AuditAreaAdd;
