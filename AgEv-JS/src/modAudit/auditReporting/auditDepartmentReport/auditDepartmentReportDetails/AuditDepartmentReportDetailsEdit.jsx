import React from "react";
import { useParams } from "react-router-dom";
import AuditDepartmentReportDetailsForm from "./AuditDepartmentReportDetailsForm";
import { useGetData } from "../../../../hooks/dataApi";
import TopHeader from "../../../../components/TopHeader";
import { HashLoading } from "../../../../components/Loading";
import Error from "../../../../components/Error";

const AuditDepartmentReportDetailsEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "AuditDepartmentReport",
    `/AuditDepartmentReportDetails/details/${id}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Audit Department Report Edit"
        btn="Return"
        path="/audit/reporting/department/list"
      />

      <AuditDepartmentReportDetailsForm
        defaultValues={{
          reportDetailsId: list.data.reportDetailsId,
          departmentId: list.data.departmentId,
          //branchOverview: list.data.branchOverview,
          areaOfReviewId: list.data.areaOfReviewId,
          detailedAuditFinding: list.data.detailedAuditFinding,
          primaryRootCauseId: list.data.primaryRootCauseId,
          riskImplicationId: list.data.riskImplicationId,
          recommendations: list.data.recommendations,
          implementedBy: list.data.implementedBy,
          riskCategory: list.data.riskCategory,
          departmentResponse: list.data.departmentResponse,
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
        path="/AuditDepartmentReportDetails/update"
        returnPath={`/audit/reporting/department/details/${list.data.reportId}`}
      />
    </div>
  );
};

export default AuditDepartmentReportDetailsEdit;
