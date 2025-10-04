import React from "react";
import SettingsItem from "../../components/layout/SettingsItem";
import { menuHr } from "../../data/menuHr";
import TopHeader from "../../components/TopHeader";

const Dashboard = () => {
  const data = menuHr.evaluationData;
  return (
    <div className="card w-full max-w-screen-xl gap-2">
      <TopHeader title="Evaluation Dashboard" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.length > 0 &&
          data.map((item, index) => (
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
