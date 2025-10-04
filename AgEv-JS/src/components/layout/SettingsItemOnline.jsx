import React from "react";
import { Link } from "react-router-dom";
import Icons from "./Icons";

const SettingsItemOnline = ({ name, link, icon }) => {
  return (
    <Link className="submenu-button group" to={link}>
      <div className="submenu-button-icon">
        <Icons name={icon} size={24} />
      </div>
      <span className="submenu-button-name">{name}</span>
    </Link>
  );
};

export default SettingsItemOnline;
