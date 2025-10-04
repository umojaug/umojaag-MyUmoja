import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import SpecialInvestigationForm from "./SpecialInvestigationForm";

const SpecialInvestigationEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("auditSpecialInvestigation", `/auditSpecialInvestigation/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Special Investigation"
        btn="Return"
        path="/audit/settings/specialInvestigation/list"
      />
      <SpecialInvestigationForm
        defaultValues={{
          specialInvestigationId: list.data.specialInvestigationId,
          guideline: list.data.guideline,
          testSteps: list.data.testSteps,
        }}
        action={refetch}
        btnText="Update"
        path="/auditSpecialInvestigation/update"
        returnPath="/audit/settings/specialInvestigation/list"
      />
    </div>
  );
};

export default SpecialInvestigationEdit;
