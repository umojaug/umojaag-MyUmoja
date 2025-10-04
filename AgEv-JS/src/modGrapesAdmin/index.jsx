import { lazy } from "react";

const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const Settings = lazy(() => import("./settings/Settings"));
const UserList = lazy(() => import("./user/UserList"));
const UserAdd = lazy(() => import("./user/UserAdd"));

const RoleAdd = lazy(() => import("./settings/role/RoleAdd"));
const RoleEdit = lazy(() => import("./settings/role/RoleEdit"));
const RoleList = lazy(() => import("./settings/role/RoleList"));

const QueryExecuteAdd = lazy(() =>
  import("./settings/queryExecute/QueryExecuteAdd")
);
const RemarksAdd = lazy(() => import("./settings/clearDatabase/RemarksAdd"));

const ModuleAdd = lazy(() => import("./settings/module/ModuleAdd"));
const ModuleEdit = lazy(() => import("./settings/module/ModuleEdit"));
const ModuleList = lazy(() => import("./settings/module/ModuleList"));

const MenuAdd = lazy(() => import("./settings/menu/MenuAdd"));
const MenuEdit = lazy(() => import("./settings/menu/MenuEdit"));
const MenuList = lazy(() => import("./settings/menu/MenuList"));

const SubMenuAdd = lazy(() => import("./settings/subMenu/SubMenuAdd"));
const SubMenuEdit = lazy(() => import("./settings/subMenu/SubMenuEdit"));
const SubMenuList = lazy(() => import("./settings/subMenu/SubMenuList"));

const MenuAssignList = lazy(() =>
  import("./settings/menuAssign/MenuAssignList")
);
const MenuAssignAdd = lazy(() => import("./settings/menuAssign/MenuAssignAdd"));

const SubMenuAssignAdd = lazy(() =>
  import("./settings/subMenuAssign/SubMenuAssignAdd")
);
const SubMenuAssignList = lazy(() =>
  import("./settings/subMenuAssign/SubMenuAssignList")
);
const MenuSubMenuAssignAll = lazy(() =>
  import("./settings/processAllUserAssign/MenuSubMenuAssignAll")
);

const Voucher = lazy(() => import("./account/Voucher"));
const MonthPrevious = lazy(() => import("./hr/Dashboard"));
const DesignationAdd = lazy(() => import("./hr/designation/DesignationAdd"));

const AuthorityMappingAdd = lazy(() =>
  import("./settings/authorityMapping/AuthorityMappingAdd")
);
const AuthorityMappingList = lazy(() =>
  import("./settings/authorityMapping/AuthorityMappingList")
);

const MenuAssignRoleAdd = lazy(() =>
  import("./settings/roleAccess/menu/MenuAssignRoleAdd")
);


const SubMenuAssignRoleAdd = lazy(() =>
  import("./settings/roleAccess/submenu/SubMenuAssignRoleAdd")
);
const RoleAccessList = lazy(() =>
  import("./settings/roleAccess/RoleAccessList")
);

export {
  Dashboard,
  Settings,
  UserList,
  UserAdd,
  QueryExecuteAdd,
  RemarksAdd,
  RoleAdd,
  RoleEdit,
  RoleList,
  ModuleAdd,
  ModuleEdit,
  ModuleList,
  MenuAdd,
  MenuEdit,
  MenuList,
  SubMenuAdd,
  SubMenuEdit,
  SubMenuList,
  MenuAssignAdd,
  MenuAssignList,
  SubMenuAssignList,
  SubMenuAssignAdd,
  MenuSubMenuAssignAll,
  Voucher,
  MonthPrevious,
  DesignationAdd,
  AuthorityMappingAdd,
  AuthorityMappingList,
  MenuAssignRoleAdd,
  SubMenuAssignRoleAdd,
  RoleAccessList,
};
