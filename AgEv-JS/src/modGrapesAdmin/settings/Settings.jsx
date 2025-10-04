import React from "react";
import SettingsItem from "../../components/layout/SettingsItem";
import TopHeader from "../../components/TopHeader";
import { menuGrapesAdmin } from "../../data/menuGrapesAdmin";
import ProcessAssignButton from "../../components/button/ProcessAssignButton";

const Settings = () => {
  const data = menuGrapesAdmin;
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Settings" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.subSettingMenuData.length > 0 &&
          data.subSettingMenuData.map((item, index) => (
            <SettingsItem
              key={index}
              name={item.name}
              link={item.link}
              Icon={item.Icon}
            />
          ))}
        <ProcessAssignButton />
      </div>
    </div>
  );
};

export default Settings;
