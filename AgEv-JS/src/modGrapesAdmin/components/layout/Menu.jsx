import React from "react";
import MainMenu from "../../../components/layout/MainMenu";
import { menuGrapesAdmin } from "../../../data/menuGrapesAdmin";

const Menu = () => {
  const data = menuGrapesAdmin;
  return (
    <div className="flex flex-col w-56 items-center h-full overflow-hidden text-gray-400">
      <div className="">
        <div className="flex flex-col items-center">
          {data.menuData.length > 0 &&
            data.menuData.map((item, index) => (
              <MainMenu
                key={index}
                name={item.name}
                link={item.link}
                icon={item.icon}
              />
            ))}
        </div>
        <div className="flex flex-col items-center mt-2 pt-2 border-t border-gray-700">
          {data.settingMenuData.length > 0 &&
            data.settingMenuData.map((item, index) => (
              // <MainMenu
              //   key={index}
              //   name={item.name}
              //   link={item.link}
              //   icon={item.icon}
              // />
              <MainMenu
                key={index}
                name={item.name}
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
