import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import InherentRiskForm from "./InherentRiskForm";

const InherentRiskEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("auditInherentRisk", `/auditinherentrisk/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Inherent Risk"
        btn="Return"
        path="/audit/settings/inherentrisk/list"
      />
      <InherentRiskForm
        defaultValues={{
          inherentRiskId: list.data.inherentRiskId,
          inherentRiskName: list.data.inherentRiskName,
          inherentRiskValue: list.data.inherentRiskValue,
        }}
        action={refetch}
        btnText="Update"
        path="/auditinherentrisk/update"
        returnPath="/audit/settings/inherentrisk/list"
      />
    </div>
  );
};

export default InherentRiskEdit;
