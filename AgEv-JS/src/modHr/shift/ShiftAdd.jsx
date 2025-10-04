import React from "react";
import TopHeader from "../../components/TopHeader";
import ShiftForm from "./ShiftForm";

const ShiftAdd = () => {
  const defaultValues = {
    shiftName: "",
    fromData: new Date(),
    tillDate: new Date(),
    workDate: new Date(),
    particulars: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Shift Create" btn="Return" path="/hr/shift/list" />
      <ShiftForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/hr/shift/create"
        returnPath="/hr/shift/list"
      />
    </div>
  );
};

export default ShiftAdd;
