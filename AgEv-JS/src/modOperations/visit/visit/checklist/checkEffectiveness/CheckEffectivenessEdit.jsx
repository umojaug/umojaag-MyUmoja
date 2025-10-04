import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import TopHeader from "../../../../../components/TopHeader";
import { useGetData } from "../../../../../hooks/dataApi";
import CheckEffectivenessForm from "./BankInfoForm";

const CheckEffectivenessEdit = () => {
  const { id } = useParams();

  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("bmBankInfo", `/bmBankInfo/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Bank information: "
        btn="Return"
        path={`/ops/bm/visit/preview/${list.data.bmVisitId}`}
      />
      <CheckEffectivenessForm
        defaultValues={{
          opsBmBankInfoId: list.data.opsBmBankInfoId,
          bmVisitId: list.data.bmVisitId,
          fundReceivedBranch: list.data.fundReceivedBranch,
          fundReceivedAmount: list.data.fundReceivedAmount,
          fundTransferBranch: list.data.fundTransferBranch,
          fundTransferAmount: list.data.fundTransferAmount,
          bankWithdraw: list.data.bankWithdraw,
          bankDeposit: list.data.bankDeposit,
          bankBalance: list.data.bankBalance,
        }}
        action={refetch}
        btnText="Update"
        path="/bmBankInfo/update"
        returnPath={`/ops/bm/visit/preview/${list.data.bmVisitId}`}
      />
    </div>
  );
};

export default CheckEffectivenessEdit;
