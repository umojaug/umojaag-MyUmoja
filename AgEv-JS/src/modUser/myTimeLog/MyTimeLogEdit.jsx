import React from "react";
import { useParams } from "react-router-dom";
import MyTimeLogForm from "./MyTimeLogForm";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import TopHeader from "../../components/TopHeader";

const MyTimeLogEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("myTimeLog", `/MyTimeLog/Details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Time Log"
        btn="Return"
        path="/myTimeLogNew"
      />
      <MyTimeLogForm
        defaultValues={{
          timeLogId: list.data.timeLogId,
          taskName: list.data.taskName,
          taskHour: list.data.taskHour,
          status: list.data.status,
          taskDate: new Date(list.data.taskDate),
          // authorId: list.data.authorId,
          auditStartDate: new Date(list.data.auditStartDate),
        }}
        action={refetch}
        btnText="Update"
        path="/myTimeLog/update"
        returnPath="/myTimeLogNew"
      />
    </div>
  );
};

export default MyTimeLogEdit;
