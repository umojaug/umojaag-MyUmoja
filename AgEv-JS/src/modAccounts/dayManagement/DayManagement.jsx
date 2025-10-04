import React from "react";
import { useGlobalContext } from "../../hooks/context";
import SettingsItemOnline from "../../components/layout/SettingsItemOnline";
import DayOpenButton from "../../components/button/DayOpenButton";

const DayManagement = () => {
  const value = useGlobalContext();

  const data = value.subMenus.filter((item) => {
    if (item.moduleName === "Accounts" && item.menuName === "Day Management")
      return item;
    else return null;
  });

  return (
    <div className="card w-full max-w-screen-xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(value.role === "Branch Manager" ||
          value.role === "Accounts Manager" ||
          value.role === "Accounts Executive") && <DayOpenButton />}
        {data.length > 0 &&
          data.map((item, index) => (
            <SettingsItemOnline
              key={index}
              name={item.subMenuName}
              link={item.link}
              icon={item.icon}
            />
          ))}
      </div>
    </div>
  );
};

export default DayManagement;
