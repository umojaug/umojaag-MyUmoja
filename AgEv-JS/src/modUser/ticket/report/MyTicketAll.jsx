import TopHeader from "../../../components/TopHeader";
import MyTicketAllList from "./MyTicketAllList";
import SearchDateRange from "../../../components/SearchDateRange";
import { useState } from "react";

const MyTicketAll = () => {
  const [dataForm, setDataForm] = useState(false);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="My Ticket All List" />
      <SearchDateRange action={setDataForm} />
      {dataForm && <MyTicketAllList dataForm={dataForm} />}
    </div>
  );
};

export default MyTicketAll;
