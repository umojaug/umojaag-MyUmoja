import React from "react";
import { AiOutlineFilePpt } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const PreviewButton = ({ path }) => {
  const navigate = useNavigate();
  return (
    <button className="btn-sky w-12 h-10" onClick={() => navigate(path)}>
      <AiOutlineFilePpt size={24} />
    </button>
  );
};

export default PreviewButton;
