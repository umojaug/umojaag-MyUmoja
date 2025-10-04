import React from "react";
import RemarksForm from "./RemarksForm";
import TopHeader from "../../../components/TopHeader";

const RemarksAdd = () => {
  const defaultValues = {
    remarksId: "",
    particulars: "",
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Are You Sure Want To Empty Database?" />

      <RemarksForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Database Reset"
        path="/cleareDatabase/databaseReset"
      />
    </div>
  );
};

export default RemarksAdd;
