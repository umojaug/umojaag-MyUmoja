import React from "react";
import { Controller } from "react-hook-form";
import { useGetData } from "../hooks/dataApi";
import ErrorMessage from "./Error/ErrorMessage";

export const SelectFromDb = ({
  control,
  label,
  path,
  name,
  errorMessage,
  isDisabled = false,
}) => {
  const { data: lists } = useGetData(label, path);
  return (
    <div className="form-row w-full">
      <label>{label}</label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <select
            className={
              "form-control " +
              (isDisabled === true ? "bg-gray-100" : "bg-white")
            }
            {...field}
            disabled={isDisabled}
          >
            <option value="">-- Select --</option>
            {lists?.data.map((item) => (
              <option key={item.listId} value={item.listId}>
                {item.listName}
              </option>
            ))}
          </select>
        )}
      />
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export const SelectAllFromDb = ({
  control,
  label,
  path,
  name,
  errorMessage,
  isDisabled = false,
}) => {
  const { data: lists } = useGetData(label, path);
  return (
    <div className="form-row w-full">
      <label>{label}</label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <select
            className={
              "form-control " +
              (isDisabled === true ? "bg-gray-100" : "bg-white")
            }
            {...field}
            disabled={isDisabled}
          >
            <option value="All">-- All --</option>
            {lists?.data.map((item) => (
              <option key={item.listId} value={item.listId}>
                {item.listName}
              </option>
            ))}
          </select>
        )}
      />
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export const SelectFromOptions = ({
  register,
  options,
  label,
  name,
  errorMessage,
  ...rest
}) => {
  return (
    <div className="form-row w-full">
      <label>{label}</label>
      <select className="form-control bg-white" {...register(name)} {...rest}>
        <option value="">-- Select --</option>
        {options.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export const SelectFromOptionsWithKey = ({
  register,
  options,
  label,
  name,
  errorMessage,
  ...rest
}) => {
  return (
    <div className="form-row w-full">
      <label>{label}</label>
      <select className="form-control bg-white" {...register(name)} {...rest}>
        <option value="0">-- Select --</option>
        {options.map((e, key) => (
          <option key={key} value={e.key}>
            {e.value}
          </option>
        ))}
      </select>
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export const DataListFromDb = ({
  register,
  label,
  path,
  name,
  errorMessage,
  isDisabled = false,
  autoFocus = false,
}) => {
  const { data: lists } = useGetData(label, path);

  return (
    <div className="form-row w-full">
      <label>{label}</label>

      <input
        type="text"
        list="browsers"
        {...register(name)}
        className={
          "form-control " + (isDisabled === true ? "bg-gray-100" : "bg-white")
        }
        autoFocus={autoFocus}
        autoComplete="off"
      />
      <datalist id="browsers">
        {lists?.data.map((item) => (
          <option key={item.listId} value={item.listName} />
        ))}
      </datalist>

      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export const SelectFromCheckBox = ({
  register,
  options,
  label,
  name,
  errorMessage,
  ...rest
}) => {
  return (
    <div className="form-row w-full">
      <label>{label}</label>
      <div className="flex space-x-2">
        {options.map((value) => (
          <label key={value}>
            <input type="radio" value={value} {...register(name)} /> {value}
          </label>
        ))}
      </div>
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

//----------------
export const SelectSupervisorFromDb = ({
  control,
  label,
  path,
  name,
  errorMessage,
  isDisabled = false,
}) => {
  const { data: lists } = useGetData(label, path);
  return (
    <div className="form-row w-full">
      <label>{label}</label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <select
            className={
              "form-control " +
              (isDisabled === true ? "bg-gray-100" : "bg-white")
            }
            {...field}
            disabled={isDisabled}
          >
            <option value="">-- Select --</option>
            {lists?.data.map((item) => (
              <option key={item.listId} value={item.listName}>
                {item.listName}
              </option>
            ))}
          </select>
        )}
      />
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export const SelectFromOptionsWithLabel = ({
  register,
  options,
  label,
  name,
  errorMessage,
  ...rest
}) => {
  return (
    <div className="form-row w-full">
      <label>{label}</label>
      <select className="form-control bg-white" {...register(name)} {...rest}>
        {/* <option value="">-- Select --</option> */}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label} {/* Display the label "File" or "Link" */}
          </option>
        ))}
      </select>
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export const SelectAndShowButtons = ({ options, label, action }) => {
  return (
    <div className="form-row w-full">
      <label>{label}</label>
      <select
        className="form-control bg-white"
        onChange={(e) => action(e.target.value)}
      >
        {options.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export const SelectFromOptionsWithDisabled = ({
  register,
  options,
  label,
  name,
  errorMessage,
  isDisabled = false,
  ...rest
}) => {
  return (
    <div className="form-row w-full">
      <label>{label}</label>
      <select
        className={
          "form-control " +
          (isDisabled === true
            ? "bg-gray-100 custom-select-height"
            : "bg-white custom-select-height")
        }
        {...register(name)}
        {...rest}
        disabled={isDisabled}
      >
        <option value="">-- Select --</option>
        {options.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      <ErrorMessage message={errorMessage} />
    </div>
  );
};


export const SelectFromDbWithName = ({
  control,
  label,
  path,
  name,
  errorMessage,
  isDisabled = false,
}) => {
  const { data: lists } = path ? useGetData(label, path) : { data: null };
  return (
    <div className="form-row w-full">
      <label>{label}</label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <select
            className={
              "form-control " +
              (isDisabled === true
                ? "bg-gray-100 custom-select-height"
                : "bg-white custom-select-height")
            }
            {...field}
            disabled={isDisabled}
          >
            <option value="">-- Select --</option>
            {lists?.data.map((item) => (
              <option
                key={item.listId}
                value={`${item.listId}-${item.listName}`}
              >
                {item.listName}
              </option>
            ))}
          </select>
        )}
      />
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

