import React from "react";

const ButtonToggle = ({ name, label, register }) => {
  return (
    <div>
      <input type="checkbox" {...register(name)} />
      <label htmlFor="scales"> {label}</label>
    </div>
  );
};

export default ButtonToggle;
