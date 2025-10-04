import React from "react";
import { useGetData } from "../../hooks/dataApi";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";

const UserInfo = ({ employeeId }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData(
    "employeeinfouserinfobyid",
    `/employeeinfo/userinfobyid/${employeeId}`
  );

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;
  return (
    <div className="grid place-items-start">
      <img
        className="h-20 w-20 "
        src={`https://drive.google.com/thumbnail?id=${list.data.imageUrl}`}
        alt=""
      />
      <span className="text-lg font-bold text-primary drop-shadow-xl shadow-black">
        {list.data.fullName} - Document List
      </span>
    </div>
  );
};

export default UserInfo;
