import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlinePlusCircle,
  AiOutlineInfoCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";

const TopHeader = ({ title, btn = "None", show = 0, path = "" }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between px-0 py-2 items-center">
      <h1 className="text-xl lg:text-2xl font-bold lg:text-semibold text-gray-600 capitalize">
        {title}
      </h1>

      {btn === "Save" && show === 0 && (
        <button
          className="btn-header btn-animation text-primary"
          onClick={() => navigate(path)}
        >
          <AiOutlinePlusCircle size={36} />
        </button>
      )}
      {btn === "Return" && show === 0 && (
        <button
          className="btn-header btn-animation text-danger"
          onClick={() => navigate(path)}
        >
          <AiOutlineCloseCircle size={36} />
        </button>
      )}
      {btn === "List" && show === 0 && (
        <button
          className="btn-header btn-animation text-primary"
          onClick={() => navigate(path)}
        >
          <AiOutlineInfoCircle size={36} />
        </button>
      )}
    </div>
  );
};

export default TopHeader;
