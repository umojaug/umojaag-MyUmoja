import React from "react";

import QueryExecuteForm from "./QueryExecuteForm";
import TopHeader from "../../../components/TopHeader";

const QueryExecuteAdd = () => {
  const defaultValues = {
    queryId: "",
    query: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Add Query" btn="Return" path="/grapes/settings" />
      <QueryExecuteForm
        defaultValues={defaultValues}
        action={() => {}}
        path="/queryExecute/create"
        returnPath="/grapes/settings"
        btnText="Execute"
      />
    </div>
  );
};

export default QueryExecuteAdd;
