import React from "react";
import TopHeader from "../../../components/TopHeader";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import { format } from "date-fns";
import ConfirmActionButton from "../../../components/button/ConfirmActionButton";

function DayCloseApprove() {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("AsDayList", "/AcBusinessDay/StatusList");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;
  const data = list.data;
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Day Close Approve"
        btn="Return"
        path="/ac/day/management"
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-10 list-header gap-2">
          <ListHeader label="Branch Name" />
          <ListHeader label="Business Date" />
          <ListHeader label="Status" />
          <ListHeader label="Opened By" />
          <ListHeader label="Opened Date" />
          <ListHeader label="Closed By" />
          <ListHeader label="Closed Date" />
          <ListHeader label="Approved By" />
          <ListHeader label="Approved Date" />
          <ListHeader label="" />
        </div>

        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.businessDayId}
              className="grid grid-cols-1 md:grid-cols-10 list-body gap-1 text-xs items-center"
            >
              <ListCol label="Branch Name: " value={item.branchName} />
              <ListCol
                label="Business Date: "
                value={format(new Date(item.businessDate), "dd/MMM/yyyy")}
              />
              <ListCol label="Status: " value={item.status} />
              <ListCol label="Opened By: " value={item.openedBy} />
              <ListCol
                label="Opened Date: "
                value={format(new Date(item.openedDate), "dd/MMM/yyyy")}
              />
              <ListCol label="Closed By: " value={item.closedBy} />
              <ListCol
                label="Closed Date: "
                value={format(new Date(item.closedDate), "dd/MMM/yyyy")}
              />
              <ListCol label="Approved By: " value={item.approvedBy} />
              <ListCol
                label="Approved Date: "
                value={format(new Date(item.approvedDate), "dd/MMM/yyyy")}
              />

              {item.status === "RequestToClose" && (
                <>
                  <div className="flex justify-end space-x-2">
                    <ConfirmActionButton
                      btnDesc="Are you sure you want to approve?"
                      successMsg="Successfully Day Closed!"
                      path={`/acBusinessDay/dayCloseApprove/${item.businessDayId}`}
                      action={refetch}
                    />
                    {/* <RejectButton
                      path={`/acBusinessDay/closeReject/${item.businessDayId}`}
                      action={refetch}
                    /> */}
                  </div>
                </>
              )}
            </div>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">Total : {data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DayCloseApprove;
