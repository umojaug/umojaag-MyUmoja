import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../components/TopHeader";
import SubLedgerForm from "./SubLedgerForm";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import { useGetData } from "../../../hooks/dataApi";

const SubLedgerEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("subLedgerDetails", `/acSubLedger/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit SubLedger"
        btn="Return"
        path="/ac/settings/subLedger/list"
      />
      <SubLedgerForm
        defaultValues={{
          subLedgerId: list.data.subLedgerId,
          subLedgerName: list.data.subLedgerName,
          ledgerId: list.data.ledgerId,
        }}
        action={refetch}
        btnText="Update"
        path="/acSubLedger/update"
        returnPath="/ac/settings/subLedger/list"
      />
    </div>
  );
};

export default SubLedgerEdit;
