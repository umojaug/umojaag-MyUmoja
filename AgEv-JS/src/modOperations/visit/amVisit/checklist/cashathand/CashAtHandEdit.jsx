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
  } = useGetData("amCashAtHand", `/amCashAtHand/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Cash at hand information "
        btn="Return"
        path={`/ops/am/visit/preview/${list.data.amVisitId}`}
      />
      <CashAtHandForm
        defaultValues={{
          opsAmCashAtHandId: list.data.opsAmCashAtHandId,
          amVisitId: list.data.amVisitId,
          cashbookAmount: list.data.cashbookAmount,
          physicalAmount: list.data.physicalAmount,
          remarks: list.data.remarks,
        }}
        action={refetch}
        btnText="Update"
        path="/amCashAtHand/update"
        // returnPath={`/ops/am/cash/preview/${list.data.amVisitId}`}
        returnPath={`/ops/am/visit/preview/${list.data.amVisitId}`}
      />
    </div>
  );
};

export default AmCashAtHandEdit;
