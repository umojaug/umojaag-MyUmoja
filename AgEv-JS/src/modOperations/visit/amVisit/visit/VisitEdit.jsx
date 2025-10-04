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
  } = useGetData("amvisitdetails", `/amvisit/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="AM Branch Visit Update"
        btn="Return"
        path="/ops/am/visit/list"
      />
      <VisitInfoForm
        defaultValues={{
          amVisitId: list.data.amVisitId,
          visitDate: new Date(list.data.visitDate),
          branchId: list.data.branchId,
          visitType: list.data.visitType,
          stayOvernight: list.data.stayOvernight,
          managerId: list.data.managerId,
        }}
        action={refetch}
        btnText="Update"
        path="/amvisit/update"
        returnPath="/ops/am/visit/list"
      />
    </div>
  );
};

export default VisitInfoEdit;
