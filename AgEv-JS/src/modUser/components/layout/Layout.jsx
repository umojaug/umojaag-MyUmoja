import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="w-screen h-screen text-white overflow-hidden">
      <div className="grid lg:grid-cols-layout w-full h-screen max-w-screen-3xl mx-auto">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <div className="grid grid-rows-twoRows w-full h-screen overflow-hidden bg-light text-primary">
          <Header />
          <div className="overflow-y-auto">
            <div className="grid grid-cols-1 p-4">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
