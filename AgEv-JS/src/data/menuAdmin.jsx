import {
  AiOutlineSend,
  AiOutlineBlock,
  AiOutlineAntDesign,
  AiOutlineShop,
  AiOutlineAppstoreAdd,
  AiOutlineSolution,
  AiOutlineSetting,
  AiOutlineCluster,
  AiOutlineTeam,
  AiOutlineRedo,
  AiFillAccountBook,
} from "react-icons/ai";

export const menuAdmin = {
  menuData: [
    {
      name: "Users",
      link: "/admin/user",
      Icon: AiOutlineSolution,
    },
    {
      name: "Report",
      link: "/admin/ticket/report",
      Icon: AiOutlineRedo,
    },
  ],
  settingMenuData: [
    {
      name: "Settings",
      link: "/admin/settings",
      Icon: AiOutlineSetting,
    },
  ],
  subSettingMenuData: [
    {
      name: "Company",
      link: "/admin/settings/company/edit",
      Icon: AiOutlineCluster,
    },
    {
      name: "Division",
      link: "/admin/settings/division/list",
      Icon: AiOutlineAppstoreAdd,
    },
    {
      name: "Region",
      link: "/admin/settings/region/list",
      Icon: AiOutlineAntDesign,
    },
    {
      name: "Area",
      link: "/admin/settings/area/list",
      Icon: AiOutlineBlock,
    },
    {
      name: "Branch",
      link: "/admin/settings/branch/list",
      Icon: AiOutlineShop,
    },
    {
      name: "Holiday",
      link: "/admin/settings/holiday/list",
      Icon: AiOutlineSend,
    },
    {
      name: "Category",
      link: "/admin/settings/category/list",
      Icon: AiFillAccountBook,
    },
  ],
  reportsData: [
    {
      name: "Employee List",
      link: "/hr/reports/employee/list",
      Icon: AiOutlineTeam,
    },
  ],

  reportsTicket: [
    {
      name: "Open Ticket List",
      link: "/admin/reports/ticket/open",
      Icon: AiOutlineTeam,
    },
    {
      name: "Close Ticket List",
      link: "/admin/reports/ticket/close",
      Icon: AiOutlineTeam,
    },
  ],
};
