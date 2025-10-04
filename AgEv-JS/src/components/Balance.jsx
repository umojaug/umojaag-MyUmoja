import React from "react";
import { useGetData } from "../hooks/dataApi";

function Balance({ keyName, path }) {
  const { data: list, isLoading, isError } = useGetData(keyName, path);

  if (isLoading) return <div>Processing</div>;

  if (isError) return <div>Error</div>;

  return (
    <div className="font-bold text-2xl bg-red-500 text-white w-full rounded-md p-2">
      Balance : {list.data.toLocaleString("en-US")}
    </div>
  );
}

export default Balance;
