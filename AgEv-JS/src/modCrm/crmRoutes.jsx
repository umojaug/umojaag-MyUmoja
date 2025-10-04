import { Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/layout/Layout";
import * as ModCrm from "./index";

const crmRoutes = (
  <Route path="/*" element={<PrivateRoute />}>
    <Route element={<Layout />}>
      <Route path="crm" element={<ModCrm.Dashboard />} />
      <Route path="crm/reports" element={<ModCrm.Reports />} />
      <Route
        path="crm/reports/member/list"
        element={<ModCrm.RptMemberList />}
      />
      <Route
        path="crm/reports/member/summary"
        element={<ModCrm.RptMemberSummary />}
      />
      <Route path="crm/member/list" element={<ModCrm.MemberList />} />
      <Route path="crm/member/add" element={<ModCrm.MemberAdd />} />
      <Route path="crm/member/edit/:id" element={<ModCrm.MemberEdit />} />
    </Route>
  </Route>
);

export default crmRoutes;
