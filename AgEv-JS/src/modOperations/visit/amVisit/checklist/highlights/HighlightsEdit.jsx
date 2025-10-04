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
  } = useGetData("amHighlights", `/amHighlights/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Today’s burning issues "
        btn="Return"
        path={`/ops/am/visit/preview/${list.data.amVisitId}`}
      />
      <HighlightsForm
        defaultValues={{
          opsAmHighlightsId: list.data.opsAmHighlightsId,
          amVisitId: list.data.amVisitId,
          issues: list.data.issues,
        }}
        action={refetch}
        btnText="Update"
        path="/amHighlights/update"
        returnPath={`/ops/am/visit/preview/${list.data.amVisitId}`}
      />
    </div>
  );
};

export default HighlightsEdit;
