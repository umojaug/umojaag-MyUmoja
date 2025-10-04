import React from "react";
import TopHeader from "../../../../../components/TopHeader";
import { useParams } from "react-router-dom";
import HighlightsForm from "./HighlightsForm";

const HighlightsAdd = () => {
  const { id } = useParams();
  const defaultValues = {
    opsRmHighlightsId: 0,
    rmVisitId: id,
    issues: "",
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="6. Today’s burning issues: "
        btn="Return"
        path={`/ops/rm/visit/preview/${id}`}
      />
      <HighlightsForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/rmHighlights/create"
        returnPath={`/ops/rm/visit/preview/${id}`}
      />
    </div>
  );
};

export default HighlightsAdd;
