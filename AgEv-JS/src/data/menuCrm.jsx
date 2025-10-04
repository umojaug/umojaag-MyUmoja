import {
  AiOutlineSetting,
  AiOutlineTeam,
  AiOutlineSolution,
  AiOutlineUserSwitch,
  AiOutlineUnorderedList,
} from "react-icons/ai";

export const menuCrm = {
  menuData: [
    {
      name: "Reports",
      link: "/crm/reports",
      Icon: AiOutlineSolution,
    },
    {
      name: "Member",
      link: "/crm/member/list",
      Icon: AiOutlineUserSwitch,
    },
  ],
  settingMenuData: [
    {
      name: "Settings",
      link: "/underconstruction",
      Icon: AiOutlineSetting,
    },
  ],

  reportsData: [
    {
      name: "Member List",
      link: "/crm/reports/member/list",
      Icon: AiOutlineTeam,
    },
    {
      name: "Member Summary",
      link: "/crm/reports/member/summary",
      Icon: AiOutlineUnorderedList,
    },
  ],
};
