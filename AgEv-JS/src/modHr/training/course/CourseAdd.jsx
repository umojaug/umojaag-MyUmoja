import React from "react";
import TopHeader from "../../../components/TopHeader";
import CourseForm from "./CourseForm";

const CourseAdd = () => {
  const defaultValues = {
    courseId: "",
    categoryId: "",
    title: "",
    refLink: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Course Create"
        btn="Return"
        path="/hr/training/course/list"
      />
      <CourseForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/courses/create"
        returnPath="/hr/training/course/list"
      />
    </div>
  );
};

export default CourseAdd;
