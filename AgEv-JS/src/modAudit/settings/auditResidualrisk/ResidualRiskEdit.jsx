import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import ResidualRiskForm from "./ResidualRiskForm";

const ResidualRiskEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("auditResidualRisk", `/auditresidualrisk/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Residual Risk"
        btn="Return"
        path="/audit/settings/residualrisk/list"
      />
      <ResidualRiskForm
        defaultValues={{
            residualRiskId: list.data.residualRiskId,
            residualRiskName: list.data.residualRiskName,
            residualRiskValue: list.data.residualRiskValue,
        }}
        action={refetch}
        btnText="Update"
        path="/auditresidualrisk/update"
        returnPath="/audit/settings/residualrisk/list"
      />
    </div>
  );
};

export default ResidualRiskEdit;
