import React from "react";
import { Link } from "react-router-dom";
import Icons from "./Icons";

export default function MainMenu({ name, link, icon }) {
  return (
    <Link className="sidebar-menu-item" to={link}>
      <Icons name={icon} size={20} />
      <span className="ml-2 text-sm font-medium text-white">{name}</span>
    </Link>
  );
}
