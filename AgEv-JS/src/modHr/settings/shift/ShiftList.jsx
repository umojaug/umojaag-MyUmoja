import React from "react";
import TopHeader from "../../../components/TopHeader";
import EditButton from "../../../components/button/EditButton";
import DeleteButton from "../../../components/button/DeleteButton";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import { format } from "date-fns";

const ShiftList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("settingShift", "/shifts/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Shift" btn="Save" path="/hr/settings/shift/add" />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-11 list-header">
          <ListHeader label="Name" />
          <ListHeader label="In" />
          <ListHeader label="Out" />
          <ListHeader label="Absent" />
          <ListHeader label="Late" />
          <ListHeader label="Early" />
          <ListHeader label="Lunch From" />
          <ListHeader label="Lunch Till" />
          <ListHeader label="Last Punch" />
          <ListHeader label="Default Shift" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.shiftId}
              className="grid grid-cols-1 md:grid-cols-11 list-body"
            >
              <ListCol label="Name:" value={item.shiftName} />
              <ListCol
                label="In:"
                value={format(new Date(item.shiftIn), "hh:mm aa")}
              />
              <ListCol
                label="Out:"
                value={format(new Date(item.shiftOut), "hh:mm aa")}
              />
              <ListCol
                label="Absent:"
                value={format(new Date(item.shiftAbsent), "hh:mm aa")}
              />
              <ListCol
                label="Late:"
                value={format(new Date(item.shiftLate), "hh:mm aa")}
              />
              <ListCol
                label="Early:"
                value={format(new Date(item.shiftEarly), "hh:mm aa")}
              />
              <ListCol
                label="Lunch From:"
                value={format(new Date(item.shiftLunchFrom), "hh:mm aa")}
              />
              <ListCol
                label="Lunch Till:"
                value={format(new Date(item.shiftLunchTill), "hh:mm aa")}
              />
              <ListCol
                label="Last Punch:"
                value={format(new Date(item.shiftLastPunch), "hh:mm aa")}
              />
              <ListCol
                label="Default Shift:"
                value={item.defaultShift ? "Yes" : "No"}
              />
              <div>
                <div className="flex justify-end space-x-2">
                  <EditButton
                    path={`/hr/settings/shift/edit/${item.shiftId}`}
                  />
                  <DeleteButton
                    action={refetch}
                    path={`/shifts/delete/${item.shiftId}`}
                  />
                </div>
              </div>
            </div>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">TOTAL : {list.data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShiftList;
