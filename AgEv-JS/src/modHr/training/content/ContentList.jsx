import React from "react";
import { useParams } from "react-router-dom";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import DeleteButton from "../../../components/button/DeleteButton";
import { ListHeader, ListCol } from "../../../components/ListColWithHeader";
import ContentAdd from "./ContentAdd";
import { AiOutlineFile } from "react-icons/ai";
import CourseInfo from "./CourseInfo";

const ContentList = ({ query }) => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrcontentlist", `/hrcontent/list/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error?.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <CourseInfo courseId={id} />
      <ContentAdd courseId={id} action={refetch} />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-2 list-header gap-2">
          <ListHeader label="Document Type" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.contentId}
              className="grid grid-cols-1 md:grid-cols-2 list-body gap-1 text-xs"
            >
              <ListCol label="Document Type : " value={item.title} />
              <div className="flex justify-end space-x-1 px-1">
                <a href={item.fileUrl} className="btn-sky w-12 h-10">
                  <AiOutlineFile size={24} />
                </a>
                <DeleteButton
                  action={refetch}
                  path={`/hrcontent/delete/${item.contentId}`}
                />
              </div>
              {/*
               */}
            </div>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">Total : {list.data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentList;
