import React from "react";
import InvestigationForm from "./InvestigationForm";
import { useParams } from "react-router-dom";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import Error from "../../../components/Error";

const InvestigationEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("employeesdetails", `/auditSpInvestigation/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Special Investigation Update"
        btn="Return"
        path="/audit/excution/special/investigation/list"
      />

      <InvestigationForm
        defaultValues={{
          investigationId: list.data.investigationId,
          title: list.data.title,
          branchId: list.data.branchId,
          departmentId: list.data.departmentId,
          investigationDate: new Date(list.data.investigationDate),
        }}
        action={refetch}
        btnText="Update"
        path="/auditSpInvestigation/update"
        returnPath="/audit/excution/special/investigation/list"
        isEdit={list.data.canEdit}
      />
    </div>
  );
};

export default InvestigationEdit;
