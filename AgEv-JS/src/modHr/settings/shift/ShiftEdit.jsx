import React from "react";
import { useParams } from "react-router-dom";
import TopHeader from "../../../components/TopHeader";
import ShiftForm from "./ShiftForm";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { useGetData } from "../../../hooks/dataApi";

const ShiftEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("settingShift", `/shifts/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Shift"
        btn="Return"
        path="/hr/settings/shift/list"
      />
      <ShiftForm
        defaultValues={{
          shiftId: list.data.shiftId,
          shiftName: list.data.shiftName,
          shiftIn: new Date(Date.parse(list.data.shiftIn)),
          shiftOut: new Date(Date.parse(list.data.shiftOut)),
          shiftAbsent: new Date(Date.parse(list.data.shiftAbsent)),
          shiftLate: new Date(Date.parse(list.data.shiftLate)),
          shiftEarly: new Date(Date.parse(list.data.shiftEarly)),
          shiftLunchFrom: new Date(Date.parse(list.data.shiftLunchFrom)),
          shiftLunchTill: new Date(Date.parse(list.data.shiftLunchTill)),
          shiftLastPunch: new Date(Date.parse(list.data.shiftLastPunch)),
          defaultShift: list.data.defaultShift,
        }}
        action={refetch}
        btnText="Update"
        path="/shifts/update"
        returnPath="/hr/settings/shift/list"
      />
    </div>
  );
};

export default ShiftEdit;
