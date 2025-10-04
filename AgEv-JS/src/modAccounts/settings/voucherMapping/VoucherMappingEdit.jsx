import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../components/TopHeader";
import VoucherMappingForm from "./VoucherMappingForm";
import { useGetData } from "../../../hooks/dataApi";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";

const VoucherMappingEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrForex", `/VoucherMapping/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Voucher Mapping"
        btn="Return"
        path="/ac/settings/VoucherMapping/list"
      />
      <VoucherMappingForm
        defaultValues={{
          voucherMappingId: list.data.voucherMappingId,
          loanProductId: list.data.loanProductId,
          transactionType: list.data.transactionType,
          ledgerId: list.data.ledgerId,
          type: list.data.type,
        }}
        action={refetch}
        btnText="Update"
        path="/VoucherMapping/update"
        returnPath="/ac/settings/VoucherMapping/list"
      />
    </div>
  );
};

export default VoucherMappingEdit;
