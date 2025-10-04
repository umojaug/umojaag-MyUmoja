import React from "react";
import TopHeader from "../../components/TopHeader";
import UserForm from "./UserForm";

const UserAdd = () => {
  const defaultValues = {
    userId: "",
    fullName: "",
    phoneNumber: "",
    role: "",
    imageUrl: "1vyhSgRVvN5Y7FaTX2HBLGse7i2BmkDN6",
  };

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Add New User" btn="Return" path="/admin/user" />

      <UserForm
        defaultValues={defaultValues}
        action={() => {}}
        btnText="Save"
        path="/userCreate/create"
        returnPath="/admin/user"
      />
    </div>
  );
};

export default UserAdd;
