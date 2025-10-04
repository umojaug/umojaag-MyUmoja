import React from "react";
import { useNavigate } from "react-router-dom";

const LinkButton = ({ btnText, path }) => {
  const navigate = useNavigate();
  return (
    <div
      className="btn-umojayellow text-center h-16"
      onClick={() => navigate(path)}
    >
      {btnText}
    </div>
  );
};

export default LinkButton;
