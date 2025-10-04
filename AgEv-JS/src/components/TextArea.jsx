import React from "react";
import ErrorMessage from "./Error/ErrorMessage";
import { Controller } from "react-hook-form";

const TextArea = ({
  control,
  name,
  label,
  errorMessage = "",
  isReadOnly = false,
  showPlaceHolder = false,
  fromControl = "form-control",
  isAutoFocus = false,
}) => {
  return (
    <div className="form-row w-full">
      {showPlaceHolder === false && <label>{label}</label>}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <textarea
            className={
              fromControl +
              (errorMessage
                ? " input-border-danger "
                : " input-border-primary ") +
              (isReadOnly === true ? " bg-gray-100" : " bg-white")
            }
            {...field}
            autoFocus={isAutoFocus}
            readOnly={isReadOnly}
            placeholder={showPlaceHolder === true ? label : ""}
          />
        )}
      />
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default TextArea;
