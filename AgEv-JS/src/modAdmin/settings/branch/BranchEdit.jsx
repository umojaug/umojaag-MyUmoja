import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../components/TopHeader";
import BranchForm from "./BranchForm";
import { useGetData } from "../../../hooks/dataApi";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";

const BranchEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrBranch", `/branches/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Branch"
        btn="Return"
        path="/admin/settings/branch/list"
      />
      <BranchForm
        defaultValues={{
          branchId: list.data.branchId,
          areaId: list.data.areaId,
          branchName: list.data.branchName,
          startDate: new Date(list.data.startDate),
        }}
        action={refetch}
        btnText="Update"
        path="/branches/update"
        returnPath="/admin/settings/branch/list"
      />
    </div>
  );
};

export default BranchEdit;
