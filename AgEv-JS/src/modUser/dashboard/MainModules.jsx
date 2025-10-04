import React from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineBarChart,
  AiOutlineUserSwitch,
  AiOutlineFieldTime,
  AiOutlineFileSearch,
  AiOutlineBranches,
} from "react-icons/ai";

const MainModules = () => {
  return (
    <div className="md:hidden card w-full max-w-screen-xl mb-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          className="bg-gray-200 grid place-items-center p-2 hover:bg-primary hover:text-gray-300 rounded-lg"
          to="/crm"
        >
          <AiOutlineUserSwitch size={40} />
          <span className="font-medium text-center">CRM</span>
        </Link>
        <Link
          className="bg-gray-200 grid place-items-center p-2 hover:bg-primary hover:text-gray-300 rounded-lg"
          to="/ops"
        >
          <AiOutlineFieldTime size={40} />
          <span className="font-medium text-center">Operations</span>
        </Link>
        <Link
          className="bg-gray-200 grid place-items-center p-2 hover:bg-primary hover:text-gray-300 rounded-lg"
          to="/hr"
        >
          <AiOutlineUser size={40} />
          <span className="font-medium text-center">Hr</span>
        </Link>
        <Link
          className="bg-gray-200 grid place-items-center p-2 hover:bg-primary hover:text-gray-300 rounded-lg"
          to="/accounts"
        >
          <AiOutlineBarChart size={40} />
          <span className="font-medium text-center">Accounts</span>
        </Link>
        <Link
          className="bg-gray-200 grid place-items-center p-2 hover:bg-primary hover:text-gray-300 rounded-lg"
          to="/audit"
        >
          <AiOutlineFileSearch size={40} />
          <span className="font-medium text-center">Audit</span>
        </Link>
        <Link
          className="bg-gray-200 grid place-items-center p-2 hover:bg-primary hover:text-gray-300 rounded-lg"
          to="/Admin"
        >
          <AiOutlineBranches size={40} />
          <span className="font-medium text-center">Admin</span>
        </Link>
      </div>
    </div>
  );
};

export default MainModules;
