import React from "react";
import TopHeader from "../../../components/TopHeader";
import ShiftForm from "./ShiftForm";

const ShiftAdd = () => {
  const defaultValues = {
    shiftId: "",
    shiftName: "",
    shiftIn: "",
    shiftOut: "",
    shiftAbsent: "",
    shiftLate: "",
    shiftEarly: "",
    shiftLunchFrom: "",
    shiftLunchTill: "",
    shiftLastPunch: "",
    defaultShift: false,
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="New Shift"
        btn="Return"
        path="/hr/settings/shift/list"
      />
      <ShiftForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/shifts/create"
        returnPath="/hr/settings/shift/list"
      />
    </div>
  );
};

export default ShiftAdd;
