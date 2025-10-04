import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import RiskImplicationForm from "./RiskImplicationForm";

const RiskImplicationEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrDepartment", `/riskImplication/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Risk Implication"
        btn="Return"
        path="/audit/settings/riskImplication/list"
      />
      <RiskImplicationForm
        defaultValues={{
          riskImplicationId: list.data.riskImplicationId,
          riskImplicationName: list.data.riskImplicationName,
        }}
        action={refetch}
        btnText="Update"
        path="/riskImplication/update"
        returnPath="/audit/settings/riskImplication/list"
      />
    </div>
  );
};

export default RiskImplicationEdit;
