import React from "react";
import CommentForm from "./CommentForm";
import { useParams } from "react-router-dom";

const CommentAdd = () => {
  const { id } = useParams();

  // call api here for get comment

  const defaultValues = {
    allVisitId: id,
    ctlComments: "",
  };

  return (
    <CommentForm
      defaultValues={defaultValues}
      btnText="Save"
      path="/allVisit/CtlComments"
      action={() => {}}
    />
  );
};

export default CommentAdd;
