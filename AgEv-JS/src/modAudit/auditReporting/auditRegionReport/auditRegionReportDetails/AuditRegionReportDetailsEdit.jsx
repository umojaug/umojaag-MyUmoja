import React from "react";
import { useParams } from "react-router-dom";
import AuditRegionReportDetailsForm from "./AuditRegionReportDetailsForm";
import { useGetData } from "../../../../hooks/dataApi";
import TopHeader from "../../../../components/TopHeader";
import { HashLoading } from "../../../../components/Loading";
import Error from "../../../../components/Error";

const AuditRegionReportDetailsEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "auditAuditBranchDepartmentAuditReport",
    `/AuditRegionReportDetails/details/${id}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Region Audit Report Details Edit"
        btn="Return"
        path={`/audit/reporting/region/details/${list.data.reportId}`}
      />

      <AuditRegionReportDetailsForm
        defaultValues={{
          reportDetailsId: list.data.reportDetailsId,
          reportingQuarter: list.data.reportingQuarter,
          monthOfAudit: list.data.monthOfAudit,
          departmentId: list.data.departmentId,
          regionId: list.data.regionId,
          regionOverview: list.data.regionOverview,
          areaOfReviewId: list.data.areaOfReviewId,
          detailedAuditFinding: list.data.detailedAuditFinding,
          primaryRootCauseId: list.data.primaryRootCauseId,
          riskImplicationId: list.data.riskImplicationId,
          recommendations: list.data.recommendations,
          implementedBy: list.data.implementedBy,
          riskCategory: list.data.riskCategory,
          regionResponse: list.data.regionResponse,
          managementResponse: list.data.managementResponse,
          commitmentDate:
            list.data.commitmentDate !== "1980-12-31T00:00:00"
              ? new Date(list.data.commitmentDate)
              : "",
          overallControlsAssessment: list.data.overallControlsAssessment,
          fraudRisk: list.data.fraudRisk,
          repeatFinding: list.data.repeatFinding,
          followUpCommentIfAny: list.data.followUpCommentIfAny,
          iaInCharge: list.data.iaInCharge,
          appendicies: list.data.appendicies,
        }}
        action={refetch}
        btnText="Update"
        path="/AuditRegionReportDetails/Update"
        returnPath={`/audit/reporting/region/details/${list.data.reportId}`}
      />
    </div>
  );
};

export default AuditRegionReportDetailsEdit;
