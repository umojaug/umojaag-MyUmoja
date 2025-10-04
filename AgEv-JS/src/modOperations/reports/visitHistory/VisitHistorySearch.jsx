import React, { useState } from "react";
import moment from "moment";

import VisitHistoryList from "./VisitHistoryList";
import TopHeader from "../../../components/TopHeader";
import SearchDateRange from "../../../components/SearchDateRange";

const VisitHistorySearch = () => {
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
      <TopHeader title="All Visit History" btn="Return" path="/ops/reports" />
      <SearchDateRange action={setDataForm} />
      {dataForm && <VisitHistoryList dataForm={dataForm} />}
    </div>
  );
};

export default VisitHistorySearch;
