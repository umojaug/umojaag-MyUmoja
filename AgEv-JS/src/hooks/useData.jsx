import { useState } from "react";
import createPersistedState from "use-persisted-state-18";
const useAuthState = createPersistedState("auth");
const useRoleState = createPersistedState("role");
const useMenusState = createPersistedState("menus");
const useSubMenusState = createPersistedState("subMenus");
const useModulesState = createPersistedState("modules");
const useCompanyState = createPersistedState("company");

const useData = () => {
  const [user, setUser] = useAuthState(null);
  const [role, setRole] = useRoleState(null);
  const [menubar, setMenubar] = useState(null);
  const [modules, setModules] = useModulesState(null);
  const [menus, setMenus] = useMenusState(null);
  const [subMenus, setSubmenus] = useSubMenusState(null);
  const [company, setCompany ] = useCompanyState(null);
  const [isDayOpen, setIsDayOpen] = useState(null);

  const signOut = () => {
    setUser(null);
    setRole(null);
    setIsDayOpen(null);
    setCompany(null);
  };

  return {
    user,
    setUser,
    role,
    setRole,
    menubar,
    setMenubar,
    signOut,
    subMenus,
    setSubmenus,
    company,
    setCompany,
    menus,
    setMenus,
    modules,
    setModules,
    isDayOpen,
    setIsDayOpen,
  };
};

export default useData;
