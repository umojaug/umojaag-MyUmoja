import React from "react";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";

import { useParams } from "react-router-dom";
import MenuForm from "./MenuForm";

const MenuEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("appModule", `/adMenu/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Menu"
        btn="Return"
        path="/grapes/settings/menu/list"
      />

      <MenuForm
        defaultValues={{
          menuId: list.data.menuId,
          moduleId: list.data.moduleId,
          menuName: list.data.menuName,
          link: list.data.link,
          icon: list.data.icon,
          iconMobile: list.data.iconMobile,
          priority: list.data.priority,
        }}
        action={refetch}
        btnText="Update"
        path="/adMenu/update"
        returnPath="/grapes/settings/menu/list"
      />
    </div>
  );
};

export default MenuEdit;
