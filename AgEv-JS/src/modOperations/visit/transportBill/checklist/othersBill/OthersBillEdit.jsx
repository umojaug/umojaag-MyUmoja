import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../../../../components/Error";
import { HashLoading } from "../../../../../components/Loading";
import TopHeader from "../../../../../components/TopHeader";
import { useGetData } from "../../../../../hooks/dataApi";
import OthersBillForm from "./OthersBillForm";

const OthersBillEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("travelingBill", `/myOthersBill/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Others Bill"
        btn="Return"
        path={`/ops/transportBill/preview/${list.data.travelId}`}
      />
      <OthersBillForm
        defaultValues={{
          othersBillId: list.data.othersBillId,
          travelId: list.data.travelId,
          daAllowance: list.data.daAllowance,
          hotelRent: list.data.hotelRent,
          miscellaneous: list.data.miscellaneous,
        }}
        action={refetch}
        btnText="Update"
        path="/myOthersBill/update"
        returnPath={`/ops/transportBill/preview/${list.data.travelId}`}
      />
    </div>
  );
};

export default OthersBillEdit;
