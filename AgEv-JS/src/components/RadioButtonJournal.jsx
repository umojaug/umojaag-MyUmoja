import React from "react";
import ErrorMessage from "./Error/ErrorMessage";

const RadioButtonJournal = ({
  register,
  options,
  label,
  name,
  errorMessage,
}) => {
  return (
    <div className="form-row w-full">
      <label className="px-5">{label}</label>
      <div className="flex justify-between px-5 text-2xl">
        {options.map((value) => (
          <label htmlFor={value} key={value} className="cursor-pointer">
            <input {...register(name)} type="radio" value={value} id={value} />{" "}
            {value}
          </label>
        ))}
      </div>
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default RadioButtonJournal;
