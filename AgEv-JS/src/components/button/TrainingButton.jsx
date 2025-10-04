import React from "react";
import { AiOutlineLink } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const TrainingButton = ({ path }) => {
  const navigate = useNavigate();
  return (
    <button className="btn-umojayellow w-full" onClick={() => navigate(path)}>
      <span className="">
        <AiOutlineLink size={24} />
      </span>
      <span className="text-xs font-bold">FeedBack</span>
    </button>
  );
};

export default TrainingButton;
