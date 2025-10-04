import TopHeader from "../../../components/TopHeader";
import TicketClosedList from "./TicketClosedList";
import SearchDateRange from "../../../components/SearchDateRange";
import { useState } from "react";

const TicketClosed = () => {
  const [dataForm, setDataForm] = useState(false);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Closed Ticket" />
      <SearchDateRange action={setDataForm} />
      {dataForm && <TicketClosedList dataForm={dataForm} />}
    </div>
  );
};

export default TicketClosed;
