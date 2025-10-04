import React from "react";
import ErrorMessage from "./Error/ErrorMessage";

const Picture = ({
  name,
  label,
  register,
  errorMessage = "",
  isReadOnly = false,
}) => {
  return (
    <div className="form-row w-full">
      <label>{label}</label>
      <input
        // id="picture"
        {...register(name)}
        type="file"
        className={
          "form-control " +
          (errorMessage ? "input-border-danger " : "input-border-primary ") +
          (isReadOnly === true ? "bg-gray-100" : "bg-white")
        }
      />
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default Picture;
