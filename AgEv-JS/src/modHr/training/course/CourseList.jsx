import React, { useState } from "react";
import DeleteButton from "../../../components/button/DeleteButton";
import TaskButton from "../../../components/button/TaskButton";
import EditButton from "../../../components/button/EditButton";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import { ListCol, ListHeader } from "../../../components/ListColWithHeader";
import SearchHeader from "../../../components/SearchHeader";

const CourseList = () => {
  const [query, setQuery] = useState("");

  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrCourselist", "/courses/list");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  const data = list.data.filter((item) => {
    if (query === "") {
      return item;
    } else if (
      item.categoryName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
    ) {
      return item;
    } else return null;
  });

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Course List"
        btn="Save"
        path="/hr/training/course/add"
      />
      <SearchHeader placeholder="Category / Title" action={setQuery} />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-3 list-header">
          <ListHeader label="Category" />
          <ListHeader label="Title" />
          <ListHeader label="" />
        </div>
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.courseId}
              className="grid grid-cols-1 md:grid-cols-3 list-body"
            >
              <ListCol label="Category : " value={item.categoryName} />
              <ListCol label="Title : " value={item.title} />
              <div>
                <div className="flex justify-end space-x-2">
                  <TaskButton
                    path={`/hr/training/course/content/list/${item.courseId}`}
                  />
                  <EditButton
                    path={`/hr/training/course/edit/${item.courseId}`}
                  />
                  <DeleteButton
                    action={refetch}
                    path={`/courses/delete/${item.courseId}`}
                  />
                </div>
              </div>
            </div>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">TOTAL : {data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseList;
