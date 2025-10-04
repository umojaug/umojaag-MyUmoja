import React from "react";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import MessageSearchDetails from "./MessageSearchDetails";

function MessageSearch({ search }) {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "employees",
    `/hrreports/employeebycategory/${search.branchId}/${search.departmentId}/${search.designationId}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return <MessageSearchDetails data={list.data} />;
}

export default MessageSearch;
