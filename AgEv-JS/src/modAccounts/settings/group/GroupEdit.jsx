import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../components/TopHeader";
import GroupForm from "./GroupForm";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import { useGetData } from "../../../hooks/dataApi";

const GroupEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("groupDetails", `/acGroup/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Group"
        btn="Return"
        path="/ac/settings/group/list"
      />
      <GroupForm
        defaultValues={{
          groupId: list.data.groupId,
          mainId: list.data.mainId,
          groupName: list.data.groupName,
        }}
        action={refetch}
        btnText="Update"
        path="/acGroup/update"
        returnPath="/ac/settings/group/list"
      />
    </div>
  );
};

export default GroupEdit;
