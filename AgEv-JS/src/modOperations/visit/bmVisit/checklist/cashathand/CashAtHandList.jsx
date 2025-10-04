import React from "react";
import TopHeader from "../../../../../components/TopHeader";
import {
  ListCol,
  ListHeader,
} from "../../../../../components/ListColWithHeader";
import { HashLoading } from "../../../../../components/Loading";
import { useGetData } from "../../../../../hooks/dataApi";
import Error from "../../../../../components/Error";
import EditButton from "../../../../../components/button/EditButton";

function CashAtHandList({ id, isSubmit }) {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("hrDepartment", `/bmCashAtHand/list/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div>
      <TopHeader title="5.Cash at hand information" />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-4 list-header">
          <ListHeader label="Opening Balance today" />
          <ListHeader label="Closing Balance today" />
          <ListHeader label="Above ceiling ( 200,000) reason" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.opsBmCashAtHandId}
              className="grid grid-cols-1 md:grid-cols-4 list-body"
            >
              <ListCol
                label="Opening Balance today: "
                value={item.openingBalance}
              />
              <ListCol
                label="Closing Balance today: "
                value={item.closingBalance}
              />
              <ListCol
                label="Above ceiling: "
                value={item.aboveCeilingReason}
              />
              {isSubmit === 0 && (
                <div className="flex justify-end space-x-2">
                  <EditButton
                    path={`/ops/bm/cash/visit/edit/${item.opsBmCashAtHandId}`}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default CashAtHandList;
