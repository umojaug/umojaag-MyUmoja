import React from "react";
import ErrorMessage from "./Error/ErrorMessage";

const Color = ({
  name,
  label,
  type = "color",
  register,
  errorMessage = "",
}) => {
  return (
    <div className="form-row w-full">
      <label>{label}</label>
      <input type={type} {...register(name)} />
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default Color;
