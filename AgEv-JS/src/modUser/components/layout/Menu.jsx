
import React from "react";
import MainMenu from "../../../components/layout/MainMenu";
import { useGlobalContext } from "../../../hooks/context";
import { AiOutlineExport } from "react-icons/ai";

const Menu = () => {
  const value = useGlobalContext();
  const data = value.menus.filter((item) => {
    if (item.moduleName.toLowerCase() === "Home".toLowerCase()) return item;
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
        {value.role === "User" && (
          <div className="flex flex-col items-center mt-2 pt-2 border-t border-gray-700">
            <span
              className="sidebar-menu-item cursor-pointer"
              onClick={value.signOut}
            >
              <AiOutlineExport size={20} />
              <span className="ml-2 text-sm font-medium"> Sign Out</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
