import React from "react";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import ModuleForm from "./ModuleForm";
import { useParams } from "react-router-dom";

const ModuleEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("appModule", `/module/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Module"
        btn="Return"
        path="/grapes/settings/module/list"
      />
      <ModuleForm
        defaultValues={{
          moduleId: list.data.moduleId,
          moduleName: list.data.moduleName,
          link: list.data.link,
          icon: list.data.icon,
          iconMobile: list.data.iconMobile,
          priority: list.data.priority,
        }}
        action={refetch}
        btnText="Update"
        path="/module/update"
        returnPath="/grapes/settings/module/list"
      />
    </div>
  );
};

export default ModuleEdit;
