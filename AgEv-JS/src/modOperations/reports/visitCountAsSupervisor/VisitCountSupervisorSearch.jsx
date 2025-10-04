import React, { useState } from "react";
import moment from "moment";
import TopHeader from "../../../components/TopHeader";
import SearchDateRange from "../../../components/SearchDateRange";
import VisitCountSupervisorList from "./VisitCountSupervisorList";

const VisitCountSupervisorSearch = () => {
  var date = new Date();
  const [dataForm, setDataForm] = useState({
    fromDate: moment
      .utc(new Date(date.getFullYear(), date.getMonth(), 1))
      .local()
      .format("DD-MMM-YYYY"),
    tillDate: moment.utc(new Date()).local().format("DD-MMM-YYYY"),
  });

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Number of Visits for Approval"
        btn="Return"
        path="/ops/reports"
      />
      <SearchDateRange action={setDataForm} />
      {dataForm && <VisitCountSupervisorList dataForm={dataForm} />}
    </div>
  );
};

export default VisitCountSupervisorSearch;
