import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../components/TopHeader";
import SubGroupForm from "./SubGroupForm";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import { useGetData } from "../../../hooks/dataApi";

const SubGroupEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("subGroupDetails", `/acSubGroup/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit SubGroup"
        btn="Return"
        path="/ac/settings/subGroup/list"
      />
      <SubGroupForm
        defaultValues={{
          subGroupId: list.data.subGroupId,
          subGroupName: list.data.subGroupName,
          groupId: list.data.groupId,
        }}
        action={refetch}
        btnText="Update"
        path="/acSubGroup/update"
        returnPath="/ac/settings/subGroup/list"
      />
    </div>
  );
};

export default SubGroupEdit;
