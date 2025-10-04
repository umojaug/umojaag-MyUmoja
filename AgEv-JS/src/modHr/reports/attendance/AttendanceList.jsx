import React, { useState } from "react";
import TopHeader from "../../../components/TopHeader";
import AttendanceSearch from "./AttendanceSearch";
import SearchDateRange from "../../../components/SearchDateRange";

const AttendanceList = () => {
  const [dataForm, setDataForm] = useState("");

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Attendance List" />

      <SearchDateRange action={setDataForm} />
      {dataForm && <AttendanceSearch dataForm={dataForm} />}
    </div>
  );
};

export default AttendanceList;
