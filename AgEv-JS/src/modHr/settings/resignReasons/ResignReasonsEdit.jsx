import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../components/TopHeader";

import ResignReasonsForm from "./ResignReasonsForm";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";

const ResignReasonsEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("settingResignReasons", `/resignreasons/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Resign Reasons"
        btn="Return"
        path="/hr/settings/resign-reason/list"
      />
      <ResignReasonsForm
        defaultValues={{
          resignReasonId: list.data.resignReasonId,
          resignReasonName: list.data.resignReasonName,
          resignStatus: list.data.resignStatus,
        }}
        action={refetch}
        btnText="Update"
        path="/resignreasons/update"
        returnPath="/hr/settings/resign-reason/list"
      />
    </div>
  );
};

export default ResignReasonsEdit;
