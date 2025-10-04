import React from "react";
import SettingsItemOnline from "../../../components/layout/SettingsItemOnline";
import TopHeader from "../../../components/TopHeader";
import { useGlobalContext } from "../../../hooks/context";

const Report = () => {
  const value = useGlobalContext();
  const data = value.subMenus.filter((item) => {
    if (
      item.moduleName.toLowerCase() === "Accounts".toLowerCase() &&
      item.menuName.toLowerCase() === "Reports".toLowerCase()
    )
      return item;
    else return null;
  });

  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Report Management System" />
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

export default Report;
