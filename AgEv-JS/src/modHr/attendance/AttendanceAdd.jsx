import React from "react";
import TopHeader from "../../components/TopHeader";
import AttendanceForm from "./AttendanceForm";

const AttendanceAdd = () => {
  const defaultValues = {
    pinName: "",
    attenStatus: "Absent",
    fromDate: new Date(),
    tillDate: new Date(),
    particulars: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Attendances Create"
        btn="Return"
        path="/hr/attendance/list"
      />
      <AttendanceForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/empattendance/create"
        returnPath="/hr/attendance/list"
      />
    </div>
  );
};

export default AttendanceAdd;
