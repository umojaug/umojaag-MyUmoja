import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
// import FooterArea from "./FooterArea";

const Layout = () => {
  return (
    <div className="bg-[#d9d9d9] bg-no-repeat bg-fixed w-screen h-screen grid grid-cols-1 grid-rows-threeRowsSm md:grid-rows-threeRows xl:max-w-screen-3xl mx-auto">
      <Header />
      <div className="grid grid-cols-1 content-center overflow-hidden">
        <div className="overflow-y-auto pb-4">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
