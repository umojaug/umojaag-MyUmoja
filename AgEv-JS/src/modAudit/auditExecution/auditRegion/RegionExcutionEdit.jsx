import React from "react";
import { useParams } from "react-router-dom";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import TopHeader from "../../../components/TopHeader";
import RegionExcutionForm from "./RegionExcutionForm";

const RegionExcutionEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "auditExcutionUnitdetails",
    `/AuditExcutionRegion/details/${id}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Region Audit"
        btn="Return"
        path="/audit/excution/region/list"
      />
      <RegionExcutionForm
        defaultValues={{
          excutionId: list.data.excutionId,
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
          parDateOfAudit: list.data.parDateOfAudit,
          numberOfBorrowersAudit: list.data.numberOfBorrowersAudit,
          totalNumberOfBranchStaff: list.data.totalNumberOfBranchStaff,
          priorFraudReport: list.data.priorFraudReport,
          staffTurnover: list.data.staffTurnover,
        }}
        action={refetch}
        btnText="Update"
        path="/AuditExcutionRegion/Update"
        returnPath="/audit/excution/region/list"
      />
    </div>
  );
};

export default RegionExcutionEdit;
