import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import TopicForm from "./TopicForm";

const TopicEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("hrTopic", `/topics/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Training"
        btn="Return"
        path="/hr/training/topic/list"
      />
      <TopicForm
        defaultValues={{
          topicId: list.data.topicId,
          categoryId: list.data.categoryId,
          title: list.data.title,
          refLink: list.data.refLink,
          isPinned: list.data.isPinned,
        }}
        action={refetch}
        btnText="Update"
        path="/topics/update"
        returnPath="/hr/training/topic/list"
      />
    </div>
  );
};

export default TopicEdit;
