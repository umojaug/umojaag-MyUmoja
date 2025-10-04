import { useState } from "react";
import RoleMenuSubMenuTree from "./RoleMenuSubMenuTree";

const AssignRoleView = ({ data, refetch }) => {
  const [selectedRole, setSelectedRole] = useState("");

  const uniqueRoles = data ? [...new Set(data.map((item) => item.role))] : [];

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  return (
    <>
      <div className="mb-6 pt-4">
        <label
          htmlFor="roleSelect"
          className="block text-base font-semibold text-gray-800 mb-2"
        >
          Role Name
        </label>
        <select
          id="roleSelect"
          value={selectedRole}
          onChange={handleRoleChange}
          className="mt-1 block w-full pl-4 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-1 focus:ring-umojayellow focus:border-umojayellow rounded-md shadow-sm transition duration-150 ease-in-out"
        >
          <option value="">-- Select a Role --</option>
          {uniqueRoles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>
      <div className=" pb-6">
        {selectedRole && (
          <RoleMenuSubMenuTree
            data={data || []}
            selectedRole={selectedRole}
            refetch={refetch}
          />
        )}

        {!selectedRole && (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-gray-100">
            Please select a role to view the menu tree
          </div>
        )}
      </div>
    </>
  );
};

export default AssignRoleView;
