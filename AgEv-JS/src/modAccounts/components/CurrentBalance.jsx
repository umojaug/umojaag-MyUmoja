import React from "react";
import InputNumber from "../../components/InputNumber";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import { extractParts } from "../../utils/ExtractParts";

function CurrentBalance({ ledgerId }) {
  const currencyType = import.meta.env.VITE_CURRENCY;
  const { id: bankOrCashId } = extractParts(ledgerId);
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("accountBalance", `/voucher/balance/${bankOrCashId}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div>
      <label>Current Balance({currencyType})</label>
      <input
        type="text"
        className="form-control bg-gray-100"
        name="balance"
        value={typeof list.data === "number" ? list.data.toLocaleString() : 0}
        disabled
      />
    </div>
  );
}

export default CurrentBalance;
