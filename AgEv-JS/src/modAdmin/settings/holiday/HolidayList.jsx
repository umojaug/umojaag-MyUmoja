import React from "react";
import DeleteButton from "../../../components/button/DeleteButton";
import EditButton from "../../../components/button/EditButton";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import { format } from "date-fns";

const HolidayList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrHoliday", "/holidays/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Holiday"
        btn="Save"
        path="/admin/settings/holiday/add"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-4 list-header">
          <ListHeader label="Holiday Name" />
          <ListHeader label="From Date" />
          <ListHeader label="Till Date" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.holidayId}
              className="grid grid-cols-1 md:grid-cols-4 list-body"
            >
              <ListCol label="Holiday Name:" value={item.holidayName} />
              <ListCol
                label="From Date:"
                value={format(new Date(item.fromDate), "dd/MMM/yyyy")}
              />
              <ListCol
                label="Till Date:"
                value={format(new Date(item.tillDate), "dd/MMM/yyyy")}
              />
              <div>
                <div className="flex justify-end space-x-2">
                  <EditButton
                    path={`/admin/settings/holiday/edit/${item.holidayId}`}
                  />
                  <DeleteButton
                    action={refetch}
                    path={`/holidays/delete/${item.holidayId}`}
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

export default HolidayList;
