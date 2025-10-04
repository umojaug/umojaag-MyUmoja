import React, { useState } from "react";
import TopHeader from "../../../components/TopHeader";

import SearchMonthYear from "../../../components/SearchMonthYear";
import MyTimeLogCardSummery from "./MyTimeLogCardSummery";

const MyTimeLogCard = () => {
  const [dataForm, setDataForm] = useState(false);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Time Card" />
      <SearchMonthYear action={setDataForm} displaySearch={true} />
      {dataForm && <MyTimeLogCardSummery dataForm={dataForm} />}
    </div>
  );
};

export default MyTimeLogCard;
