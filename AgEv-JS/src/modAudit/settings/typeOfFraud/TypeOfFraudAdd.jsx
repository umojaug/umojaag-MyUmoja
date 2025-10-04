import React from "react";
import TopHeader from "../../../components/TopHeader";
import TypeOfFraudForm from "./TypeOfFraudForm";

const TypeOfFraudAdd = () => {
  const defaultValues = {
    typeOfFraudId: "",
    typeOfFraudName: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Type Of Fraud Create"
        btn="Return"
        path="/audit/settings/typeOfFraud/list"
      />
      <TypeOfFraudForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/typeOfFraud/create"
        returnPath="/audit/settings/typeOfFraud/list"
      />
    </div>
  );
};

export default TypeOfFraudAdd;
