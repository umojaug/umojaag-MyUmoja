import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../../components/TopHeader";
import VisitInfoForm from "./VisitForm";
import Error from "../../../../components/Error";
import { HashLoading } from "../../../../components/Loading";
import { useGetData } from "../../../../hooks/dataApi";

const VisitInfoEdit = () => {
  const { id } = useParams();

  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("allvisitdetails", `/allvisit/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Visit Update" btn="Return" path="/ops/visit/list" />
      <VisitInfoForm
        defaultValues={{
          allVisitId: list.data.allVisitId,
          visitDate: new Date(list.data.visitDate),
          visitEndDate: new Date(list.data.visitEndDate),
          branchId: list.data.branchId,
          entryTime: new Date(Date.parse(list.data.entryTime)),
          exitTime: new Date(Date.parse(list.data.exitTime)),
          visitType: list.data.visitType,
          stayOvernight: list.data.stayOvernight,
          pinName: list.data.pinName,
          managerPin: list.data.managerPin,
        }}
        action={refetch}
        btnText="Update"
        path="/allVisit/update"
        returnPath="/ops/visit/list"
      />
    </div>
  );
};

export default VisitInfoEdit;
