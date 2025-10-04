import React from "react";
import TopHeader from "../../components/TopHeader";

import TourForm from "./TourForm";

const TourAdd = () => {
  const defaultValues = {
    tourType: "",
    fromDate: new Date(),
    tillDate: new Date(),
    workDate: new Date(),
    applicationDate: new Date(),
    particulars: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Tour" btn="Return" path="/hr/tour/list" />
      <TourForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/tour/create"
        returnPath="/hr/tour/list"
      />
    </div>
  );
};

export default TourAdd;
