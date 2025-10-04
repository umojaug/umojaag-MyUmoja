import React from "react";
import SettingsItemOnline from "../../../components/layout/SettingsItemOnline";
import { useGlobalContext } from "../../../hooks/context";

const Report = () => {
  const value = useGlobalContext();
  const submenus = value.subMenus.filter((item) => {
    if (
      item.moduleName.toLowerCase() === "Home".toLowerCase() &&
      item.menuName.toLowerCase() === "Reports".toLowerCase() &&
      item.section.toLowerCase() === "N/A".toLowerCase()
    )
      return item;
    else return null;
  });

  return (
    <div className="card w-full max-w-screen-xl gap-2">
      <div className="flex justify-between px-0 py-2 items-center">
        <h1 className="text-xl lg:text-2xl font-bold lg:text-semibold text-gray-600">
          Reports
        </h1>
      </div>

      {submenus.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {submenus.map((item, index) => (
            <SettingsItemOnline
              key={index}
              name={item.subMenuName}
              link={item.link}
              icon={item.icon}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Report;
