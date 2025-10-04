import React from "react";
import { AiOutlineAppstore, AiOutlineFileText } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const AssignButton = ({
  path,
  btnColor = "btn-success",
  btnWidth = " w-12",
}) => {
  const navigate = useNavigate();
  return (
    <button className={btnColor + " w-12 h-10"} onClick={() => navigate(path)}>
      <AiOutlineAppstore size={24} />
    </button>
  );
};

export default AssignButton;
