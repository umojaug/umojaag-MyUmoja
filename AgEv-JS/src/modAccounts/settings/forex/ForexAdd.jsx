import React from "react";
import TopHeader from "../../../components/TopHeader";
import ForexForm from "./ForexForm";

const ForexAdd = () => {
  const defaultValues = {
    forexId: "",
    forexName: "",
    ForexRate: "",
    workDate: new Date(),
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="New Forex"
        btn="Return"
        path="/ac/settings/forex/list"
      />
      <ForexForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/forexes/create"
        returnPath="/ac/settings/forex/list"
      />
    </div>
  );
};

export default ForexAdd;
