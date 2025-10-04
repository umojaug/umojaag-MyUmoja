import React, { useState } from "react";
import TopHeader from "../../components/TopHeader";
import SearchByCategory from "../../components/SearchByCategory";
import MessageSearch from "./MessageSearch";

const Message = () => {
  const [dataSearch, setdataSearch] = useState();

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Send Message" />
      <SearchByCategory action={setdataSearch} />
      {dataSearch && <MessageSearch search={dataSearch} />}
    </div>
  );
};

export default Message;
