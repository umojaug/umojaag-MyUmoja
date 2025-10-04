import React, { useState } from "react";
import TopHeader from "../../../components/TopHeader";
import SearchDateRange from "../../../components/SearchDateRange";
import ApplicationAuditTrailList from "./ApplicationAuditTrailList";

const ApplicationAuditTrail = () => {
  const [dataForm, setDataForm] = useState(false);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Audit Log Report" />
      <SearchDateRange action={setDataForm} />
      {dataForm && <ApplicationAuditTrailList dataForm={dataForm} />}
    </div>
  );
};

export default ApplicationAuditTrail;
