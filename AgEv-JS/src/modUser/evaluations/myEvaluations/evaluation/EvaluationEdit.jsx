import React from "react";
import { useParams } from "react-router-dom";
import EvaluationForm from "./EvaluationForm";
import Error from "../../../../components/Error";
import { HashLoading } from "../../../../components/Loading";
import TopHeader from "../../../../components/TopHeader";
import { useGetData } from "../../../../hooks/dataApi";

const EvaluationEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("evaluation", `/evaluation/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Evaluation Edit"
        btn="Return"
        path="/my/evaluation/list"
      />
      <EvaluationForm
        defaultValues={{
          evaluationId: list.data.evaluationId,
          evaluationTypeId: list.data.evaluationTypeId,
          managerId: list.data.managerId,
        }}
        action={refetch}
        btnText="Update"
        path="/evaluation/update"
        returnPath="/my/evaluation/list"
      />
    </div>
  );
};

export default EvaluationEdit;
