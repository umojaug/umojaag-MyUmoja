import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../hooks/context";
import { AiOutlineFileSearch } from "react-icons/ai";
import LogoutButton from "../button/LogoutButton";
import Refresh from "../button/Refresh";

const MenuModulesFlatGA = () => {
  const value = useGlobalContext();

  return (
    <div className="flex space-x-1">
      {value.role === "Grapes Admin" && (
        <Link
          className="flex items-center justify-center p-1 md:p-2 rounded-lg hover:text-umojayellow "
          to="/grapes"
        >
          <AiOutlineFileSearch size={30} />
          <span className="ml-1 text-lg font-bold hidden lg:block">
            Grapes Admin
          </span>
        </Link>
      )}

      <Refresh />
      <LogoutButton />
    </div>
  );
};

export default MenuModulesFlatGA;
