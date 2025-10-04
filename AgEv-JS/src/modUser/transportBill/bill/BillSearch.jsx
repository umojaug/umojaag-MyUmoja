import React, { useState } from "react";
import moment from "moment";
import BillList from "./BillList";
import TopHeader from "../../../components/TopHeader";
import SearchDateRange from "../../../components/SearchDateRange";

const BillSearch = () => {
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
        title="Transport Bill"
        btn="Save"
        path="/transportBill/add"
      />
      <SearchDateRange action={setDataForm} />
      {dataForm && <BillList dataForm={dataForm} />}
    </div>
  );
};

export default BillSearch;
