import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../../../components/TopHeader";
import { useGetData } from "../../../../../hooks/dataApi";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import CashAtHandForm from "./CashAtHandForm";

const BmCashAtHandEdit = () => {
  const { id } = useParams();

  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("bmCashAtHand", `/bmCashAtHand/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Cash at hand information "
        btn="Return"
        path={`/ops/bm/visit/preview/${list.data.bmVisitId}`}
      />
      <CashAtHandForm
        defaultValues={{
          opsBmCashAtHandId: list.data.opsBmCashAtHandId,
          bmVisitId: list.data.bmVisitId,
          openingBalance: list.data.openingBalance,
          closingBalance: list.data.closingBalance,
          aboveCeilingReason: list.data.aboveCeilingReason,
        }}
        action={refetch}
        btnText="Update"
        path="/bmCashAtHand/update"
        returnPath={`/ops/bm/visit/preview/${list.data.bmVisitId}`}
      />
    </div>
  );
};

export default BmCashAtHandEdit;
