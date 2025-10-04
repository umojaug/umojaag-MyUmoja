import React from "react";
import ErrorMessage from "./Error/ErrorMessage";
import { AiOutlineFile } from "react-icons/ai";

const InputFile = ({
  name,
  label,
  register,
  errorMessage = "",
  action,
  accept,
  evidence = "",
}) => {
  return (
    <div className="form-row w-full">
      <div className="flex">
        <label>{label}</label>
        <input
          {...register(name)}
          type="file"
          onChange={(e) => {
            action(e.target.files[0]);
          }}
          className="border-red-800"
          accept={accept}
        />
        {evidence && (
          <a href={evidence} className="btn-sky w-12 h-10">
            <AiOutlineFile size={24} />
          </a>
        )}
      </div>
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default InputFile;
