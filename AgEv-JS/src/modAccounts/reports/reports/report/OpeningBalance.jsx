import React from "react";
import { useGetData } from "../../../../hooks/dataApi";
import { HashLoading } from "../../../../components/Loading";
import Error from "../../../../components/Error";

const OpeningBalance = ({ fromDate, ledgerId }) => {

  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "acLedgerReport",
    `/acLedgerReport/openingBalance/${ledgerId}/${fromDate}`
  );

  if (isLoading) return <HashLoading />;
  if (isError) return <Error message={error?.message} />;

  return (
    <div>
      <p>
        <span className="font-bold">Opening Balance:</span>
        {list.data.openingBalance}
      </p>
    </div>
  );
};

export default OpeningBalance;
