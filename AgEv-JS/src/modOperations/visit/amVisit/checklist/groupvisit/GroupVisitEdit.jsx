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
  } = useGetData("amGroupVisit", `/amGroupVisit/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit AM group visit"
        btn="Return"
        path={`/ops/am/visit/preview/${list.data.amVisitId}`}
      />
      <DepartmentForm
        defaultValues={{
          opsAmGroupvisitId: list.data.opsAmGroupvisitId,
          amVisitId: list.data.amVisitId,
          loName: list.data.loName,
          groupName: list.data.groupName,
          totalBorrower: list.data.totalBorrower,
          numberOfBorrower: list.data.numberOfBorrower,
          passbookChecked: list.data.passbookChecked,
          passbookMissing: list.data.passbookMissing,
        }}
        action={refetch}
        btnText="Update"
        path="/amGroupVisit/update"
        returnPath={`/ops/am/visit/preview/${list.data.amVisitId}`}
      />
    </div>
  );
};

export default GroupVisitEdit;
