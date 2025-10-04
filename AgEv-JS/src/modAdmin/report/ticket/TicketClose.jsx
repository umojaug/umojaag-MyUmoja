import React, { useState } from "react";
import TopHeader from "../../../components/TopHeader";
import SearchDateRange from "../../../components/SearchDateRange";
import TicketCloseList from "./TicketCloseList";

const TicketClose = () => {
  const [dataForm, setDataForm] = useState(false);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Close Ticket list" />
      <SearchDateRange action={setDataForm} />
      {dataForm && <TicketCloseList dataForm={dataForm} />}
    </div>
  );
};

export default TicketClose;
