import React from "react";
import Error from "../../../components/Error";
import { HashLoading } from "../../../components/Loading";
import TopHeader from "../../../components/TopHeader";
import { useGetData } from "../../../hooks/dataApi";
import SubMenuForm from "./SubMenuForm";
import { useParams } from "react-router-dom";

const SubMenuEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("appModule", `/adSubMenu/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Sub Menu"
        btn="Return"
        path="/grapes/settings/sub/menu/list"
      />

      <SubMenuForm
        defaultValues={{
          subMenuId: list.data.subMenuId,
          menuId: list.data.menuId,
          subMenuName: list.data.subMenuName,
          link: list.data.link,
          icon: list.data.icon,
          iconMobile: list.data.iconMobile,
          priority: list.data.priority,
          section: list.data.section,
        }}
        action={refetch}
        btnText="Update"
        path="/AdSubMenu/update"
        returnPath="/grapes/settings/sub/menu/list"
      />
    </div>
  );
};

export default SubMenuEdit;
