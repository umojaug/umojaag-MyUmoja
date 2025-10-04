import React from "react";
import { useParams } from "react-router-dom";
import { useGetData } from "../../../../hooks/dataApi";
import { HashLoading } from "../../../../components/Loading";
import Error from "../../../../components/Error";
import TopHeader from "../../../../components/TopHeader";
import AuditExcutionUnitStepsForm from "./AuditExcutionUnitStepsForm";

const AuditExcutionUnitStepsEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("auditWorkSteps", `/auditExcutionUnitSteps/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        // title="Edit AM RM Monitoring"
        title={`Edit ${list?.data?.auditAreaName || "No Data Found"}`}
        btn="Return"
        path={`/audit/checkdetails/${list.data.auditAreaType}/${list.data.excutionId}/${list.data.auditAreaId}`}
      />
      <AuditExcutionUnitStepsForm
        defaultValues={{
          executionUnitTestStepId: list.data.executionUnitTestStepId,
          testingDate: new Date(list.data.testingDate),
          sampledMonth: list.data.sampledMonth,
          auditPeriod: list.data.auditPeriod,
          selectionMethod: list.data.selectionMethod,
          controlFrequency: list.data.controlFrequency,
          sampleSize: list.data.sampleSize,
          populationSize: list.data.populationSize,
          testingConclusion: list.data.testingConclusion,
          testResults: list.data.testResults,
          testEvidences: list.data.testEvidences,
          testStepsName: list.data.testStepsName,
        }}
        action={refetch}
        btnText="Update"
        path="/AuditExcutionUnitSteps/update"
        returnPath={`/audit/checkdetails/${list.data.auditAreaType}/${list.data.excutionId}/${list.data.auditAreaId}`}
      />
    </div>
  );
};

export default AuditExcutionUnitStepsEdit;
