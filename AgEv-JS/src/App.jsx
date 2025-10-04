import React, { Suspense } from "react";
import { useIdleTimer } from "react-idle-timer";
import { Toaster } from "react-hot-toast";
import { Routes } from "react-router-dom";
import { FallbackLoading } from "./components/Loading";
import { useGlobalContext } from "./hooks/context";
import opsRoutes from "./modOperations/opsRoutes";
import adminRoutes from "./modAdmin/adminRoutes";
import auditRoutes from "./modAudit/auditRoutes";
import hrRoutes from "./modHr/hrRoutes";
import acctRoutes from "./modAccounts/acctRoutes";
import userRoutes from "./modUser/userRoutes";
import crmRoutes from "./modCrm/crmRoutes";
import homeRoutes from "./modHome/homeRoutes";
import grapesRoutes from "./modGrapesAdmin/grapesRoutes";

//test
function App() {
  const value = useGlobalContext();
  const onIdle = () => {
    value.signOut();
  };

  const idleTimer = useIdleTimer({ onIdle, timeout: 1000 * 60 * 15 });
  console.log("It's the Time to Coffee!", idleTimer);

  return (
    <Suspense fallback={<FallbackLoading />}>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {homeRoutes}
        {crmRoutes}
        {userRoutes}
        {opsRoutes}
        {adminRoutes}
        {auditRoutes}
        {hrRoutes}
        {acctRoutes}
        {grapesRoutes}
      </Routes>
    </Suspense>
  );
}

export default App;
