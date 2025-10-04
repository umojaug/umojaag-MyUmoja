import { useState, useMemo } from "react";
import Tree from "rc-tree";
import "rc-tree/assets/index.css";
import DeleteButton from "../../../components/button/DeleteButton";
import { BiSubdirectoryRight } from "react-icons/bi";
import { MdOutlineViewModule } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa";
import { CgMenuLeft } from "react-icons/cg";

const RoleMenuSubMenuTree = ({ data, selectedRole, refetch }) => {
  const filteredData = data.filter((item) => item.role === selectedRole);
  // console.log("filteredData", filteredData);
  const moduleGroups = {};
  filteredData.forEach((item) => {
    if (!moduleGroups[item.moduleName]) {
      moduleGroups[item.moduleName] = {};
    }
    if (!moduleGroups[item.moduleName][item.menuName]) {
      moduleGroups[item.moduleName][item.menuName] = [];
    }
    moduleGroups[item.moduleName][item.menuName].push(item);
  });

  const treeData = useMemo(() => {
    return Object.keys(moduleGroups).map((moduleName) => {
      const moduleMenus = moduleGroups[moduleName];

      return {
        key: `module-${moduleName}`,
        title: moduleName,
        icon: <MdOutlineViewModule className="text-purple-600 text-lg" />,
        children: Object.keys(moduleMenus).map((menuName) => {
          const menuItems = moduleMenus[menuName];

          const hasSubMenus = menuItems.some(
            (item) => item.adSubMenuAssignRoleId !== 0 && item.subMenuName !== null
          );

          if (hasSubMenus) {
            const menuItem =
              menuItems.find((item) => item.adSubMenuAssignRoleId === 0) || menuItems[0];
            return {
              key: `menu-${moduleName}-${menuName}`,
              title: (
                <div className="flex justify-between items-center w-full pr-4">
                  <span className="text-base">{menuName}</span>
                  <DeleteButton
                    action={refetch}
                    path={`/menuAssignRole/delete/${menuItem.adMenuAssignRoleId}`}
                    size={20}
                    btnClass="ml-3 text-red-500 hover:text-red-600 transition-colors"
                  />
                </div>
              ),
              icon: <CgMenuLeft className="text-blue-600 text-lg" />,
              children: menuItems
                .filter((item) => item.adSubMenuAssignRoleId !== 0 && item.subMenuName !== null)
                .map((subMenu) => ({
                  key: `submenu-${subMenu.adSubMenuAssignRoleId}`,
                  title: (
                    <div className="flex justify-between items-center w-full pr-4">
                      <span className="text-base">{subMenu.subMenuName}</span>
                      <DeleteButton
                        action={refetch}
                        path={`/subMenuAssignRole/delete/${subMenu.adSubMenuAssignRoleId}`}
                        size={20}
                        btnClass="ml-3 text-red-500 hover:text-red-600 transition-colors"
                      />
                    </div>
                  ),
                  icon: (
                    <BiSubdirectoryRight className="text-green-600 text-lg" />
                  ),
                  isLeaf: true,
                  data: subMenu,
                })),
            };
          } else {
            const menuItem = menuItems[0];
            return {
              key: `menu-standalone-${menuItem.adMenuAssignRoleId}`,
              title: (
                <div className="flex justify-between items-center w-full pr-4">
                  <span className="text-base">{menuName}</span>
                  <DeleteButton
                    action={refetch}
                    path={`/menuAssignRole/delete/${menuItem.adMenuAssignRoleId}`}
                    size={20}
                    btnClass="ml-3 text-red-500 hover:text-red-600 transition-colors"
                  />
                </div>
              ),
              icon: <CgMenuLeft className="text-blue-600 text-lg" />,
              isLeaf: true,
              data: menuItem,
            };
          }
        }),
      };
    });
  }, [moduleGroups, refetch]);

  const expandedKeys = useMemo(() => {
    const allKeys = [];

    Object.keys(moduleGroups).forEach((moduleName) => {
      allKeys.push(`module-${moduleName}`);

      Object.keys(moduleGroups[moduleName]).forEach((menuName) => {
        const menuItems = moduleGroups[moduleName][menuName];
        const hasSubMenus = menuItems.some(
          (item) => item.adSubMenuAssignRoleId !== 0 && item.subMenuName !== null
        );

        if (hasSubMenus) {
          allKeys.push(`menu-${moduleName}-${menuName}`);
        }
      });
    });

    return allKeys;
  }, [moduleGroups]);

  const [userExpandedKeys, setUserExpandedKeys] = useState([]);

  const handleExpand = (newExpandedKeys) => {
    setUserExpandedKeys(newExpandedKeys);
  };

  const currentExpandedKeys = userExpandedKeys.length > 0 ? userExpandedKeys : expandedKeys;

  const totalItems = filteredData.length;

  return (
    <div className="p-6 border rounded-xl bg-white shadow-sm">
      <h3 className="text-xl font-semibold mb-5 text-gray-800 border-b pb-3 flex items-center">
        Module <FaAngleRight size={20} /> Menu <FaAngleRight size={20} /> Sub
        Menu - Structure for -
        <span className="text-umojayellow ml-2">{selectedRole}</span>
      </h3>

      {treeData.length > 0 ? (
        <div className="custom-tree-container">
          <Tree
            className="w-full custom-tree"
            expandedKeys={currentExpandedKeys}
            onExpand={handleExpand}
            treeData={treeData}
            showIcon={true}
            showLine={{ showLeafIcon: false }}
          />
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
          No items found for this role
        </div>
      )}

      <div className="mt-6 text-right bg-gray-50 p-3 rounded-lg">
        <span className="font-semibold text-md text-gray-700">
          TOTAL ITEMS: <span className="text-umojayellow">{totalItems}</span>
        </span>
      </div>
    </div>
  );
};

export default RoleMenuSubMenuTree;