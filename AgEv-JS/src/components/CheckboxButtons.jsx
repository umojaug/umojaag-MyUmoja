import React from "react";
import ErrorMessage from "./Error/ErrorMessage";

const CheckboxButtons = ({ register, options, label, errorMessage }) => {
  return (
    <div className="form-row w-full">
      <label>{label}</label>
      {Object.entries(options).forEach(([key, value]) => {
        <label htmlFor={value} key={key}>
          {" "}
          <input {...register(key)} type="checkbox" value={true} />{" "}
          <label>{value}</label>
        </label>;
      })}
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default CheckboxButtons;
