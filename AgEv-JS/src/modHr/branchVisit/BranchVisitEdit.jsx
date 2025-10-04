import React from "react";
import { useParams } from "react-router-dom";
import BranchVisitForm from "./BranchVisitForm";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import TopHeader from "../../components/TopHeader";

const BranchVisitEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrDepartment", `/branchVisit/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  console.log(list.data);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Branch Visit"
        btn="Return"
        path="/hr/branch/visit/list"
      />
      <BranchVisitForm
        defaultValues={{
          branchVisitId: list.data.branchVisitId,
          branchId: list.data.branchId,
          visitDate: list.data.visitDate,
        }}
        action={refetch}
        btnText="Update"
        path="/branchVisit/update"
        returnPath="/hr/branch/visit/list"
      />
    </div>
  );
};

export default BranchVisitEdit;
