import React from "react";
import { useParams } from "react-router-dom";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
import TopHeader from "../../components/TopHeader";
import { useGetData } from "../../hooks/dataApi";
import UserForm from "./UserForm";

const UserEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("userdetails", `/user/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Edit User Role" btn="Return" path="/admin/user" />
      <div>
        <span>Name :</span> <span>{list.data.employeeName}</span>
      </div>
      <div>
        <span>Designation :</span> <span>{list.data.designationName}</span>
      </div>
      <div>
        <span>User Name :</span> <span>{list.data.userName}</span>
      </div>
      <div>
        <span>Current Role :</span> <span>{list.data.role}</span>
      </div>
      <UserForm
        defaultValues={{
          id: list.data.id,
          role: list.data.role,
        }}
        action={refetch}
        btnText="Update"
        path="/user/update"
        returnPath="/admin/user"
      />
    </div>
  );
};

export default UserEdit;
