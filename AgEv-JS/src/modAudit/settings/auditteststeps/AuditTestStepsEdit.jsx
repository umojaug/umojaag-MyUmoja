import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../components/TopHeader";
import AuditTestStepsForm from "./AuditTestStepsForm";
import { useGetData } from "../../../hooks/dataApi";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";

const AuditTestStepsEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrAuditTestSteps", `/auditTestSteps/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Audit TestSteps"
        btn="Return"
        path="/audit/settings/testSteps/list"
      />
      <AuditTestStepsForm
        defaultValues={{
          auditTestStepsId: list.data.auditTestStepsId,
          auditAreaId: list.data.auditAreaId,
          testStepsName: list.data.testStepsName,
        }}
        action={refetch}
        btnText="Update"
        path="/auditTestSteps/update"
        returnPath="/audit/settings/testSteps/list"
      />
    </div>
  );
};

export default AuditTestStepsEdit;
