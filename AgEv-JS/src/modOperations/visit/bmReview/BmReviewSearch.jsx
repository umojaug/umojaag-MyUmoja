import React, { useState } from "react";
import TopHeader from "../../../components/TopHeader";
import SearchDateRange from "../../../components/SearchDateRange";
import moment from "moment";
import BmReviewList from "./BmReviewList";

const BmReviewSearch = () => {
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
      <TopHeader title="My Visit Review List" />
      <SearchDateRange action={setDataForm} />
      {dataForm && <BmReviewList dataForm={dataForm} />}
    </div>
  );
};

export default BmReviewSearch;
