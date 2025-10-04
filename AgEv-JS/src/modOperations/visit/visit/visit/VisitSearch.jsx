import React, { useState } from "react";
import moment from "moment";
import VisitList from "./VisitList";
import TopHeader from "../../../../components/TopHeader";
import SearchDateRange from "../../../../components/SearchDateRange";

const VisitSearch = () => {
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
      <TopHeader title="Visit List" btn="Save" path="/ops/visit/add" />
      <SearchDateRange action={setDataForm} />
      {dataForm && <VisitList dataForm={dataForm} />}
    </div>
  );
};

export default VisitSearch;
