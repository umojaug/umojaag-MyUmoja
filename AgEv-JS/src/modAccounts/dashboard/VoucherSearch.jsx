import React, { useState } from "react";
import VoucherSearchList from "./VoucherSearchList";
import SearchHeader from "../../components/SearchHeader";

const VoucherSearch = () => {
  const [query, setQuery] = useState("");
  return (
    <div className="">
      <SearchHeader action={setQuery} placeholder="Voucher Number" />
      {query && <VoucherSearchList voucherNumber={query} />}
    </div>
  );
};

export default VoucherSearch;
