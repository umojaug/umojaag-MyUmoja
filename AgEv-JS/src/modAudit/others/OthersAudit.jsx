// import React from "react";
// import SettingsItem from "../../components/layout/SettingsItem";
// import { menuAudit } from "../../data/menuAudit";

// const OthersAudit = () => {
//   const data = menuAudit;
//   return (
//     <div className="card w-full max-w-screen-xl">
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {data.othersMenuData.length > 0 &&
//           data.othersMenuData.map((item, index) => (
//             <SettingsItem
//               key={index}
//               name={item.name}
//               link={item.link}
//               Icon={item.Icon}
//             />
//           ))}
//       </div>
//     </div>
//   );
// };

// export default OthersAudit;

import React from "react";
import { useGlobalContext } from "../../hooks/context";
import SettingsItemOnline from "../../components/layout/SettingsItemOnline";

const OthersAudit = () => {
  const value = useGlobalContext();
  const data = value.subMenus.filter((item) => {
    if (
      item.moduleName.toLowerCase() === "Audit".toLowerCase() &&
      item.menuName.toLowerCase() === "Others".toLowerCase()
    )
      return item;
    else return null;
  });

  return (
    <div className="card w-full max-w-screen-xl">
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

export default OthersAudit;
