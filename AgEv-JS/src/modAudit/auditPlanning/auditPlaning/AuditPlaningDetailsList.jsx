import React from "react";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import { useGetData } from "../../../hooks/dataApi";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import PdfButton from "../../../components/button/PdfButton";
import PrintHeader from "../../../components/PrintHeader";
import { Link } from "react-router-dom";

const AuditPlaningDetailsList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData("AuditPlanMaterList", "/AuditPlan/detailsList");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data.map(
    ({
      planDetailsId,
      businessArea,
      auRef,
      auName,
      auditType,
      portfolioValue,
      par,
      fraud,
      staffTurnover,
      numOfBorrower,
      inherentRisk,
      residualRisk,
      weightage,
      overallRiskRating,
      selectedForAuditPeriod,
      budget,
    }) => ({
      planDetailsId,
      businessArea,
      auRef,
      auName,
      auditType,
      portfolioValue,
      par,
      fraud,
      staffTurnover,
      numOfBorrower,
      inherentRisk,
      residualRisk,
      weightage,
      overallRiskRating,
      selectedForAuditPeriod,
      budget,
    })
  );

  return (
    <div className="mt-2">
      <div className="flex justify-end items-center">
        <PdfButton path={`/HrPdfCommon/auditPlanDetailsList`} />
        <PrintHeader
          fileName="AuditPlanDetails.csv"
          data={data.map(
            ({
              businessArea,
              auRef,
              auName,
              auditType,
              portfolioValue,
              par,
              fraud,
              staffTurnover,
              numOfBorrower,
              inherentRisk,
              residualRisk,
              weightage,
              overallRiskRating,
              selectedForAuditPeriod,
              budget,
            }) => ({
              businessArea,
              auRef,
              auName,
              auditType,
              portfolioValue,
              par,
              fraud,
              staffTurnover,
              numOfBorrower,
              inherentRisk,
              residualRisk,
              weightage,
              overallRiskRating,
              selectedForAuditPeriod,
              budget,
            })
          )}
          headers={[
            { label: "Business Area", key: "businessArea" },
            { label: "AuRef", key: "auRef" },
            { label: "AuName", key: "auName" },
            { label: "auditType", key: "auditType" },
            { label: "portfolioValue", key: "portfolioValue" },
            { label: "par", key: "par" },
            { label: "fraud", key: "fraud" },
            { label: "staffTurnover", key: "staffTurnover" },
            { label: "numOfBorrower", key: "numOfBorrower" },
            { label: "InherentRisk", key: "inherentRisk" },
            { label: " ResidualRisk", key: "residualRisk" },
            { label: "Weightage", key: "weightage" },
            { label: "OverallRiskRating", key: "overallRiskRating" },
            {
              label: "Selected For Audit Period",
              key: "selectedForAuditPeriod",
            },
            { label: "Budget", key: "budget" },
          ]}
        />
      </div>
      <div className="list-wrapper">
        <div className="md:grid grid-cols-12 list-header">
          <ListHeader label="Details " />
          <ListHeader label="Portfolio Value" />
          <ListHeader label="PAR" />
          <ListHeader label="Fraud" />
          <ListHeader label="Staff Turn over" />
          <ListHeader label="Number Of Borrowers" />
          <ListHeader label="Inherent Risk " />
          <ListHeader label="Residual Risk " />
          <ListHeader label="Weightage " />
          <ListHeader label="Overall Risk Rating" />
          <ListHeader label="Selected For Audit Period" />
          <ListHeader className="text-right" label="Budget" />
        </div>

        {data.length > 0 &&
          data.map((item, i) => (
            <Link
              key={i}
              to={`/audit/planning/details/edit/${item.planDetailsId}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 list-body">
                <ListCol
                  label="Details:"
                  value={
                    item.businessArea +
                    ", " +
                    item.auRef +
                    ", " +
                    item.auName +
                    ", " +
                    item.auditType
                  }
                />

                <ListCol
                  label=" Portfolio Value:"
                  value={item.portfolioValue}
                />
                <ListCol label=" PAR:" value={item.par} />
                <ListCol label="Fraud:" value={item.fraud} />
                <ListCol label="Staff Turn Over:" value={item.staffTurnover} />
                <ListCol
                  label="Number Of Borrowers:"
                  value={item.numOfBorrower}
                />
                <ListCol label="Inherent Risk:" value={item.inherentRisk} />
                <ListCol label="Residual Risk:" value={item.residualRisk} />
                <ListCol label="Weightage:" value={item.weightage} />
                <ListCol
                  label="Overall Risk Rating:"
                  value={item.overallRiskRating}
                />
                <ListCol
                  label="Selected For Audit Period:"
                  value={item.selectedForAuditPeriod}
                />
                <ListCol
                  className="text-right"
                  label="Selected For Audit Period:"
                  value={item.budget}
                />
              </div>
            </Link>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">TOTAL : {data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditPlaningDetailsList;
