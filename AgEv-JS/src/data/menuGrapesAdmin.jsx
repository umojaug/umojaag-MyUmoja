import {
  AiOutlineCluster,
  AiOutlineTeam,
  AiFillDelete,
  AiOutlineBars,
  AiOutlineKey,
  AiOutlineControl,
  AiOutlineMenu,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";

export const menuGrapesAdmin = {
  menuData: [
    {
      name: "Users",
      link: "/grapes/user",
      icon: "AiOutlineSolution",
    },
    {
      name: "Account",
      link: "/grapes/account",
      icon: "AiOutlineTeam",
    },
    {
      name: "HR",
      link: "/grapes/hr",
      icon: "AiOutlineCluster",
    },
  ],
  settingMenuData: [
    {
      name: "Settings",
      link: "/grapes/settings",
      icon: "AiOutlineSetting",
    },
  ],

  settingDesignation: [
    {
      name: "Designation",
      link: "/grapes/settings/designation/change",
      Icon: AiOutlineUsergroupAdd,
    },
  ],
  subSettingMenuData: [
    {
      name: "Query Execute",
      link: "/grapes/settings/query/execute",
      Icon: AiOutlineCluster,
    },
    {
      name: "Clear Database",
      link: "/grapes/clearDatabase",
      Icon: AiFillDelete,
    },
    {
      name: "Role",
      link: "/grapes/settings/role",
      Icon: AiOutlineTeam,
    },
    {
      name: "Modules",
      link: "/grapes/settings/module/list",
      Icon: AiOutlineCluster,
    },
    {
      name: "Menu",
      link: "/grapes/settings/menu/list",
      Icon: AiOutlineMenu,
    },
    {
      name: "Menu Assign",
      link: "/grapes/settings/menu/assign/list",
      Icon: AiOutlineKey,
    },
    {
      name: "Sub Menu",
      link: "/grapes/settings/sub/menu/list",
      Icon: AiOutlineBars,
    },

    {
      name: "Sub Menu Assign",
      link: "/grapes/settings/submenu/assign/list",
      Icon: AiOutlineControl,
    },

    {
      name: "Role based Access",
      link: "/grapes/settings/role/access",
      Icon: AiOutlineControl,
    },
  ],
};
