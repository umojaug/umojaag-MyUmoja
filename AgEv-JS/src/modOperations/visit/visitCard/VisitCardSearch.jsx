import React, { useState } from "react";
import SearchDateRange from "../../../components/SearchDateRange";
import moment from "moment";
import VisitCardList from "./VisitCardList";

const VisitCardSearch = () => {
  const d = new Date();
  const [dataForm, setDataForm] = useState({
    fromDate: moment.utc(new Date()).local().format("DD-MMM-YYYY"),
    tillDate: moment.utc(new Date()).local().format("DD-MMM-YYYY"),
  });

  return (
    <>
      <SearchDateRange action={setDataForm} day={d.getDate()} />
      {dataForm && <VisitCardList dataForm={dataForm} />}
    </>
  );
};

export default VisitCardSearch;
