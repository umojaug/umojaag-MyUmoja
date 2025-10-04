import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";

import ExpenseForm from "./ExpenseForm";

const ExpenseEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("expensesDetails", `/expenses/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Expense"
        btn="Return"
        path="/ac/settings/expense/list"
      />
      <ExpenseForm
        defaultValues={{
          expenseId: list.data.expenseId,
          expenseName: list.data.expenseName,
        }}
        action={refetch}
        btnText="Update"
        path="/expenses/update"
        returnPath="/ac/settings/expense/list"
      />
    </div>
  );
};

export default ExpenseEdit;
