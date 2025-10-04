import React from "react";
import { useParams } from "react-router-dom";
import FmpuForm from "./FmpuForm";
import TopHeader from "../../components/TopHeader";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import { useGetData } from "../../hooks/dataApi";

const FmpuEdit = () => {
  const { id } = useParams();

  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("fmpusdetails", `/fmpu/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="FMPU Update" btn="Return" path="/ops/fmpu/list" />
      <FmpuForm
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
          documentReview1: list.data.documentReview1,
          documentReview2: list.data.documentReview2,
          documentReview3: list.data.documentReview3,
          documentReview4: list.data.documentReview4,
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
          evidence1: list.data.evidence1,
          evidence2: list.data.evidence2,
          evidence3: list.data.evidence3,
          evidence4: list.data.evidence4,
          evidence5: list.data.evidence5,
          evidence6: list.data.evidence6,
        }}
        action={refetch}
        btnText="Update"
        path="/fmpu/update"
        returnPath="/ops/fmpu/list"
      />
    </div>
  );
};

export default FmpuEdit;
