import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../../../components/TopHeader";
import { useGetData } from "../../../../../hooks/dataApi";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import HighlightsForm from "./HighlightsForm";

const HighlightsEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("rmHighlights", `/rmHighlights/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Today’s burning issues "
        btn="Return"
        path={`/ops/rm/visit/preview/${list.data.rmVisitId}`}
      />
      <HighlightsForm
        defaultValues={{
          opsRmHighlightsId: list.data.opsRmHighlightsId,
          rmVisitId: list.data.rmVisitId,
          issues: list.data.issues,
        }}
        action={refetch}
        btnText="Update"
        path="/rmHighlights/update"
        returnPath={`/ops/rm/visit/preview/${list.data.rmVisitId}`}
      />
    </div>
  );
};

export default HighlightsEdit;
