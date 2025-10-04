import TopHeader from "../../../components/TopHeader";
import MyTicketCountryList from "./MyTicketCountryList";
import SearchDateRange from "../../../components/SearchDateRange";
import { useState } from "react";

const MyTicketCountry = () => {
  const [dataForm, setDataForm] = useState(false);

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Country Wise Ticket" />
      <SearchDateRange action={setDataForm} />
      {dataForm && <MyTicketCountryList dataForm={dataForm} />}
    </div>
  );
};

export default MyTicketCountry;
