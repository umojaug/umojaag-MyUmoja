import React from "react";
import { useGetData } from "../../../../../hooks/dataApi";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import FeedbackMtgForm from "./FeedbackMtgForm";
import GlobalModalForm from "../../../../../components/GlobalModalForm";
import { AiOutlineForm } from "react-icons/ai";

const FeedbackMtgEdit = ({ id }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("allFeedback", `/allFeedback/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <GlobalModalForm
      title="Edit Feedback Message"
      buttonIcon={<AiOutlineForm size={24} />}
      buttonClassName="btn-sky w-12 h-10"
    >
      <FeedbackMtgForm
        defaultValues={{
          allFeedbackId: list.data.allFeedbackId,
          allVisitId: list.data.allVisitId,
          nameOfAttendees: list.data.nameOfAttendees,
          discussedIssues: list.data.discussedIssues,
          givenFeedback: list.data.givenFeedback,
          remarks: list.data.remarks,
          imageUrl: list.data.imageUrl,
        }}
        action={refetch}
        btnText="Update"
        path="/allFeedback/update"
        returnPath={`/ops/visit/preview/${list.data.allVisitId}`}
      />
    </GlobalModalForm>
  );
};

export default FeedbackMtgEdit;
