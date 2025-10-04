import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../components/TopHeader";
import AuditAreaForm from "./AuditAreaForm";
import { useGetData } from "../../../hooks/dataApi";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";

const AuditAreaEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrAuditArea", `/auditTestAreas/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Audit Test Area"
        btn="Return"
        path="/audit/settings/testarea/list"
      />
      <AuditAreaForm
        defaultValues={{
          auditAreaId: list.data.auditAreaId,
          auditAreaName: list.data.auditAreaName,
          auditAreatype: list.data.auditAreatype,
          priority: list.data.priority,
        }}
        action={refetch}
        btnText="Update"
        path="/auditTestAreas/update"
        returnPath="/audit/settings/testarea/list"
      />
    </div>
  );
};

export default AuditAreaEdit;
