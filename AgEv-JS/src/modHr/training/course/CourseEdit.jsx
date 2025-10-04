import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import CourseForm from "./CourseForm";

const CourseEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrCourse", `/courses/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Course"
        btn="Return"
        path="/hr/training/course/list"
      />
      <CourseForm
        defaultValues={{
          courseId: list.data.courseId,
          categoryId: list.data.categoryId,
          title: list.data.title,
          refLink: list.data.refLink,
          imageUrl: list.data.imageUrl,
        }}
        action={refetch}
        btnText="Update"
        path="/courses/update"
        returnPath="/hr/training/course/list"
      />
    </div>
  );
};

export default CourseEdit;
