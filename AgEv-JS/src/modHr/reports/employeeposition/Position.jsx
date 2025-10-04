import React from "react";
import { useGetData } from "../../../hooks/dataApi";

const Position = ({ title, path }) => {
  const {
    data: list,
    error,
    isLoading,
    isError,
  } = useGetData("employeesposition" + path, `/hrreports/${path}`);

  if (isLoading)
    return (
      <div className="bg-white rounded-lg p-1 shadow-lg grid grid-cols-1 content-start h-40 animate-pulse">
        <div className="grid gap-1 px-2 rounded-t-lg bg-gray-200">
          <div className="h-6 bg-gray-400 rounded"></div>
          <div className="h-8 bg-gray-400 rounded"></div>
          <div className="h-8 bg-gray-400 rounded"></div>
          <div className="h-8 bg-gray-400 rounded"></div>
          <div className="h-8 bg-gray-400 rounded"></div>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="card w-5/6 h-20 border-l-8 border-red-400 md:w-96 shadow-lg">
        <div className="flex">
          <div className="text-3xl">
            <span role="img" aria-label="sad">
              😞
            </span>
          </div>
          <div className="-mt-2 ml-5">
            <h3 className="text-xl text-red-400">Opps !!</h3>
            <p className="text-red-400 text-sm">{error?.message}</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="bg-white rounded-lg p-1 shadow-lg grid grid-cols-1 content-start">
      <div className="grid grid-cols-3 px-2 rounded-t-lg bg-gray-200">
        <span className="break-words col-span-2 text-sm text-left font-bold flex place-items-center">
          {title}
        </span>
        <span className="break-words col-span-1 text-sm text-center font-bold">
          Total Count
        </span>
      </div>
      {list.data.length > 0 &&
        list.data.map((item) => (
          <div
            key={item.sl}
            className={`grid grid-cols-3 px-2 ${
              item.sl % 2 === 0 && "bg-gray-100"
            }`}
          >
            <span className="text-sm text-left col-span-2">{item.title}</span>
            <span className="text-right col-span-1">{item.staffCount}</span>
          </div>
        ))}
    </div>
  );
};

export default Position;
