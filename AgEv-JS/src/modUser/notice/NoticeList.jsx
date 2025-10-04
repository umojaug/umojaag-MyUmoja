import React, { useState } from "react";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import TopHeader from "../../components/TopHeader";
import { useGetData } from "../../hooks/dataApi";
import SearchHeader from "../../components/SearchHeader";
import NoticeItems from "./NoticeItems";

const NoticeList = () => {
  const [query, setQuery] = useState("");
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("hrnoticeslist", "/notices/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="All Notice" />
      <SearchHeader action={setQuery} placeholder="" />
      {list.data.length > 0 && (
        <NoticeItems
          data={list.data.filter((item) => {
            if (query === "") {
              return item;
            } else if (
              item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
            ) {
              return item;
            } else return null;
          })}
        />
      )}
    </div>
  );
};

export default NoticeList;
