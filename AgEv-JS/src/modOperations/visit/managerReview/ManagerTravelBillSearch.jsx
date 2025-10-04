import React, { useState } from "react";
import moment from "moment";
import ManagerTravelBillList from "./ManagerTravelBillList";
import TopHeader from "../../../components/TopHeader";
import SearchDateRange from "../../../components/SearchDateRange";

const ManagerTravelBillSearch = () => {
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
        path="/ops/supervisor/review/visit/list"
      />
      <SearchDateRange action={setDataForm} />
      {dataForm && <ManagerTravelBillList dataForm={dataForm} />}
    </div>
  );
};

export default ManagerTravelBillSearch;
