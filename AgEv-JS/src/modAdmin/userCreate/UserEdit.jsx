import React from "react";
import { useParams } from "react-router-dom";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import TopHeader from "../../components/TopHeader";
import UserForm from "./UserForm";


const UserEdit = () => {
  const { id } = useParams();
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("member", `/member/details/${id}`);

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader
        title="Edit Member Details"
        btn="Return"
        path="/sacco/ac/member/list"
      />
      <UserForm
        defaultValues={{
          memberId: list.data.memberId,
          fullName: list.data.fullName,
          dateOfBirth: new Date(list.data.dateOfBirth),
          gender: list.data.gender,
          phoneNumber: list.data.phoneNumber,
          nid: list.data.nid,
          savingsProductId: list.data.savingsProductId,
          imageUrl: list.data.imageUrl,
        }}
        action={() => {}}
        btnText="Update"
        path="/member/update"
        returnPath="/sacco/ac/member/list"
      />
    </div>
  );
};

export default UserEdit;
