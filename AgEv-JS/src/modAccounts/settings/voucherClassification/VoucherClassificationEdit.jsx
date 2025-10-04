import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import VoucherClassificationForm from "./VoucherClassificationForm";

const VoucherClassificationEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrBank", `/voucherClassification/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Voucher Classification"
        btn="Return"
        path="/ac/settings/classification/list"
      />
      <VoucherClassificationForm
        defaultValues={{
          classificationId: list.data.classificationId,
          classificationName: list.data.classificationName,
        }}
        action={refetch}
        btnText="Update"
        path="/voucherClassification/update"
        returnPath="/ac/settings/classification/list"
      />
    </div>
  );
};

export default VoucherClassificationEdit;
