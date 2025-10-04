import React from "react";
import { useGetData } from "../../../hooks/dataApi";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";

const CourseInfo = ({ courseId }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("employeeinfocourseinfobyid", `/courses/details/${courseId}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <TopHeader
      title={list.data.title + "Content List"}
      btn="Return"
      path="/hr/training/course/list"
    />
  );
};

export default CourseInfo;
