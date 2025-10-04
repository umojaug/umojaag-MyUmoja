import React from "react";
import BillForm from "./BillForm";
import { useParams } from "react-router-dom";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import TopHeader from "../../../components/TopHeader";

const BillEdit = () => {
  const { id } = useParams();

  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("travelingBill", `/userMyTravelingBill/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Transport Bill Update"
        btn="Return"
        path="/transportBill/list"
      />
      <BillForm
        defaultValues={{
          travelId: list.data.travelId,
          travelingDate: new Date(list.data.travelingDate),
          remarks: list.data.remarks,
          managerId: list.data.managerId,
          fileUrl: list.data.fileUrl,
        }}
        action={refetch}
        btnText="Update"
        path="/userMyTravelingBill/update"
        returnPath="/transportBill/list"
      />
    </div>
  );
};

export default BillEdit;
