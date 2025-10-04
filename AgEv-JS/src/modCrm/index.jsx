import { lazy } from "react";

const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const MemberList = lazy(() => import("./member/MemberList"));
const MemberAdd = lazy(() => import("./member/MemberAdd"));
const MemberEdit = lazy(() => import("./member/MemberEdit"));
const Reports = lazy(() => import("./reports/Reports"));
const RptMemberList = lazy(() => import("./reports/member/MemberList"));
const RptMemberSummary = lazy(() => import("./reports/member/MemberSummary"));
export {
  Dashboard,
  MemberList,
  MemberAdd,
  MemberEdit,
  Reports,
  RptMemberList,
  RptMemberSummary,
};
