import React from "react";
import { AiOutlineForm } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const EditButton = ({ path }) => {
  const navigate = useNavigate();
  return (
    <button className="btn-sky w-12 h-10" onClick={() => navigate(path)}>
      <AiOutlineForm size={24} />
    </button>
  );
};

export default EditButton;
