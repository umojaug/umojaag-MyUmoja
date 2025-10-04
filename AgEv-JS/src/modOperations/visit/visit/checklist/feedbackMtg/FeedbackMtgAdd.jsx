import React from "react";
import { useParams } from "react-router-dom";
import FeedbackMtgForm from "./FeedbackMtgForm";
import GlobalModalForm from "../../../../../components/GlobalModalForm";

const FeedbackMtgAdd = () => {
  const { id } = useParams();
  const defaultValues = {
    allFeedbackId: 0,
    allVisitId: id,
    nameOfAttendees: "",
    discussedIssues: "",
    givenFeedback: "",
    remarks: "",
    imageUrl: "1vyhSgRVvN5Y7FaTX2HBLGse7i2BmkDN6",
  };

  return (
    <GlobalModalForm title="Feedback Meeting">
      <FeedbackMtgForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/allFeedback/create"
        returnPath={`/ops/visit/preview/${id}`}
      />
    </GlobalModalForm>
  );
};

export default FeedbackMtgAdd;
