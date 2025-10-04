import React from "react";
import { AiOutlineFileText } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const TaskButton = ({
  path,
  btnColor = "btn-umojayellow",
  btnWidth = " w-12",
}) => {
  const navigate = useNavigate();
  return (
    <button className={btnColor + " w-12 h-10"} onClick={() => navigate(path)}>
      <AiOutlineFileText size={24} />
    </button>
  );
};

export default TaskButton;
