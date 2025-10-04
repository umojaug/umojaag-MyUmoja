import React from "react";
import MobileSidebar from "./MobileSidebar";
import MenuModulesFlat from "../../../components/layout/MenuModulesFlat";
import BusinessDateForMenu from "../../../components/button/BusinessDateForMenu";
import HeaderUserInfo from "../../../components/button/HeaderUserInfo";

const Header = () => {
  return (
    <div className="flex justify-between items-center  shadow-lg px-4 bg-lighter text-primary">
      <BusinessDateForMenu textSize="sm" />
      <div className="flex justify-between items-center lg:justify-end shadow-lg px-2 h-14 bg-lighter text-primary">
        <HeaderUserInfo />
        <div className="block lg:hidden">
          <MobileSidebar />
        </div>
        <MenuModulesFlat />
      </div>
    </div>
  );
};
export default Header;
