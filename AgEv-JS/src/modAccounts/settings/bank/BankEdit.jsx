import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";

import BankForm from "./BankForm";

const BankEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrBank", `/banks/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Edit Bank" btn="Return" path="/ac/settings/bank/list" />
      <BankForm
        defaultValues={{
          bankId: list.data.bankId,
          bankName: list.data.bankName,
        }}
        action={refetch}
        btnText="Update"
        path="/banks/update"
        returnPath="/ac/settings/bank/list"
      />
    </div>
  );
};

export default BankEdit;
