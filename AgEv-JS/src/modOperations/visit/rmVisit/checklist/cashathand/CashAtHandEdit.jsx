import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../../../components/TopHeader";
import { useGetData } from "../../../../../hooks/dataApi";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import CashAtHandForm from "./CashAtHandForm";

const AmCashAtHandEdit = () => {
  const { id } = useParams();

  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("rmCashAtHand", `/rmCashAtHand/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Cash at hand information "
        btn="Return"
        path={`/ops/rm/visit/preview/${list.data.rmVisitId}`}
      />
      <CashAtHandForm
        defaultValues={{
          opsRmCashAtHandId: list.data.opsRmCashAtHandId,
          rmVisitId: list.data.rmVisitId,
          cashbookAmount: list.data.cashbookAmount,
          physicalAmount: list.data.physicalAmount,
          remarks: list.data.remarks,
        }}
        action={refetch}
        btnText="Update"
        path="/rmCashAtHand/update"
        // returnPath={`/ops/rm/cash/preview/${list.data.rmVisitId}`}
        returnPath={`/ops/rm/visit/preview/${list.data.rmVisitId}`}
      />
    </div>
  );
};

export default AmCashAtHandEdit;
