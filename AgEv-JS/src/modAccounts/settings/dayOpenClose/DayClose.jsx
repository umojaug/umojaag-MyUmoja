import React from "react";
import DeleteButton from "../../../components/button/DeleteButton";
import TopHeader from "../../../components/TopHeader";
// import Error from "../../../components/Error";
// import { useGetData } from "../../../hooks/dataApi";
// import { HashLoading } from "../../../components/Loading";
import { ListHeader, ListCol } from "../../../components/ListColWithHeader";
import EditButton from "../../../components/button/EditButton";
import { format } from "date-fns";

const DayClose = () => {
  //   const {
  //     data: list,
  //     error,
  //     isLoading,
  //     isError,
  //     refetch,
  //   } = useGetData("loanApplication", "/mfLoanApplication/list");

  //   if (isLoading) return <HashLoading />;

  //   if (isError) return <Error message={error.message} />;



  const data = [
    {
      mfMemberId: "1",
      lastScheduleDate: "12/May/2023",
      nextScheduleDate: "12/May/2023",
      mfMemberName: "Kaushik",
      office: "Chasara",
      group: "Chasara g-1",
    },
  ];

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Day Close"
        btn="Save"
        path={"/mf/loan/application/add"}
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-6 list-header">
          <ListHeader label="Name" />
          <ListHeader label="Office" />
          <ListHeader label="Group" />
          <ListHeader label="Application Date" />
          <ListHeader label="Disbursement Date" />
          <ListHeader label="" />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.mfMemberId}
              className="grid grid-cols-1 md:grid-cols-6 list-body"
            >
              <ListCol label="Amount :" value={item.mfMemberName} />
              <ListCol label="Duration :" value={item.office} />
              <ListCol label="Duration :" value={item.group} />
              <ListCol
                label="Last Schedule Date :"
                value={format(new Date(item.lastScheduleDate), "dd/MMM/yyyy")}
              />
              <ListCol
                label="Next Schedule Date :"
                value={format(new Date(item.nextScheduleDate), "dd/MMM/yyyy")}
              />

              <div className="flex justify-end space-x-2">
                <EditButton
                  path={`/mf/loan/application/edit/${item.mfMemberId}`}
                />
                <DeleteButton
                  //   action={refetch}
                  path={`/mfLoanApplication/delete/${item.mfMemberId}`}
                />
              </div>
            </div>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">TOTAL : {data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayClose;
