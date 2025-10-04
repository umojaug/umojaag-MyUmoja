import React from "react";
import SettingsItem from "../../components/layout/SettingsItem";
import { menuUser } from "../../data/menuUser";
import TopHeader from "../../components/TopHeader";

const myTimeLog = () => {
  const data = menuUser;
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Time Log" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.myTimeLogData.length > 0 &&
          data.myTimeLogData.map((item, index) => (
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

export default myTimeLog;
