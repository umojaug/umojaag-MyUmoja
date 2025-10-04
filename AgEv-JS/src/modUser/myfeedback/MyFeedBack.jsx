 import SettingsItem from "../../components/layout/SettingsItem";
import TopHeader from "../../components/TopHeader";
import { menuUser } from "../../data/menuUser";


const MyFeedBack = () => {
  const data = menuUser;
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="My Feedback" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.myfeedback.length > 0 &&
          data.myfeedback.map((item, index) => (
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

export default MyFeedBack;