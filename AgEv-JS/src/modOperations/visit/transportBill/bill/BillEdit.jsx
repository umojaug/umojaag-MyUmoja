import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../../components/TopHeader";
import Error from "../../../../components/Error";
import { HashLoading } from "../../../../components/Loading";
import { useGetData } from "../../../../hooks/dataApi";
import BillForm from "./BillForm";

const BillEdit = () => {
  const { id } = useParams();

  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("travelingBill", `/myTravelingBill/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Travel Bill Update"
        btn="Return"
        path={`/ops/transportBill/list/${id}`}
      />
      <BillForm
        defaultValues={{
          travelId: list.data.travelId,
          travelingDate: new Date(list.data.travelingDate),
          checkedBy: list.data.checkedBy,
          remarks: list.data.remarks,
          managerId: list.data.managerId,
          title: list.data.title,
          fileUrl: list.data.fileUrl,
        }}
        action={refetch}
        btnText="Update"
        path={`/ops/transportBill/list/${id}`}
      />
    </div>
  );
};

export default BillEdit;
