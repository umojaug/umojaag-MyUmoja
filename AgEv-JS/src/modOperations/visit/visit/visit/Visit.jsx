import React from "react";
import { useGlobalContext } from "../../../../hooks/context";
import SettingsItemOnline from "../../../../components/layout/SettingsItemOnline";
import TopHeader from "../../../../components/TopHeader";

const Visit = () => {
  const value = useGlobalContext();
  const data = value.subMenus.filter((item) => {
    if (
      item.moduleName.toLowerCase() === "Operations".toLowerCase() &&
      item.menuName.toLowerCase() === "Visits".toLowerCase() &&
      item.section.toLowerCase() === "N/A".toLowerCase()
    )
      return item;
    else return null;
  });

  return (
    <div className="card w-full max-w-screen-xl gap-2">
      <TopHeader title="Visit" />
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

export default Visit;
