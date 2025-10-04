import React from "react";
import TopHeader from "../../../components/TopHeader";
import HolidayForm from "./HolidayForm";

const HolidayAdd = () => {
  const defaultValues = {
    holidayId: "",
    holidayName: "",
    fromDate: new Date(),
    tillDate: new Date(),
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="New Holiday"
        btn="Return"
        path="/admin/settings/holiday/list"
      />
      <HolidayForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/holidays/create"
        returnPath="/admin/settings/holiday/list"
      />
    </div>
  );
};

export default HolidayAdd;
