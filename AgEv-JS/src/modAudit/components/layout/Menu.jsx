import React from "react";
import MainMenu from "../../../components/layout/MainMenu";
import { useGlobalContext } from "../../../hooks/context";

const Menu = () => {
  const value = useGlobalContext();
  const data = value.menus.filter((item) => {
    if (item.moduleName.toLowerCase() === "Audit".toLowerCase()) return item;
    else return null;
  });

  return (
    <div className="flex flex-col w-56 items-center h-full overflow-hidden text-gray-400">
      <div className="">
        <div className="flex flex-col items-center">
          {data.length > 0 &&
            data.map((item, index) => (
              <MainMenu
                key={index}
                name={item.menuName}
                link={item.link}
                icon={item.icon}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;

// import React from "react";
// import MainMenu from "../../../components/layout/MainMenu";
// import { menuAudit } from "../../../data/menuAudit";

// const Menu = () => {
//   const data = menuAudit;
//   return (
//     <div className="flex flex-col w-56 items-center h-full overflow-hidden text-gray-400">
//       <div className="">
//         <div className="flex flex-col items-center">
//           {data.menuData.length > 0 &&
//             data.menuData.map((item, index) => (
//               <MainMenu
//                 key={index}
//                 name={item.name}
//                 link={item.link}
//                 icon={item.icon}
//               />
//             ))}
//         </div>
//         <div className="flex flex-col items-center mt-2 pt-2 border-t border-gray-700">
//           {data.settingMenuData.length > 0 &&
//             data.settingMenuData.map((item, index) => (
//               <MainMenu
//                 key={index}
//                 name={item.name}
//                 link={item.link}
//                 icon={item.icon}
//               />
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Menu;
