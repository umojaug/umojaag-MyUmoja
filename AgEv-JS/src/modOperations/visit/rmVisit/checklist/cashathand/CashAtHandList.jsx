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
  } = useGetData("hrDepartment", `/rmCashAtHand/list/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div>
      <TopHeader title="1.Cash at hand information" />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-4 list-header">
          <ListHeader label="Cashbook amount" />
          <ListHeader label="Physical amount" />
          <ListHeader label="Remarks" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.opsRmCashAtHandId}
              className="grid grid-cols-1 md:grid-cols-4 list-body"
            >
              <ListCol label="Cashbook Amount: " value={item.cashbookAmount} />
              <ListCol label="Physical Amount: " value={item.physicalAmount} />
              <ListCol label="Remarks: " value={item.remarks} />

              {isSubmit === 0 && (
                <div className="flex justify-end space-x-2">
                  <EditButton
                    path={`/ops/rm/cash/visit/edit/${item.opsRmCashAtHandId}`}
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
