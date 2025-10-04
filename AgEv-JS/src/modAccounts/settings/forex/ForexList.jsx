import React from "react";
import DeleteButton from "../../../components/button/DeleteButton";
import EditButton from "../../../components/button/EditButton";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import { format } from "date-fns";

const ForexList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrForex", "/forexes/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Forex" btn="Save" path="/ac/settings/forex/add" />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-4 list-header">
          <ListHeader label="Currency" />
          <ListHeader label="Rate" />
          <ListHeader label="Date" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.forexId}
              className="grid grid-cols-1 md:grid-cols-4 list-body"
            >
              <ListCol label="Currency:" value={item.forexName} />
              <ListCol label="Rate:" value={item.forexRate} />
              <ListCol
                label="Date:"
                value={format(new Date(item.workDate), "dd/MMM/yyyy")}
              />
              <div>
                <div className="flex justify-end space-x-2">
                  <EditButton
                    path={`/ac/settings/forex/edit/${item.forexId}`}
                  />
                  <DeleteButton
                    action={refetch}
                    path={`/forexes/delete/${item.forexId}`}
                  />
                </div>
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

export default ForexList;
