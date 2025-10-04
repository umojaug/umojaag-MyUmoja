import React from "react";
import { useNavigate } from "react-router-dom";

const TaskButtonLarge = ({ path, btnColor = "btn-umojayellow", text = "" }) => {
  const navigate = useNavigate();
  return (
    <button
      className={btnColor + " w-full h-10"}
      onClick={() => navigate(path)}
    >
      {text}
    </button>
  );
};

export default TaskButtonLarge;
