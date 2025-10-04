import { Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/layout/Layout";
import * as Grapes from "./index";

const grapesRoutes = (
  <Route path="/*" element={<PrivateRoute />}>
    <Route element={<Layout />}>
      <Route path="grapes" element={<Grapes.Dashboard />} />
      <Route path="grapes/settings" element={<Grapes.Settings />} />
      <Route path="grapes/user" element={<Grapes.UserList />} />
      <Route path="grapes/user/add" element={<Grapes.UserAdd />} />
      <Route
        path="grapes/settings/query/execute"
        element={<Grapes.QueryExecuteAdd />}
      />
      <Route path="grapes/clearDatabase" element={<Grapes.RemarksAdd />} />

      <Route path="grapes/settings/role" element={<Grapes.RoleList />} />
      <Route path="grapes/settings/role/add" element={<Grapes.RoleAdd />} />
      <Route
        path="grapes/settings/role/edit/:id"
        element={<Grapes.RoleEdit />}
      />

      <Route path="grapes/settings/module/add" element={<Grapes.ModuleAdd />} />
      <Route
        path="grapes/settings/module/list"
        element={<Grapes.ModuleList />}
      />
      <Route
        path="grapes/settings/module/edit/:id"
        element={<Grapes.ModuleEdit />}
      />

      <Route path="grapes/settings/menu/add" element={<Grapes.MenuAdd />} />
      <Route path="grapes/settings/menu/list" element={<Grapes.MenuList />} />
      <Route
        path="grapes/settings/menu/edit/:id"
        element={<Grapes.MenuEdit />}
      />

      <Route
        path="grapes/settings/sub/menu/add"
        element={<Grapes.SubMenuAdd />}
      />
      <Route
        path="grapes/settings/sub/menu/list"
        element={<Grapes.SubMenuList />}
      />
      <Route
        path="grapes/settings/sub/menu/edit/:id"
        element={<Grapes.SubMenuEdit />}
      />

      <Route
        path="grapes/settings/menu/assign/add"
        element={<Grapes.MenuAssignAdd />}
      />
      <Route
        path="grapes/settings/menu/assign/list"
        element={<Grapes.MenuAssignList />}
      />
      <Route
        path="grapes/settings/submenu/assign/add"
        element={<Grapes.SubMenuAssignAdd />}
      />
      <Route
        path="grapes/settings/submenu/assign/list"
        element={<Grapes.SubMenuAssignList />}
      />
      <Route
        path="grapes/settings/process"
        element={<Grapes.MenuSubMenuAssignAll />}
      />
      <Route path="grapes/account" element={<Grapes.Voucher />} />
      <Route path="grapes/hr" element={<Grapes.MonthPrevious />} />

      <Route
        path="grapes/settings/designation/change"
        element={<Grapes.DesignationAdd />}
      />

      <Route
        path="grapes/settings/authorityMapping/add"
        element={<Grapes.AuthorityMappingAdd />}
      />
      <Route
        path="grapes/settings/authorityMapping/list"
        element={<Grapes.AuthorityMappingList />}
      />

      <Route
        path="grapes/settings/role/menuassign/add"
        element={<Grapes.MenuAssignRoleAdd />}
      />

      <Route
        path="grapes/settings/role/submenuassign/add"
        element={<Grapes.SubMenuAssignRoleAdd />}
      />
      <Route
        path="grapes/settings/role/access"
        element={<Grapes.RoleAccessList />}
      />
    </Route>
  </Route>
);

export default grapesRoutes;
