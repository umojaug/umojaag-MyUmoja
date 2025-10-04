import React from "react";
import TopHeader from "../../../../../components/TopHeader";
import { useParams } from "react-router-dom";
import HighlightsForm from "./HighlightsForm";

const HighlightsAdd = () => {
  const { id } = useParams();
  const defaultValues = {
    opsAmHighlightsId: 0,
    amVisitId: id,
    issues: "",
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="6. Today’s burning issues: "
        btn="Return"
        path={`/ops/am/visit/preview/${id}`}
      />
      <HighlightsForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/amHighlights/create"
        returnPath={`/ops/am/visit/preview/${id}`}
      />
    </div>
  );
};

export default HighlightsAdd;
