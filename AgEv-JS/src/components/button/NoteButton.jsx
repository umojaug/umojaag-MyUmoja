import React from "react";
import { AiOutlineComment } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const NoteButton = ({ path }) => {
  const navigate = useNavigate();
  return (
    <button className="btn-teal w-12 h-10" onClick={() => navigate(path)}>
      <AiOutlineComment size={24} />
    </button>
  );
};

export default NoteButton;
