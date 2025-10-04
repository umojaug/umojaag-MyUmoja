import React from "react";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import { useGetData } from "../../hooks/dataApi";
import { ListCol, ListHeader } from "../../components/ListColWithHeader";
import { format } from "date-fns";

import DeleteButton from "../../components/button/DeleteButton";

const MyTimeLogList = ({ dataForm }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData(
    "myTimeLogListmylist",
    `/myTimeLog/myList/${dataForm.fromDate}/${dataForm.tillDate}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div>
      <div className="list-wrapper">
        <div className="md:grid grid-cols-6 list-header">
          {/* <ListHeader label="Employee Name" /> */}
          <ListHeader label="Task Date " />
          <ListHeader label="Task Name" />
          <ListHeader label="Task Hour " />
          <ListHeader label="Status" />
          <ListHeader label="Authority" />

          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.timeLogId}
              className="grid grid-cols-1 md:grid-cols-6 list-body"
            >
              <ListCol
                label=" Task Date : "
                value={format(new Date(item.taskDate), "dd-MMM-yyyy")}
              />
              <ListCol label="Task Name : " value={item.taskName} />
              <ListCol label="Task Hour : " value={item.taskHour} />

              <ListCol label="Status : " value={item.status} />
              <ListCol label="Authority : " value={item.authorityName} />
              <div className="flex justify-end space-x-2">
                {/* <EditButton
                  path={`/myTimeLog/MyTimeLogEdit/${item.timeLogId}`}
                /> */}
                {item.status !== "Approved" && (
                  <DeleteButton
                    action={refetch}
                    path={`/myTimeLog/delete/${item.timeLogId}`}
                  />
                )}
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

export default MyTimeLogList;
