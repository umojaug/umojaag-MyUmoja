import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import TopHeader from "../../../../../components/TopHeader";
import { useGetData } from "../../../../../hooks/dataApi";
import RmRecordKeepingForm from "./RmRecordKeepingForm";

const RmRecordKeepingEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("rmRecordKeeping", `/rmRecordKeeping/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit RM Record Keeping"
        btn="Return"
        path={`/ops/rm/visit/preview/${list.data.rmVisitId}`}
      />
      <RmRecordKeepingForm
        defaultValues={{
          opsRmRecordKeepingId: list.data.opsRmRecordKeepingId,
          rmVisitId: list.data.rmVisitId,
          booksAccount: list.data.booksAccount,
          matchedWith: list.data.matchedWith,
          finding: list.data.finding,
          suggestion: list.data.suggestion,
          remarks: list.data.remarks,
        }}
        action={refetch}
        btnText="Update"
        path="/rmRecordKeeping/update"
        returnPath={`/ops/rm/visit/preview/${list.data.rmVisitId}`}
      />
    </div>
  );
};

export default RmRecordKeepingEdit;
