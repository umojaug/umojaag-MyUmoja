import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../../components/TopHeader";
import { useGetData } from "../../../../hooks/dataApi";
import { HashLoading } from "../../../../components/Loading";
import Error from "../../../../components/Error";
import DepartmentalInvestigationDetailsForm from "./DepartmentalInvestigationDetailsForm";

const DepartmentalInvestigationDetailsEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "employeesdetails",
    `/AuditDpInvestigation/DepartmentalInvestigationDetails/${id}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl ">
      <TopHeader
        title="Departmental details audit Update"
        btn="Return"
        path={`/audit/excution/departmental/details/${list.data.dpInvestigationId}`}
      />

      <DepartmentalInvestigationDetailsForm
        defaultValues={{
          investigationDetailsId: list.data.investigationDetailsId,
          testSteps: list.data.testSteps,
          testingDate: new Date(list.data.testingDate),
          sampledMonth: list.data.sampledMonth,
          auditPeriod: list.data.auditPeriod,
          sampleSelectionMethod: list.data.sampleSelectionMethod,
          controlFrequency: list.data.controlFrequency,
          populationSize: list.data.populationSize,
          sampleSize: list.data.sampleSize,
          testConclusion: list.data.testConclusion,
          auditFinding: list.data.auditFinding,
          evidences: list.data.evidences,
        }}
        action={refetch}
        btnText="Update"
        path={`/AuditDpInvestigation/detailsUpdate`}
        returnPath={`/audit/excution/departmental/details/${list.data.dpInvestigationId}`}
      />
    </div>
  );
};

export default DepartmentalInvestigationDetailsEdit;
