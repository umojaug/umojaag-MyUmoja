import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import RoleForm from "./RoleForm";

const RoleEdit = () => {
  const { id } = useParams();

  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("role", `/role/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title={"Role"} btn="Return" path="/grapes/settings/role" />
      <RoleForm
        defaultValues={{
          id: list.data.id,
          roleName: list.data.name,
        }}
        action={() => {}}
        btnText={"Update"}
        path="/role/update"
        returnPath="/grapes/settings/role"
      />
    </div>
  );
};

export default RoleEdit;
