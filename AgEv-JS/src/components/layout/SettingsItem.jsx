import React from "react";
import { Link } from "react-router-dom";

const SettingsItem = ({ name, link, Icon }) => {
  return (
    <Link className="submenu-button group" to={link}>
      <div className="submenu-button-icon">
        <Icon size={24} />
      </div>
      <span className="submenu-button-name">{name}</span>
    </Link>
  );
};

export default SettingsItem;
