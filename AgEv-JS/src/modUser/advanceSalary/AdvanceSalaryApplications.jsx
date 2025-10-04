import React from "react";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import { useGetData } from "../../hooks/dataApi";
import { ListCol, ListHeader } from "../../components/ListColWithHeader";
import DeleteButton from "../../components/button/DeleteButton";
import { format } from "date-fns";
import TaskButton from "../../components/button/TaskButton";

const AdvanceSalaryApplications = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("myleavelist", "/myAdvanceSalary/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div>
      <div className="flex justify-between px-0 pb-2 text-xl lg:text-2xl font-bold lg:text-semibold text-gray-600">
        History
      </div>
      <div className="list-wrapper">
        <div className="md:grid grid-cols-6 list-header">
          {/* <ListHeader label="Employee Name" /> */}
          <ListHeader label="Amount" />
          <ListHeader label="Needed Date" />
          <ListHeader label="Purpose" />
          <ListHeader label="Status" />
          <ListHeader label="Authority Name" />

          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.advanceId}
              className="grid grid-cols-1 md:grid-cols-6 list-body"
            >
              <ListCol
                label="amount : "
                value={item.advanceAmount.toLocaleString()}
              />
              <ListCol
                label="Needed Advance Date : "
                value={format(new Date(item.neededAdvanceDate), "dd/MMM/yyyy")}
              />

              <ListCol
                label="Purpose Of Advance : "
                value={item.purposeOfAdvance}
              />
              <ListCol label="Leave Status : " value={item.advanceStatus} />
              <ListCol label="Authority Name : " value={item.authorityName} />
              <div className="flex justify-end space-x-2">
                <TaskButton path={`/advanceSalary/view/${item.advanceId}`} />
                {item.advanceStatus === "Pending" && (
                  <DeleteButton
                    action={refetch}
                    path={`/myAdvanceSalary/delete/${item.advanceId}`}
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

export default AdvanceSalaryApplications;
