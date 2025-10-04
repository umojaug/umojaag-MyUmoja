import React from "react";
import DeleteButton from "../../../components/button/DeleteButton";
import EditButton from "../../../components/button/EditButton";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";

const SubLedgerList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("subLedger", "/acSubLedger/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Sub Ledger"
        btn="Save"
        path={"/ac/settings/subLedger/add"}
      />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-6 list-header">
          <ListHeader label="Main Name" />
          <ListHeader label="Group Name" />
          <ListHeader label="Sub Group Name" />
          <ListHeader label="Ledger Name" />
          <ListHeader label="Sub Ledger Name" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.ledgerId}
              className="grid grid-cols-1 md:grid-cols-6 list-body"
            >
              <ListCol label="Main Name : " value={item.mainName} />
              <ListCol label="Group : " value={item.groupName} />
              <ListCol label="Sub Group Name : " value={item.subGroupName} />
              <ListCol label="Ledger : " value={item.ledgerName} />
              <ListCol label="Sub Ledger Name : " value={item.subLedgerName} />
              <div className="flex justify-end space-x-2">
                <EditButton
                  path={`/ac/settings/subLedger/edit/${item.subLedgerId}`}
                />
                <DeleteButton
                  action={refetch}
                  path={`/acSubLedger/delete/${item.subLedgerId}`}
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

export default SubLedgerList;
