import AuditSpecialInvestigationReportForm from "./AuditSpecialInvestigationReportForm";
import { useGetData } from "../../../hooks/dataApi";
import { useParams } from "react-router-dom";
import TopHeader from "../../../components/TopHeader";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";

const AuditSpecialInvestigationReportEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "auditAuditBranchDepartmentAuditReport",
    `/auditSpecialInvestigationReport/details/${id}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Special Investigation Audit Report Update"
        btn="Return"
        path="/audit/reporting/Special/Investigation/list"
      />

      <AuditSpecialInvestigationReportForm
        defaultValues={{
          reportId: list.data.reportId,
          reportingQuarter: list.data.reportingQuarter,
          monthOfAudit: list.data.monthOfAudit,
          departmentId: list.data.departmentId,
          branchId: list.data.branchId,
          detectionMethod: list.data.detectionMethod,
          typeOfFraudId: list.data.typeOfFraudId,
          whoMightBeInvolved: list.data.whoMightBeInvolved,
          positionOfFraudster: list.data.positionOfFraudster,
          lengthOfServiceOfFraudster: list.data.lengthOfServiceOfFraudster,
          howIsTheFraudBeingPerpetrated:
            list.data.howIsTheFraudBeingPerpetrated,
          numberOfOccurences: list.data.numberOfOccurences,
          potentialWitness: list.data.potentialWitness,
          statements: list.data.statements,
          evidence1: list.data.evidence1,
          observations: list.data.observations,
          defectiveControlsIdentified: list.data.defectiveControlsIdentified,
          estimatedFraudLoss: list.data.estimatedFraudLoss,
          recommendations: list.data.recommendations,
          managementResponse: list.data.managementResponse,
          implementedBy: list.data.implementedBy,
          iaInCharge: list.data.iaInCharge,
          amountRecovered: list.data.amountRecovered,
          status: list.data.status,
          currentStatusUpdate: list.data.currentStatusUpdate,
        }}
        action={refetch}
        btnText="Update"
        path="/auditSpecialInvestigationReport/Update"
        returnPath="/audit/reporting/Special/Investigation/list"
      />
    </div>
  );
};

export default AuditSpecialInvestigationReportEdit;
