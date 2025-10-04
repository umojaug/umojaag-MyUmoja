import React from "react";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import TopHeader from "../../../components/TopHeader";

import { useGetData } from "../../../hooks/dataApi";
import EditButton from "../../../components/button/EditButton";
import DeleteButton from "../../../components/button/DeleteButton";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";

const ExpenseList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("expensesList", "/expenses/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Expense" btn="Save" path="/ac/settings/expense/add" />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-2 list-header">
          <ListHeader label="Name" />
          <ListHeader label="" />
        </div>
        {list.data.map((item) => (
          <div
            key={item.expenseId}
            className="grid grid-cols-1 md:grid-cols-2 list-body"
          >
            <ListCol label="Name:" value={item.expenseName} />
            <div>
              <span className="inline-block md:hidden font-semibold">
                Action
              </span>
              <div className="flex justify-end space-x-2">
                <EditButton
                  path={`/ac/settings/expense/edit/${item.expenseId}`}
                />
                <DeleteButton
                  action={refetch}
                  path={`/expenses/delete/${item.expenseId}`}
                />
              </div>
            </div>
          </div>
        ))}
        <div className="list-footer">
          <div className="flex justify-center">
            <span className="font-semibold">TOTAL : {list.data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;
