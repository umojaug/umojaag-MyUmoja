import React from "react";

const Label = ({ value, label }) => {
  return (
    <div className="form-row w-full">
      <label>{label}</label>
      <label className="form-control bg-gray-100">{value}</label>
    </div>
  );
};

export default Label;
