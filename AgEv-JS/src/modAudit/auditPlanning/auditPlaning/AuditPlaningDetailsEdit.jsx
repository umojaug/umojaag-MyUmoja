import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import AuditPlaningDetailsFrom from "./AuditPlaningDetailsFrom";

const AuditPlaningDetailsEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("auditPlandetails", `/AuditPlan/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Audit Planning Details"
        btn="Return"
        path="/audit/planning"
      />
      <AuditPlaningDetailsFrom
        defaultValues={{
          planDetailsId: list.data.planDetailsId,
          fraud: list.data.fraud,
          staffTurnover: list.data.staffTurnover,
          inherentRisk: list.data.inherentRisk,
          residualRisk: list.data.residualRisk,
          // overallRiskRating: list.data.overallRiskRating,
          selectedForAuditPeriod: list.data.selectedForAuditPeriod,
          budget: list.data.budget,
        }}
        action={refetch}
        btnText="Update"
        path="/auditPlan/update"
        returnPath="/audit/planning"
      />
    </div>
  );
};

export default AuditPlaningDetailsEdit;
