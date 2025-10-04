import React from "react";
import TopHeader from "../../../components/TopHeader";
import TopicForm from "./TopicForm";

const TopicAdd = () => {
  const defaultValues = {
    topicId: "",
    categoryId: "",
    title: "",
    refLink: "",
  };
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Training Create"
        btn="Return"
        path="/hr/training/topic/list"
      />
      <TopicForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/topics/create"
        returnPath="/hr/training/topic/list"
      />
    </div>
  );
};

export default TopicAdd;
