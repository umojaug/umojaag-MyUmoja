import SettingsItem from "../../components/layout/SettingsItem";
import { menuGrapesAdmin } from "../../data/menuGrapesAdmin";
import MonthPreviousButton from "./MonthPreviousButton";

const Dashboard = () => {
  const data = menuGrapesAdmin;

  return (
    <div className="card w-full max-w-screen-xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.settingDesignation.length > 0 &&
          data.settingDesignation.map((item, index) => (
            <SettingsItem
              key={index}
              name={item.name}
              link={item.link}
              Icon={item.Icon}
            />
          ))}
        <MonthPreviousButton />
      </div>
    </div>
  );
};

export default Dashboard;
