import React from "react";
import DeleteButton from "../../components/button/DeleteButton";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import TopHeader from "../../components/TopHeader";
import { useGetData } from "../../hooks/dataApi";
import { ListCol, ListHeader } from "../../components/ListColWithHeader";
import { AiOutlineFile } from "react-icons/ai";
import { format } from "date-fns";

const DocumentsList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrNoticelist", "/documents/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Document List" btn="Save" path="/hr/documents/add" />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-2 list-header">
          <ListHeader label="Title" />
          {/* <ListHeader label="Category Name" /> */}
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-3 list-body">
              <ListCol label="Notice Name:" value={item.title} />
              {/* <ListCol label="Notice Name:" value={item.categoryName} /> */}

              <div className="flex justify-end space-x-2">
                <a href={item.fileUrl} className="btn-sky w-12 h-10">
                  <AiOutlineFile size={24} />
                </a>
                <DeleteButton
                  action={refetch}
                  path={`/documents/delete/${item.documentsId}`}
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

export default DocumentsList;
