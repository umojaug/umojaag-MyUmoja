import React from "react";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol } from "../../../components/ListColWithHeader";

const LedgerName = ({ ledgerId }) => {
  const {
    data: list,
    isLoading,
    isError,
    error,
  } = useGetData("JournalLedger", `/acLedger/journalLedger/${ledgerId}`);
  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;
  return <ListCol label="Ledger Name : " value={list.data.ledgerName} />;
};

export default LedgerName;
