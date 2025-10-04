import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../components/TopHeader";
import ShiftForm from "./ShiftForm";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import { useGetData } from "../../hooks/dataApi";

const ShiftEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("shift", `/hr/shift/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Shift Update" btn="Return" path="/hr/shift/list" />
      <ShiftForm
        defaultValues={{
          id: list.data.id,
          shiftName: list.data.shiftName,
          fromData: new Date(list.data.fromData),
          tillDate: new Date(list.data.tillDate),
          workDate: new Date(list.data.workDate),
          particulars: list.data.particulars,
        }}
        action={refetch}
        btnText="Update"
        path="/hr/shift/update"
        returnPath="/hr/shift/list"
      />
    </div>
  );
};

export default ShiftEdit;
