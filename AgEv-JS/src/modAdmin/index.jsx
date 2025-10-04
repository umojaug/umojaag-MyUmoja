import { lazy } from "react";

const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const DivisionList = lazy(() => import("./settings/division/DivisionList"));
const DivisionAdd = lazy(() => import("./settings/division/DivisionAdd"));
const DivisionEdit = lazy(() => import("./settings/division/DivisionEdit"));
const RegionList = lazy(() => import("./settings/region/RegionList"));
const RegionAdd = lazy(() => import("./settings/region/RegionAdd"));
const RegionEdit = lazy(() => import("./settings/region/RegionEdit"));
const AreaList = lazy(() => import("./settings/area/AreaList"));
const AreaAdd = lazy(() => import("./settings/area/AreaAdd"));
const AreaEdit = lazy(() => import("./settings/area/AreaEdit"));
const BranchList = lazy(() => import("./settings/branch/BranchList"));
const BranchAdd = lazy(() => import("./settings/branch/BranchAdd"));
const BranchEdit = lazy(() => import("./settings/branch/BranchEdit"));
const HolidayList = lazy(() => import("./settings/holiday/HolidayList"));
const HolidayAdd = lazy(() => import("./settings/holiday/HolidayAdd"));
const HolidayEdit = lazy(() => import("./settings/holiday/HolidayEdit"));
const Settings = lazy(() => import("./settings/Settings"));

const CompanyEdit = lazy(() => import("./settings/company/CompanyEdit"));

const UserList = lazy(() => import("./user/UserList"));
const UserEdit = lazy(() => import("./user/UserEdit"));
const UserAdd = lazy(() => import("./userCreate/UserAdd"));

const ResignList = lazy(() => import("./resign/ResignList"));
const VisitList = lazy(() => import("./monitoring/VisitList"));

const SettingsIssue = lazy(() => import("./report/Reports"));
const TicketOpenList = lazy(() => import("./report/ticket/TicketOpenList"));
const TicketClose = lazy(() => import("./report/ticket/TicketClose"));

const CategoryList = lazy(() => import("./settings/category/CategoryList"));
const CategoryEdit = lazy(() => import("./settings/category/CategoryEdit"));
const CategoryAdd = lazy(() => import("./settings/category/CategoryAdd"));

const AmAsignList = lazy(() => import("./settings/amAsign/AmAsignList"));
const AmAsignEdit = lazy(() => import("./settings/amAsign/AmAsignEdit"));
const AmAsignAdd = lazy(() => import("./settings/amAsign/AmAsignAdd"));

const BmAsignList = lazy(() => import("./settings/bmAsign/BmAsignList"));
const BmAsignEdit = lazy(() => import("./settings/bmAsign/BmAsignEdit"));
const BmAsignAdd = lazy(() => import("./settings/bmAsign/BmAsignAdd"));

const RmAsignList = lazy(() => import("./settings/rmAsign/RmAsignList"));
const RmAsignEdit = lazy(() => import("./settings/rmAsign/RmAsignEdit"));
const RmAsignAdd = lazy(() => import("./settings/rmAsign/RmAsignAdd"));

export {
  Dashboard,
  DivisionList,
  DivisionAdd,
  DivisionEdit,
  RegionList,
  RegionAdd,
  RegionEdit,
  AreaList,
  AreaAdd,
  AreaEdit,
  BranchList,
  BranchAdd,
  BranchEdit,
  HolidayList,
  HolidayAdd,
  HolidayEdit,
  Settings,
  CompanyEdit,
  UserList,
  UserEdit,
  ResignList,
  UserAdd,
  VisitList,
  SettingsIssue,
  TicketOpenList,
  TicketClose,
  CategoryList,
  CategoryEdit,
  CategoryAdd,
  AmAsignAdd,
  AmAsignEdit,
  AmAsignList,
  BmAsignList,
  BmAsignEdit,
  BmAsignAdd,
  RmAsignList,
  RmAsignEdit,
  RmAsignAdd,
};
