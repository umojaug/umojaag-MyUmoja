import React from "react";
import ProcessButton from "../../../components/button/ProcessButton";
import SettingsItem from "../../../components/layout/SettingsItem";
import { menuHr } from "../../../data/menuHr";

const Dashboard = () => {
  const data = menuHr;
  return (
    <div className="card w-full max-w-screen-xl">
      <div className="flex flex-col md:flex-row justify-between px-0 py-2 items-center">
        <h1 className="text-xl lg:text-2xl pb-2 md:pb-0 font-bold lg:text-semibold text-gray-600">
          Leave Dashboard
        </h1>
        <ProcessButton title="Leave Process" path="/empleave/leaveprocess" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.subLeaveData.length > 0 &&
          data.subLeaveData.map((item, index) => (
            <SettingsItem
              key={index}
              name={item.name}
              link={item.link}
              Icon={item.Icon}
            />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
