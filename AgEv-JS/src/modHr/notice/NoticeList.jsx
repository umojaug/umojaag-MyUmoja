import React from "react";
import DeleteButton from "../../components/button/DeleteButton";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import TopHeader from "../../components/TopHeader";
import { useGetData } from "../../hooks/dataApi";
import { ListCol, ListHeader } from "../../components/ListColWithHeader";
import { AiOutlineFile } from "react-icons/ai";
import { format } from "date-fns";

const NoticeList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrNoticelist", "/notices/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Notice List" btn="Save" path="/hr/notice/add" />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-2 list-header">
          <ListHeader label="Title" />
          {/* <ListHeader label="Expiry Date" /> */}
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.noticeId}
              className="grid grid-cols-1 md:grid-cols-2 list-body"
            >
              <ListCol label="Notice Name:" value={item.title} />
              {/* <ListCol
                label="Expiry Date : "
                value={format(new Date(item.expiryDate), "dd/MMM/yyyy")}
              /> */}
              <div className="flex justify-end space-x-2">
                <a href={item.fileUrl} className="btn-sky w-12 h-10">
                  <AiOutlineFile size={24} />
                </a>
                <DeleteButton
                  action={refetch}
                  path={`/notices/delete/${item.noticeId}`}
                />
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

export default NoticeList;
