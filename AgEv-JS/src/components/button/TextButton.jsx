import React from "react";
// import { AiOutlineRobot } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const TextButton = ({ title, path }) => {
  const navigate = useNavigate();
  return (
    <button
      className="btn-success w-24 md:w-72 h-10 flex align-middle space-x-2"
      onClick={() => navigate(path)}
    >
      {title}
    </button>
  );
};

export default TextButton;
