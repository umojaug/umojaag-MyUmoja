import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import TypeOfFraudForm from "./TypeOfFraudForm";

const TypeOfFraudEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrDepartment", `/typeOfFraud/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Type Of Fraud"
        btn="Return"
        path="/audit/settings/typeOfFraud/list"
      />
      <TypeOfFraudForm
        defaultValues={{
          typeOfFraudId: list.data.typeOfFraudId,
          typeOfFraudName: list.data.typeOfFraudName,
        }}
        action={refetch}
        btnText="Update"
        path="/typeOfFraud/update"
        returnPath="/audit/settings/typeOfFraud/list"
      />
    </div>
  );
};

export default TypeOfFraudEdit;
