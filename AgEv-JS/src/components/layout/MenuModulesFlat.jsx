import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../hooks/context";
import LogoutButton from "../button/LogoutButton";
import Refresh from "../button/Refresh";
import Icons from "./Icons";

const MenuModulesFlat = () => {
  const value = useGlobalContext();
  const data = value.modules;

  return (
    <div className="flex space-x-1">
      {data.length > 0 &&
        data.map((item, i) => (
          <Link
            key={i}
            className="flex items-center justify-center p-1 md:p-1 rounded-lg hover:text-orange "
            to={item.link}
          >
            <Icons name={item.icon} size={20} />
            <span className="ml-1 text-sm font-bold hidden lg:block">
              {item.moduleName}
            </span>
          </Link>
        ))}

      <Refresh />
      <LogoutButton />
    </div>
  );
};

export default MenuModulesFlat;
