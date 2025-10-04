import React from "react";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import TopHeader from "../../components/TopHeader";
import { useGetData } from "../../hooks/dataApi";
import NoticeItems from "../notice/NoticeItems";

const BoardNotice = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("hrnoticeslist", "/notices/pinned");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <>
      <div className="card w-full max-w-screen-xl">
        <TopHeader title="Notice" />
        <div className="grid gap-1">
          <NoticeItems data={list.data} />
        </div>
      </div>
    </>
  );
};

export default BoardNotice;
