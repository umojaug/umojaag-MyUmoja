import React from "react";
import { useGetData } from "../../../../hooks/dataApi";
import { HashLoading } from "../../../../components/Loading";
import Error from "../../../../components/Error";
import TopHeader from "../../../../components/TopHeader";
import { ListCol, ListHeader } from "../../../../components/ListColWithHeader";
import EditButton from "../../../../components/button/EditButton";
import InActiveButton from "../../../../components/button/InActiveButton";

const ProfitAndLossAccountList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("group", "/mfGroup/approveList");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;


  

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Profit And Loss Account List" btn="Return" path="/mf/group" />
      {/* <TopHeader title="Active Group" btn="Save" path={"/mf/group/add"} /> */}
      <div className="list-wrapper">
        <div className="md:grid grid-cols-8 list-header">
          <ListHeader label="Product" />
          <ListHeader label="Group" />
          <ListHeader label="Meeting Day" />
          <ListHeader label="Frequency" />
          <ListHeader label="Locations" />
          <ListHeader label="Time" />
          <ListHeader label="Branch" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.groupId}
              className="grid grid-cols-1 md:grid-cols-8 list-body"
            >
              <ListCol label="Product :" value={item.loanProductName} />
              <ListCol label="Group :" value={item.groupName} />
              <ListCol label="Meeting Day :" value={item.meetingDay} />
              <ListCol label="Frequency :" value={item.frequency} />
              <ListCol label="Location :" value={item.locations} />
             
               <ListCol label="Branch Name :" value={item.branchName} />
              <div className="flex justify-end space-x-2">
                <EditButton path={`/mf/group/edit/${item.groupId}`} />
                {/* <DeleteButton
                  action={refetch}
                  path={`/mfGroup/delete/${item.mfGroupId}`}
                /> */}
                <InActiveButton
                  action={refetch}
                  path={`/mfGroup/inactive/${item.groupId}`}
                />
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

export default ProfitAndLossAccountList;
