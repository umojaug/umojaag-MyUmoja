import { useParams } from "react-router-dom";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import TopHeader from "../../../components/TopHeader";
import BranchExcutionForm from "./BranchExcutionForm";

const BranchExcutionEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "auditExcutionUnitdetails",
    `/auditExcutionUnit/details/${id}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Branch Audit"
        btn="Return"
        path="/audit/excution/branch/list"
      />
      <BranchExcutionForm
        defaultValues={{
          excutionId: list.data.excutionId,
          bmId: list.data.bmId,
          amId: list.data.amId,
          rmId: list.data.rmId,
          auditStartDate:
            list.data.auditStartDate !== "1980-12-31T00:00:00"
              ? new Date(list.data.auditStartDate)
              : "",
          auditEndDate:
            list.data.auditEndDate !== "1980-12-31T00:00:00"
              ? new Date(list.data.auditEndDate)
              : "",
          periodUnderAuditFrom:
            list.data.periodUnderAuditFrom !== "1980-12-31T00:00:00"
              ? new Date(list.data.periodUnderAuditFrom)
              : "",
          periodUnderAuditTill:
            list.data.periodUnderAuditTill !== "1980-12-31T00:00:00"
              ? new Date(list.data.periodUnderAuditTill)
              : "",
          lastAuditPeriod: list.data.lastAuditPeriod,
          auditNotification: list.data.auditNotification,
          auditObjectives: list.data.auditObjectives,
          firstLoanDisbursementDate:
            list.data.firstLoanDisbursementDate !== "1980-12-31T00:00:00"
              ? new Date(list.data.firstLoanDisbursementDate)
              : "",
          parDateOfAudit: list.data.parDateOfAudit,
          numberOfBorrowersAudit: list.data.numberOfBorrowersAudit,
          totalNumberOfBranchStaff: list.data.totalNumberOfBranchStaff,
          priorFraudReport: list.data.priorFraudReport,
          staffTurnover: list.data.staffTurnover,
          revenueOfTheBranchLastMonth: list.data.revenueOfTheBranchLastMonth,
          profitOfTheBranchLastMonth: list.data.profitOfTheBranchLastMonth,
        }}
        action={refetch}
        btnText="Update"
        path="/auditExcutionUnit/update"
        returnPath="/audit/excution/branch/list"
      />
    </div>
  );
};

export default BranchExcutionEdit;
