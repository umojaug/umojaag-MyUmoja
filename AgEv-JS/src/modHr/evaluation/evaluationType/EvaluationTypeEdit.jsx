import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import EvaluationTypeForm from "./EvaluationTypeForm";

const EvaluationTypeEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrevaluationtypedetails", `/evaluationtype/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Evaluation Type"
        btn="Return"
        path="/hr/evaluation/type/list"
      />
      <EvaluationTypeForm
        defaultValues={{
          evaluationTypeId: list.data.evaluationTypeId,
          evaluationTypeName: list.data.evaluationTypeName,
          frequency: list.data.frequency,
        }}
        action={refetch}
        btnText="Update"
        path="/evaluationtype/update"
        returnPath="/hr/evaluation/type/list"
      />
    </div>
  );
};

export default EvaluationTypeEdit;
