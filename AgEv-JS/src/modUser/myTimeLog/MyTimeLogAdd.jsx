import React from "react";
import TopHeader from "../../components/TopHeader";
import MyTimeLogForm from "./MyTimeLogForm";

const MyTimeLogAdd = () => {
  const defaultValues = {
    taskName: "",
    taskHour: "",
    taskDate: new Date(),
    // advanceStatus: "",
    pinName: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="My Time Log Application"
        btn="Return"
        path="/myTimeLogNew"
      />
      <MyTimeLogForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/myTimeLog/create"
        returnPath="/myTimeLogNew"
      />
    </div>
  );
};

export default MyTimeLogAdd;
