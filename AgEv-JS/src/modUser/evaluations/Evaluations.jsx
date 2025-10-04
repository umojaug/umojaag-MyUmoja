import React from "react";
import SettingsItem from "../../components/layout/SettingsItem";
import TopHeader from "../../components/TopHeader";
import { menuUser } from "../../data/menuUser";
import { useGlobalContext } from "../../hooks/context";

const Evaluations = () => {
  const value = useGlobalContext();
  const data = menuUser;
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Evaluation" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.evaluationData.length > 0 &&
          data.evaluationData.map((item, index) =>
            item.name === "All Applications" || item.name === "Summary" ? (
              (value.role === "Super Admin" ||
                value.role === "Head of operations" ||
                value.role === "Operations Manager" ||
                value.role === "HR Manager" ||
                value.role === "HR Executive") && (
                <SettingsItem
                  key={index}
                  name={item.name}
                  link={item.link}
                  Icon={item.Icon}
                />
              )
            ) : (
              <SettingsItem
                key={index}
                name={item.name}
                link={item.link}
                Icon={item.Icon}
              />
            )
          )}
      </div>
    </div>
  );
};

export default Evaluations;
