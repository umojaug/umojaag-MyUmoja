import React from "react";
import { useGetData } from "../../hooks/dataApi";
import Error from "../../components/Error";
import { HashLoading } from "../../components/Loading";
// import { askForPermissionToReceiveNotifications } from "../../push-notification";

const Welcome = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("employeeinfouserinfo", "/employeeinfo/userinfo");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="grid place-items-start lg:place-items-end">
      <img
        className="h-20 w-20 md:place-self-end"
        src={`https://drive.google.com/thumbnail?id=${list.data.imageUrl}`}
        alt=""
      />
      <span className="text-lg md:place-self-end font-bold text-primary drop-shadow-xl shadow-black">
        Welcome <span>{list.data.fullName}</span>
      </span>
      {/* <button onClick={askForPermissionToReceiveNotifications}>
        Click to receive notifications
      </button> */}
    </div>
  );
};

export default Welcome;
