import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import TopHeader from "../../../../../components/TopHeader";
import { useGetData } from "../../../../../hooks/dataApi";
import DepartmentForm from "./AmRecordKeepingForm";

const AmRecordKeepingEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("amRecordKeeping", `/amRecordKeeping/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit AM Record Keeping"
        btn="Return"
        path={`/ops/am/visit/preview/${list.data.amVisitId}`}
      />
      <DepartmentForm
        defaultValues={{
          opsAmRecordKeepingId: list.data.opsAmRecordKeepingId,
          amVisitId: list.data.amVisitId,
          booksAccount: list.data.booksAccount,
          matchedWith: list.data.matchedWith,
          finding: list.data.finding,
          suggestion: list.data.suggestion,
          remarks: list.data.remarks,
        }}
        action={refetch}
        btnText="Update"
        path="/amRecordKeeping/update"
        returnPath={`/ops/am/visit/preview/${list.data.amVisitId}`}
      />
    </div>
  );
};

export default AmRecordKeepingEdit;
