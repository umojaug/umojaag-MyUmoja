import React from "react";
import MobileSidebar from "./MobileSidebar";
import MenuModulesFlat from "../../../components/layout/MenuModulesFlat";
//import { useGlobalContext } from "../../../hooks/context";

const Header = () => {
  // const value = useGlobalContext();

  return (
    <div className="flex justify-between items-center lg:justify-end shadow-lg px-4 h-14 bg-lighter text-primary">
      <div className="block lg:hidden">
        <MobileSidebar />
      </div>
      <MenuModulesFlat />
    </div>
  );
};
export default Header;
