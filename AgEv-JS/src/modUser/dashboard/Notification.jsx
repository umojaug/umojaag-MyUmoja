import React from "react";
import { Link } from "react-router-dom";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import { useGetData } from "../../hooks/dataApi";

const Notification = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("empnotificationlist", "/empnotification/listbyuser");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 content-around mb-4">
      <div className="bg-white rounded-lg p-1 shadow-lg grid grid-cols-1 content-start">
        <div className="grid grid-cols-3 p-2 rounded-t-lg bg-gray-200">
          <span className="break-words col-span-2 text-sm text-left font-bold flex place-items-center">
            Notification
          </span>
          <span className="break-words col-span-1 text-sm text-center font-bold">
            Total Count
          </span>
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <Link
              to={item.link}
              key={item.sl}
              className={`grid grid-cols-1 md:grid-cols-3 p-2 hover:bg-umojablue hover:text-white ${
                item.sl % 2 === 0 && "bg-gray-100"
              }`}
            >
              <span className="text-md text-left col-span-2">{item.title}</span>
              <span className="text-right col-span-1">{item.total}</span>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Notification;
