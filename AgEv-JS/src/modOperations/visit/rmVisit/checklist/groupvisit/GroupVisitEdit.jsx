import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import TopHeader from "../../../../../components/TopHeader";
import { useGetData } from "../../../../../hooks/dataApi";
import DepartmentForm from "./GroupVisitForm";

const GroupVisitEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("rmGroupVisit", `/rmGroupVisit/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit RM group visit"
        btn="Return"
        path={`/ops/rm/visit/preview/${list.data.rmVisitId}`}
      />
      <DepartmentForm
        defaultValues={{
          opsRmGroupvisitId: list.data.opsRmGroupvisitId,
          rmVisitId: list.data.rmVisitId,
          loName: list.data.loName,
          groupName: list.data.groupName,
          totalBorrower: list.data.totalBorrower,
          numberOfBorrower: list.data.numberOfBorrower,
          passbookChecked: list.data.passbookChecked,
          passbookMissing: list.data.passbookMissing,
        }}
        action={refetch}
        btnText="Update"
        path="/rmGroupVisit/update"
        returnPath={`/ops/rm/visit/preview/${list.data.rmVisitId}`}
      />
    </div>
  );
};

export default GroupVisitEdit;
