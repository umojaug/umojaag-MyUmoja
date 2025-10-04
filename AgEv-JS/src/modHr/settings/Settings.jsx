import React from "react";
import { useGlobalContext } from "../../hooks/context";
import TopHeader from "../../components/TopHeader";
import SettingsItemOnline from "../../components/layout/SettingsItemOnline";
import MonthLockButton from "../../components/button/MonthLockButton";

const Settings = () => {
  const value = useGlobalContext();

  const data = value.subMenus.filter((item) => {
    if (
      item.moduleName.toLowerCase() === "Hr".toLowerCase() &&
      item.menuName.toLowerCase() === "Settings".toLowerCase()
    )
      return item;
    else return null;
  });

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Settings" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.length > 0 &&
          data.map((item, index) => (
            <SettingsItemOnline
              key={index}
              name={item.subMenuName}
              link={item.link}
              icon={item.icon}
            />
          ))}
        <MonthLockButton />
      </div>
    </div>
  );
};

export default Settings;
