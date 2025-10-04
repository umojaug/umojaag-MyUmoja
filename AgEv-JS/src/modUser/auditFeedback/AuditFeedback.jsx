import SettingsItem from "../../components/layout/SettingsItem";
import TopHeader from "../../components/TopHeader";
import { menuUser } from "../../data/menuUser";

const AuditFeedback = () => {
  const data = menuUser;
  return (
    <div className="card w-full max-w-screen-xl">
      <TopHeader title="Audit " />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.auditfeedback.length > 0 &&
          data.auditfeedback.map((item, index) => (
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

export default AuditFeedback;
