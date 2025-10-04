import React from "react";
import { format } from "date-fns";
import TopHeader from "../../components/TopHeader";
import EditButton from "../..//components/button/EditButton";
import DeleteButton from "../../components/button/DeleteButton";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import { ListCol, ListHeader } from "../../components/ListColWithHeader";

const ShiftList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("shift", "/hr/shift/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Shift List" btn="Save" path="/hr/shift/add" />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-7 list-header">
          <ListHeader label="Shift Name" />
          <ListHeader label="Employee Name" />
          <ListHeader label="From Data" />
          <ListHeader label="Till Date<" />
          <ListHeader label="Work Date" />
          <ListHeader label="Particulars" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.Id}
              className="grid grid-cols-1 md:grid-cols-7 list-body"
            >
              <ListCol label="Shift Name : " value={item.shiftName} />
              <ListCol label="Employee Name : " value={item.employeeName} />
              <ListCol
                label="From Date : "
                value={format(new Date(item.fromData), "dd/MMM/yyyy")}
              />
              <ListCol
                label="Till Date : "
                value={format(new Date(item.tillDate), "dd/MMM/yyyy")}
              />
              <ListCol
                label="Work Date: "
                value={format(new Date(item.workDate), "dd/MMM/yyyy")}
              />
              <ListCol label="Particulars : " value={item.particulars} />
              <div>
                <div className="flex justify-end space-x-2">
                  <EditButton path={`/hr/shift/edit/${item.Id}`} />
                  <DeleteButton
                    action={refetch}
                    path={`/hr/shift/delete/${item.Id}`}
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
