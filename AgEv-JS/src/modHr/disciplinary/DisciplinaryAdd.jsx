import React from "react";
import TopHeader from "../../components/TopHeader";
import DisciplinaryForm from "./DisciplinaryForm";

const DisciplinaryAdd = () => {
  const defaultValues = {
    pinName: "",
    letterType: "",
    issueDate: new Date(),
    title: "",
    particulars: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Disciplinary Letter Create"
        btn="Return"
        path="/hr/disciplinary/list"
      />
      <DisciplinaryForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/empdisciplinaryletter/create"
        returnPath="/hr/disciplinary/list"
      />
    </div>
  );
};

export default DisciplinaryAdd;
