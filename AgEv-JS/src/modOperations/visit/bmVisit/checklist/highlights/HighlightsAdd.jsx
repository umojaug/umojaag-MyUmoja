import React from "react";
import TopHeader from "../../../../../components/TopHeader";
import { useParams } from "react-router-dom";
import HighlightsForm from "./HighlightsForm";

const HighlightsAdd = () => {
  const { id } = useParams();
  const defaultValues = {
    opsBmHighlightsId: 0,
    bmVisitId: id,
    issues: "",
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="7. Today’s burning issues: "
        btn="Return"
        path={`/ops/bm/visit/preview/${id}`}
      />
      <HighlightsForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/bmHighlights/create"
        returnPath={`/ops/bm/visit/preview/${id}`}
      />
    </div>
  );
};

export default HighlightsAdd;
