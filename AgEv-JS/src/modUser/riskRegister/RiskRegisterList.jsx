import React from "react";
import { useGetData } from "../../hooks/dataApi";
import { HashLoading } from "../../components/Loading";
import Error from "../../components/Error";
import TopHeader from "../../components/TopHeader";
import { ListCol, ListHeader } from "../../components/ListColWithHeader";
import TaskButton from "../../components/button/TaskButton";

const RiskRegisterList = () => {
  const {
    data: list,
    error,
    isLoading,
    isError,
    // refetch,
  } = useGetData("hrDepartment", "/riskRegister/OwnList");

  if (isLoading) return <HashLoading />;

  if (isError) return <Error message={error.message} />;

  return (
    <div className="card w-full max-w-screen-xl mx-auto">
      <TopHeader title="Risk Register List" />
      <div className="list-wrapper">
        <div className="md:grid grid-cols-3 list-header">
          <ListHeader label="Risk Register" />
          <ListHeader label="Company Name" />
          <ListHeader label="" />
        </div>
        {list.data.length > 0 &&
          list.data.map((item) => (
            <div
              key={item.riskRegisterId}
              className="grid grid-cols-1 md:grid-cols-3 list-body"
            >
              <ListCol label="Title:" value={item.title} />
              <ListCol label=" Company Name:" value={item.companyName} />
              <div className="flex justify-end space-x-2">
                <TaskButton
                  path={`/my/risk/register/details/${item.riskRegisterId}`}
                />
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

export default RiskRegisterList;
