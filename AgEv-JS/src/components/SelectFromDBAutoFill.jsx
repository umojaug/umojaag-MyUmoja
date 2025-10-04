import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import { useGetData } from "../hooks/dataApi";
import ErrorMessage from "./Error/ErrorMessage";

export const SelectFromDbAutoFill = ({
  control,
  setValue,
  label,
  path,
  name,
  errorMessage,
  isDisabled = false,
}) => {
  const { data: lists } = useGetData(label, path || "");

  useEffect(() => {
    if (Array.isArray(lists?.data) && lists.data.length === 1) {
      const singleOption = lists.data[0];
      setValue(name, singleOption.listId, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [lists, name, setValue]);

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
              (isDisabled
                ? "bg-gray-100 custom-select-height"
                : "bg-white custom-select-height")
            }
            {...field}
            disabled={isDisabled}
          >
            <option value="">-- Select --</option>
            {Array.isArray(lists?.data) &&
              lists.data.map((item) => (
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
