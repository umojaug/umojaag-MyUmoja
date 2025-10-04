import React from "react";
import ErrorMessage from "./Error/ErrorMessage";

const RadioButtons = ({
  register,
  options,
  label,
  name,
  errorMessage,
  sidebySide = false,
  labelSpace = "",
}) => {
  return (
    <div
      className={
        sidebySide === false
          ? "form-row w-full"
          : "flex space-x-5  md:space-x-20"
      }
    >
      <label className={labelSpace}>{label}</label>

      {options.map((value) => (
        <label key={value} className="cursor-pointer">
          <input {...register(name)} type="radio" value={value} id={value} />{" "}
          {value}
        </label>
      ))}
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default RadioButtons;
