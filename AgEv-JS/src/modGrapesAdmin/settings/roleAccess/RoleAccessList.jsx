import React from "react";
import { useGetData } from "../../../hooks/dataApi";
import { HashLoading } from "../../../components/Loading";
import Error from "../../../components/Error";
import AssignRoleView from "./AssignRoleView";
import { useNavigate } from "react-router-dom";

function RoleAccessList() {
  const navigate = useNavigate();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("roleaccess", `/role/access`);

  if (isLoading) return <HashLoading />;
  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl bg-white rounded-lg shadow-md">
      <div className="flex justify-between px-0 py-2 items-center">
        <h1 className="text-xl lg:text-2xl font-bold lg:text-semibold text-gray-600 capitalize">
          Menu & Sub Menu Assign Role
        </h1>
        <div className="flex justify-center gap-2">
          <button
            className="btn-umojablue btn-header btn-animation  "
            onClick={() => navigate("/grapes/settings/role/menuassign/add")}
          >
            Menu Assign
          </button>
          <button
            className="btn-umojayellow btn-animation"
            onClick={() => navigate("/grapes/settings/role/submenuassign/add")}
          >
            Sub Menu Assign
          </button>
        </div>
      </div>
      <AssignRoleView data={list.data} refetch={refetch} />
    </div>
  );
}

export default RoleAccessList;
