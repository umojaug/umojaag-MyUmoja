import React from "react";
import MobileSidebar from "./MobileSidebar";
import MenuModulesFlatGA from "../../../components/layout/MenuModulesFlatGA";
//import { useGlobalContext } from "../../../hooks/context";

const Header = () => {
  // const value = useGlobalContext();

  return (
    <div className="flex justify-between items-center lg:justify-end shadow-lg px-4 h-14 bg-lighter text-primary">
      <div className="block lg:hidden">
        <MobileSidebar />
      </div>
      <MenuModulesFlatGA />
    </div>
  );
};
export default Header;
