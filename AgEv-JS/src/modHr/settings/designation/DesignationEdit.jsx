import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import DesignationForm from "./DesignationForm";

const DesignationEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrDesignation", `/designations/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Designation"
        btn="Return"
        path="/hr/settings/designation/list"
      />
      <DesignationForm
        defaultValues={{
          designationId: list.data.designationId,
          roleName: list.data.roleName,
          designationName: list.data.designationName,
          kpiDetails: list.data.kpiDetails,
          objectiveOne: list.data.objectiveOne,
          objectiveTwo: list.data.objectiveTwo,
          objectiveThree: list.data.objectiveThree,
          objectiveFour: list.data.objectiveFour,
        }}
        action={refetch}
        btnText="Update"
        path="/designations/update"
        returnPath="/hr/settings/designation/list"
      />
    </div>
  );
};

export default DesignationEdit;
