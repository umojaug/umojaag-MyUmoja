import React from "react";
import TopHeader from "../../../components/TopHeader";

import EducationForm from "./EducationForm";

const EducationAdd = () => {
  const defaultValues = {
    educationId: "",
    educationName: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="New Education"
        btn="Return"
        path="/hr/settings/education/list"
      />
      <EducationForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/educations/create"
        returnPath="/hr/settings/education/list"
      />
    </div>
  );
};

export default EducationAdd;
