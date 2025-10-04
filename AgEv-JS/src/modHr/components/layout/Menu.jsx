import React from "react";
import MainMenu from "../../../components/layout/MainMenu";
import { useGlobalContext } from "../../../hooks/context";

const Menu = () => {
  const value = useGlobalContext();
  const data = value.menus.filter((item) => {
    if (item.moduleName.toLowerCase() === "Hr".toLowerCase()) return item;
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
