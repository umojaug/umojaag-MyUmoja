import React from "react";
import SettingsItemOnline from "../../components/layout/SettingsItemOnline";
import { useGlobalContext } from "../../hooks/context";

const Settings = () => {
  const value = useGlobalContext();
  const data = value.subMenus.filter((item) => {
    if (
      item.moduleName.toLowerCase() === "Audit".toLowerCase() &&
      item.menuName.toLowerCase() === "Settings".toLowerCase()
    )
      return item;
    else return null;
  });

  return (
    <div className="card w-full max-w-screen-xl">
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
      </div>
    </div>
  );
};

export default Settings;
