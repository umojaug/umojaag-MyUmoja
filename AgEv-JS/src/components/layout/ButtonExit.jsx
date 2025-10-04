import React from "react";
import { AiOutlineExport } from "react-icons/ai";
import { useGlobalContext } from "../../hooks/context";

const ButtonExit = () => {
  const value = useGlobalContext();
  return (
    <span
      onClick={value.signOut}
      className="hover:bg-primary hover:text-white text-gray-400 cursor-pointer group flex rounded-md items-center w-full px-2 py-2 text-sm"
    >
      <AiOutlineExport className="w-5 h-5 mr-2" />
      Sign Out
    </span>
  );
};

export default ButtonExit;
