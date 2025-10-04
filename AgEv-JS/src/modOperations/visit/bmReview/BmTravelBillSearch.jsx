import React, { useState } from "react";
import moment from "moment";
import TopHeader from "../../../components/TopHeader";
import SearchDateRange from "../../../components/SearchDateRange";
import BmTravelBillList from "./BmTravelBillList";

const BmTravelBillSearch = () => {
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
        title="Travel Bill List"
        btn="Return"
        path="/ops/bm/review/visit/list"
      />
      <SearchDateRange action={setDataForm} />
      {dataForm && <BmTravelBillList dataForm={dataForm} />}
    </div>
  );
};

export default BmTravelBillSearch;
