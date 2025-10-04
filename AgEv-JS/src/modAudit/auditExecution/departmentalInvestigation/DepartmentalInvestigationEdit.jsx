import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import DepartmentalInvestigationForm from "./DepartmentalInvestigationForm";

const DepartmentalInvestigationEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("employeesdetails", `/AuditDpInvestigation/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Departmental Audit Update"
        btn="Return"
        path="/audit/excution/departmental/list"
      />

      <DepartmentalInvestigationForm
        defaultValues={{
          dpInvestigationId: list.data.dpInvestigationId,
          title: list.data.title,
          branchId: list.data.branchId,
          testSteps: list.data.testSteps,
          departmentId: list.data.departmentId,
          investigationDate: new Date(list.data.investigationDate),
        }}
        action={refetch}
        btnText="Update"
        path="/AuditDpInvestigation/update"
        returnPath="/audit/excution/departmental/list"
        isEdit={list.data.canEdit}
      />
    </div>
  );
};

export default DepartmentalInvestigationEdit;
