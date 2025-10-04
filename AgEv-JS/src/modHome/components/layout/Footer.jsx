import React from "react";

const Footer = () => {
  return (
    <div className="text-center">
      <p className="text-uppercase font-weight-bold text-umojablue text-sm md:text-md">
        ©{new Date().getFullYear()}
        <span className="md:ml-2">Copyright - Agri Evolve</span>
      </p>

      {/* <div className="bg-footerBg w-full h-4 bg-no-repeat bg-center bg-cover">
        <div className="e-con-inner"></div>
      </div> */}
    </div>
  );
};

export default Footer;
