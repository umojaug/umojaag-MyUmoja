import React from "react";
import { useParams } from "react-router-dom";
import InvestigationDetailsForm from "./InvestigationDetailsForm";
import TopHeader from "../../../../components/TopHeader";
import { useGetData } from "../../../../hooks/dataApi";
import { HashLoading } from "../../../../components/Loading";
import Error from "../../../../components/Error";

const InvestigationDetailsEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "employeesdetails",
    `/auditSpInvestigation/investigationDetails/${id}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl ">
      <TopHeader
        title="Special Investigation Update"
        btn="Return"
        path={`/audit/excution/special/investigation/details/${list.data.investigationId}`}
      />
      <InvestigationDetailsForm
        defaultValues={{
          investigationDetailsId: list.data.investigationDetailsId,
          guideline: list.data.guideline,
          testSteps: list.data.testSteps,
          evidences1: list.data.evidences1,
          evidences2: list.data.evidences2,
          evidences3: list.data.evidences3,
          reportInputs: list.data.reportInputs,
          testConclusion: list.data.testConclusion,
        }}
        action={refetch}
        btnText="Update"
        path={`/auditSpInvestigation/detailsUpdate`}
        returnPath={`/audit/excution/special/investigation/details/${list.data.investigationId}`}
        isEdit="true"
      />
    </div>
  );
};

export default InvestigationDetailsEdit;
