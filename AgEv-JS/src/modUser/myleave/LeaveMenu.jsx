import SettingsItem from "../../components/layout/SettingsItem";
import TopHeader from "../../components/TopHeader";
import { menuUser } from "../../data/menuUser";

const LeaveMenu = () => {
  const data = menuUser;
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="My Leave" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.leaveMenu.length > 0 &&
          data.leaveMenu.map((item, index) => (
            <SettingsItem
              key={index}
              name={item.name}
              danish={item.danish}
              link={item.link}
              Icon={item.Icon}
            />
          ))}
      </div>
    </div>
  );
};

export default LeaveMenu;
