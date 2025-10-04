import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SelectFromOptions, DataListFromDb } from "./SelectList";
import { selectOptions } from "../data/selectOptions";

const schema = yup.object({
  selectMonth: yup.string().required("Required."),
  selectYear: yup.string().required("Required."),
  searchByPinName: yup.string().max(50),
});

const SearchMonthYear = ({
  action,
  displayYear = true,
  displaySearch = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      selectMonth: selectOptions.monthNames[new Date().getMonth()], //new Date().toLocaleString("default", { month: "long" }),
      selectYear: new Date().getFullYear(),
      searchByPinName: "",
    },
    resolver: yupResolver(schema),
  });
  const { selectMonth, selectYear, searchByPinName } = errors;

  const onSubmit = async (formData) => {
    var month = selectOptions.monthNames.indexOf(formData.selectMonth) + 1;
    action({
      selectMonth: month,
      selectYear: formData.selectYear,
      searchByPinName: formData.searchByPinName,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-2">
        {displaySearch && (
          <DataListFromDb
            register={register}
            label="Employee"
            path="/employees/select"
            name="searchByPinName"
            errorMessage={searchByPinName?.message}
          />
        )}
        <SelectFromOptions
          register={register}
          options={selectOptions.monthNames}
          label="Month"
          name="selectMonth"
          errorMessage={selectMonth?.message}
        />

        {displayYear && (
          <SelectFromOptions
            register={register}
            options={selectOptions.years}
            label="Year"
            name="selectYear"
            errorMessage={selectYear?.message}
          />
        )}

        <div className="form-row w-full place-content-end">
          <button type="submit" className="btn-umojayellow h-9">
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchMonthYear;
