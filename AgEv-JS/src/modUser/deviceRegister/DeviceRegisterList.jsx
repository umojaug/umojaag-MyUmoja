import React from "react";
import DeleteButton from "../../components/button/DeleteButton";
import Error from "../../components/Error";
import { ListCol, ListHeader } from "../../components/ListColWithHeader";
import { HashLoading } from "../../components/Loading";
import { useGetData } from "../../hooks/dataApi";
import DeviceRegister from "./DeviceRegister";
import { format } from "date-fns";

const DeviceRegisterList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetData("deviceregister", "/deviceregister/listbyuser");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl">
      <div className="flex justify-between px-0 py-2 items-center">
        <h1 className="text-xl lg:text-2xl font-bold lg:text-semibold text-gray-600 capitalize">
          My Device List
        </h1>
        <DeviceRegister action={refetch} />
      </div>
      <div className="list-wrapper">
        <div className="md:grid grid-cols-4 list-header">
          <ListHeader label="Device Name" />
          <ListHeader label="Register Date" />
          <ListHeader label="Token" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.deviceRegisterId}
              className="grid grid-cols-1 md:grid-cols-4 list-body"
            >
              <ListCol label="Device Name:" value={item.deviceName} />
              <ListCol
                label="Register Date:"
                value={format(new Date(item.registerDate), "dd-MMM-yyyy")}
              />
              <ListCol label="Token:" value={item.token} />

              <div>
                <div className="flex justify-end space-x-2">
                  <DeleteButton
                    action={refetch}
                    path={`/deviceregister/delete/${item.deviceRegisterId}`}
                  />
                </div>
              </div>
            </div>
          ))}

        <div className="list-footer">
          <div className="col-span-10"></div>
          <div className="flex justify-center">
            <span className="font-semibold">TOTAL : {list.data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceRegisterList;
